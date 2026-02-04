// Class/Grade level definitions
export const classLevels = [
  // Primary School (Classes 1-8)
  { value: "class-1", label: "Class 1", category: "primary" },
  { value: "class-2", label: "Class 2", category: "primary" },
  { value: "class-3", label: "Class 3", category: "primary" },
  { value: "class-4", label: "Class 4", category: "primary" },
  { value: "class-5", label: "Class 5", category: "primary" },
  { value: "class-6", label: "Class 6", category: "primary" },
  { value: "class-7", label: "Class 7", category: "primary" },
  { value: "class-8", label: "Class 8", category: "primary" },
  // Secondary School (Classes 9-10)
  { value: "class-9", label: "Class 9", category: "secondary" },
  { value: "class-10", label: "Class 10", category: "secondary" },
  // Higher Secondary (Classes 11-12 with streams)
  { value: "class-11", label: "Class 11", category: "higher-secondary" },
  { value: "class-12", label: "Class 12", category: "higher-secondary" },
  // Competitive Exams
  { value: "jee", label: "JEE (Engineering)", category: "competitive" },
  { value: "neet", label: "NEET (Medical)", category: "competitive" },
  { value: "upsc", label: "UPSC", category: "competitive" },
  { value: "cat", label: "CAT (MBA)", category: "competitive" },
  { value: "gate", label: "GATE", category: "competitive" },
  // College
  { value: "undergraduate", label: "Undergraduate", category: "college" },
  { value: "postgraduate", label: "Postgraduate", category: "college" },
];

// Streams for Class 11-12
export const streams = [
  { value: "science-pcm", label: "Science (PCM)" },
  { value: "science-pcb", label: "Science (PCB)" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts/Humanities" },
];

// Subjects by category
export const subjectsByLevel: Record<string, { name: string; color: string }[]> = {
  primary: [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "English", color: "#10B981" },
    { name: "Hindi", color: "#F59E0B" },
    { name: "Science", color: "#8B5CF6" },
    { name: "Social Studies", color: "#EF4444" },
    { name: "EVS", color: "#14B8A6" },
  ],
  secondary: [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "Science", color: "#8B5CF6" },
    { name: "English", color: "#10B981" },
    { name: "Hindi", color: "#F59E0B" },
    { name: "Social Science", color: "#EF4444" },
    { name: "Sanskrit", color: "#6366F1" },
  ],
  "science-pcm": [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Mathematics", color: "#10B981" },
    { name: "English", color: "#F59E0B" },
    { name: "Computer Science", color: "#14B8A6" },
    { name: "Physical Education", color: "#EF4444" },
  ],
  "science-pcb": [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Biology", color: "#10B981" },
    { name: "English", color: "#F59E0B" },
    { name: "Physical Education", color: "#EF4444" },
  ],
  commerce: [
    { name: "Accountancy", color: "#3B82F6" },
    { name: "Business Studies", color: "#8B5CF6" },
    { name: "Economics", color: "#10B981" },
    { name: "English", color: "#F59E0B" },
    { name: "Mathematics", color: "#14B8A6" },
  ],
  arts: [
    { name: "History", color: "#3B82F6" },
    { name: "Geography", color: "#8B5CF6" },
    { name: "Political Science", color: "#10B981" },
    { name: "Economics", color: "#F59E0B" },
    { name: "English", color: "#14B8A6" },
    { name: "Psychology", color: "#EF4444" },
  ],
  jee: [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Mathematics", color: "#10B981" },
  ],
  neet: [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Biology", color: "#10B981" },
  ],
  upsc: [
    { name: "General Studies", color: "#3B82F6" },
    { name: "CSAT", color: "#8B5CF6" },
    { name: "Optional Subject", color: "#10B981" },
    { name: "Essay", color: "#F59E0B" },
    { name: "Current Affairs", color: "#14B8A6" },
  ],
  cat: [
    { name: "Quantitative Aptitude", color: "#3B82F6" },
    { name: "Verbal Ability", color: "#8B5CF6" },
    { name: "Data Interpretation", color: "#10B981" },
    { name: "Logical Reasoning", color: "#F59E0B" },
  ],
  gate: [
    { name: "Engineering Mathematics", color: "#3B82F6" },
    { name: "Core Subject", color: "#8B5CF6" },
    { name: "General Aptitude", color: "#10B981" },
  ],
  college: [
    { name: "Subject 1", color: "#3B82F6" },
    { name: "Subject 2", color: "#8B5CF6" },
    { name: "Subject 3", color: "#10B981" },
    { name: "Subject 4", color: "#F59E0B" },
    { name: "Subject 5", color: "#14B8A6" },
  ],
};

// Get subjects based on class level and stream
export function getSubjectsForLevel(classLevel: string, stream?: string): { name: string; color: string }[] {
  const level = classLevels.find((c) => c.value === classLevel);
  if (!level) return [];

  if (level.category === "higher-secondary" && stream) {
    return subjectsByLevel[stream] || [];
  }

  if (level.category === "competitive") {
    return subjectsByLevel[classLevel] || [];
  }

  if (level.category === "college") {
    return subjectsByLevel.college;
  }

  return subjectsByLevel[level.category] || [];
}
