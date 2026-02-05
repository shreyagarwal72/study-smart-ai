import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Subject {
  name: string;
  color: string;
  priority: number;
}

interface StudyPlan {
  id: string;
  title: string;
  class_level: string;
  stream: string | null;
  subjects: Subject[];
  exam_date: string | null;
  daily_hours: number;
  schedule: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Streak {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

interface StudySession {
  id: string;
  subject: string;
  topic: string | null;
  duration_minutes: number;
  completed_at: string;
  plan_id: string | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  class_level: string | null;
  stream: string | null;
}

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!user,
  });
}

export function useStreak() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["streak", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Streak | null;
    },
    enabled: !!user,
  });
}

export function useStudyPlans() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["study_plans", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map((plan) => ({
        ...plan,
        subjects: (plan.subjects as unknown) as Subject[],
      })) as StudyPlan[];
    },
    enabled: !!user,
  });
}

export function useActivePlan() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["active_plan", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("study_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        subjects: (data.subjects as unknown) as Subject[],
      } as StudyPlan;
    },
    enabled: !!user,
  });
}

export function useStudySessions(days = 7) {
  const { user } = useAuth();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return useQuery({
    queryKey: ["study_sessions", user?.id, days],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("study_sessions")
        .select("*")
        .eq("user_id", user.id)
        .gte("completed_at", startDate.toISOString())
        .order("completed_at", { ascending: false });

      if (error) throw error;
      return (data || []) as StudySession[];
    },
    enabled: !!user,
  });
}

export function useGenerateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ planId }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate schedule");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_plans"] });
      queryClient.invalidateQueries({ queryKey: ["active_plan"] });
      toast.success("Schedule generated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useLogStudySession() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      subject,
      topic,
      durationMinutes,
      planId,
    }: {
      subject: string;
      topic?: string;
      durationMinutes: number;
      planId?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("study_sessions").insert([
        {
          user_id: user.id,
          subject,
          topic: topic || null,
          duration_minutes: durationMinutes,
          plan_id: planId || null,
        },
      ]);

      if (error) throw error;

      // Update streak
      const today = new Date().toISOString().split("T")[0];
      const { data: streak } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (streak) {
        const lastActivity = streak.last_activity_date;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        let newStreak = streak.current_streak;
        if (lastActivity === yesterdayStr) {
          newStreak += 1;
        } else if (lastActivity !== today) {
          newStreak = 1;
        }

        const newLongest = Math.max(newStreak, streak.longest_streak);

        await supabase
          .from("streaks")
          .update({
            current_streak: newStreak,
            longest_streak: newLongest,
            last_activity_date: today,
          })
          .eq("user_id", user.id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_sessions"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      toast.success("Study session logged!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useWeeklyStats() {
  const { data: sessions } = useStudySessions(7);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const stats = weekDays.map((day, index) => {
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() - (6 - index) - dayDate.getDay() + index);
    
    const dayStr = dayDate.toISOString().split("T")[0];
    const daySessions = sessions?.filter((s) => 
      s.completed_at.split("T")[0] === dayStr
    ) || [];
    
    const totalMinutes = daySessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    
    return {
      day,
      hours: Math.round((totalMinutes / 60) * 10) / 10,
      date: dayStr,
    };
  });

  const totalHours = stats.reduce((sum, s) => sum + s.hours, 0);

  return { stats, totalHours };
}
