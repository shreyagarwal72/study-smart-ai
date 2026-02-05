// Class/Grade level definitions
export const classLevels = [
  // Primary School (Classes 1-8)
  { value: "class-1", label: "Class 1", category: "primary" },
  { value: "class-2", label: "Class 2", category: "primary" },
  { value: "class-3", label: "Class 3", category: "primary" },
  { value: "class-4", label: "Class 4", category: "primary" },
  { value: "class-5", label: "Class 5", category: "primary" },
  { value: "class-6", label: "Class 6", category: "middle" },
  { value: "class-7", label: "Class 7", category: "middle" },
  { value: "class-8", label: "Class 8", category: "middle" },
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

// Full CBSE NCERT Syllabus - Subjects by category
export const subjectsByLevel: Record<string, { name: string; color: string }[]> = {
  // Classes 1-5: Primary (No fixed chapters)
  primary: [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "English", color: "#10B981" },
    { name: "Hindi", color: "#F59E0B" },
    { name: "EVS (Environmental Studies)", color: "#8B5CF6" },
  ],
  // Classes 6-8: Middle School (No fixed chapters per NCERT flexibility)
  middle: [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "Science", color: "#8B5CF6" },
    { name: "English", color: "#10B981" },
    { name: "Hindi", color: "#F59E0B" },
    { name: "Social Science - History", color: "#EF4444" },
    { name: "Social Science - Geography", color: "#14B8A6" },
    { name: "Social Science - Civics", color: "#6366F1" },
    { name: "Sanskrit", color: "#EC4899" },
  ],
  // Class 9-10: Secondary (CBSE Board)
  secondary: [
    { name: "Mathematics", color: "#3B82F6" },
    { name: "Science", color: "#8B5CF6" },
    { name: "English Language & Literature", color: "#10B981" },
    { name: "Hindi Course A/B", color: "#F59E0B" },
    { name: "Social Science - History", color: "#EF4444" },
    { name: "Social Science - Geography", color: "#14B8A6" },
    { name: "Social Science - Political Science", color: "#6366F1" },
    { name: "Social Science - Economics", color: "#EC4899" },
    { name: "Sanskrit", color: "#84CC16" },
    { name: "Information Technology", color: "#0EA5E9" },
  ],
  // Class 11-12 Science PCM
  "science-pcm": [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Mathematics", color: "#10B981" },
    { name: "English Core", color: "#F59E0B" },
    { name: "Computer Science / IP", color: "#14B8A6" },
    { name: "Physical Education", color: "#EF4444" },
  ],
  // Class 11-12 Science PCB
  "science-pcb": [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry", color: "#8B5CF6" },
    { name: "Biology", color: "#10B981" },
    { name: "English Core", color: "#F59E0B" },
    { name: "Psychology", color: "#14B8A6" },
    { name: "Physical Education", color: "#EF4444" },
  ],
  // Class 11-12 Commerce
  commerce: [
    { name: "Accountancy", color: "#3B82F6" },
    { name: "Business Studies", color: "#8B5CF6" },
    { name: "Economics", color: "#10B981" },
    { name: "English Core", color: "#F59E0B" },
    { name: "Mathematics", color: "#14B8A6" },
    { name: "Entrepreneurship", color: "#EF4444" },
    { name: "Informatics Practices", color: "#6366F1" },
  ],
  // Class 11-12 Arts/Humanities
  arts: [
    { name: "History", color: "#3B82F6" },
    { name: "Geography", color: "#8B5CF6" },
    { name: "Political Science", color: "#10B981" },
    { name: "Economics", color: "#F59E0B" },
    { name: "English Core", color: "#14B8A6" },
    { name: "Psychology", color: "#EF4444" },
    { name: "Sociology", color: "#6366F1" },
    { name: "Philosophy", color: "#EC4899" },
    { name: "Hindi Elective", color: "#84CC16" },
  ],
  // JEE Preparation
  jee: [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry - Physical", color: "#8B5CF6" },
    { name: "Chemistry - Organic", color: "#10B981" },
    { name: "Chemistry - Inorganic", color: "#14B8A6" },
    { name: "Mathematics - Algebra", color: "#F59E0B" },
    { name: "Mathematics - Calculus", color: "#EF4444" },
    { name: "Mathematics - Coordinate Geometry", color: "#6366F1" },
  ],
  // NEET Preparation
  neet: [
    { name: "Physics", color: "#3B82F6" },
    { name: "Chemistry - Physical", color: "#8B5CF6" },
    { name: "Chemistry - Organic", color: "#10B981" },
    { name: "Chemistry - Inorganic", color: "#14B8A6" },
    { name: "Biology - Botany", color: "#F59E0B" },
    { name: "Biology - Zoology", color: "#EF4444" },
  ],
  // UPSC Preparation
  upsc: [
    { name: "General Studies I - Indian Heritage & Culture", color: "#3B82F6" },
    { name: "General Studies II - Governance & Constitution", color: "#8B5CF6" },
    { name: "General Studies III - Economy & Environment", color: "#10B981" },
    { name: "General Studies IV - Ethics", color: "#F59E0B" },
    { name: "CSAT", color: "#14B8A6" },
    { name: "Essay", color: "#EF4444" },
    { name: "Current Affairs", color: "#6366F1" },
    { name: "Optional Subject", color: "#EC4899" },
  ],
  // CAT Preparation
  cat: [
    { name: "Quantitative Aptitude", color: "#3B82F6" },
    { name: "Verbal Ability & Reading Comprehension", color: "#8B5CF6" },
    { name: "Data Interpretation & Logical Reasoning", color: "#10B981" },
  ],
  // GATE Preparation
  gate: [
    { name: "Engineering Mathematics", color: "#3B82F6" },
    { name: "Core Subject - Part 1", color: "#8B5CF6" },
    { name: "Core Subject - Part 2", color: "#10B981" },
    { name: "Core Subject - Part 3", color: "#14B8A6" },
    { name: "General Aptitude", color: "#F59E0B" },
  ],
  // College Level
  college: [
    { name: "Core Subject 1", color: "#3B82F6" },
    { name: "Core Subject 2", color: "#8B5CF6" },
    { name: "Core Subject 3", color: "#10B981" },
    { name: "Elective 1", color: "#F59E0B" },
    { name: "Elective 2", color: "#14B8A6" },
    { name: "Language", color: "#EF4444" },
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
