import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Subject {
  name: string;
  color: string;
  priority: number;
}

interface StudyPlan {
  id: string;
  class_level: string;
  stream: string | null;
  subjects: Subject[];
  exam_date: string;
  daily_hours: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { planId } = await req.json();
    if (!planId) {
      return new Response(JSON.stringify({ error: "Plan ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the study plan
    const { data: plan, error: planError } = await supabase
      .from("study_plans")
      .select("*")
      .eq("id", planId)
      .single();

    if (planError || !plan) {
      return new Response(JSON.stringify({ error: "Study plan not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const studyPlan = plan as StudyPlan;
    const subjects = studyPlan.subjects as Subject[];
    const examDate = new Date(studyPlan.exam_date);
    const today = new Date();
    const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Build prompt for AI
    const prompt = `You are an expert study planner AI. Create a detailed, personalized weekly study schedule.

STUDENT INFORMATION:
- Class/Level: ${studyPlan.class_level}
- Stream: ${studyPlan.stream || "N/A"}
- Daily study hours available: ${studyPlan.daily_hours} hours
- Days until exam: ${daysUntilExam} days
- Exam date: ${studyPlan.exam_date}

SUBJECTS TO STUDY (with priority 1=weak, 5=strong):
${subjects.map((s) => `- ${s.name}: Priority ${s.priority}/5 (lower = needs more focus)`).join("\n")}

REQUIREMENTS:
1. Create a 7-day weekly schedule (Monday to Sunday)
2. Allocate more time to subjects with lower priority (weaker subjects)
3. Include 25-minute Pomodoro sessions with 5-minute breaks
4. Add revision blocks for previously studied topics
5. Include buffer time for unexpected delays
6. Balance subjects throughout the week
7. Morning sessions for difficult subjects, evening for easier ones

Respond with ONLY a valid JSON object in this exact format:
{
  "weeklySchedule": [
    {
      "day": "Monday",
      "sessions": [
        {
          "startTime": "09:00",
          "endTime": "10:30",
          "subject": "Mathematics",
          "topic": "Calculus - Derivatives",
          "type": "study",
          "color": "#6366f1"
        }
      ]
    }
  ],
  "dailyTips": ["Tip 1", "Tip 2"],
  "focusAreas": ["Area 1", "Area 2"]
}

Types can be: "study", "revision", "break", "buffer"`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert study planner that creates optimized schedules. Always respond with valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error("Failed to generate schedule");
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    let schedule;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      schedule = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse schedule from AI");
    }

    // Update the study plan with the generated schedule
    const { error: updateError } = await supabase
      .from("study_plans")
      .update({ schedule: schedule })
      .eq("id", planId);

    if (updateError) {
      console.error("Failed to update plan:", updateError);
      throw new Error("Failed to save schedule");
    }

    return new Response(JSON.stringify({ success: true, schedule }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating schedule:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
