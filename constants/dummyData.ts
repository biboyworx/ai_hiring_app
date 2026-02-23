/**
 * Static dummy data for all screens during development.
 * Replace with real API calls when backend is connected.
 */

// ─── User Profile ──────────────────────────────────────
export const DUMMY_USER = {
  id: "usr_001",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  avatar: null, // Will use placeholder
  location: "San Francisco, CA",
  bio: "Full-stack developer with 5+ years of experience in React and Node.js. Passionate about building scalable applications.",
  expectedRole: "Senior Frontend Developer",
  experienceLevel: "Senior (5+ years)",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "React Native",
    "GraphQL",
    "AWS",
    "Docker",
    "PostgreSQL",
  ],
  education: [
    {
      school: "Stanford University",
      degree: "BS Computer Science",
      year: "2018",
    },
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      duration: "2021 – Present",
      description:
        "Led frontend architecture for enterprise SaaS platform serving 100K+ users.",
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      duration: "2018 – 2021",
      description:
        "Built and maintained core product features using React and Node.js.",
    },
  ],
  preferredWorkSetup: "Remote",
  salaryExpectation: "$120,000 – $150,000",
};

// ─── Notifications ─────────────────────────────────────
export const DUMMY_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Resume Parsed Successfully",
    message: "Your resume has been analyzed. View your extracted skills.",
    time: "5 min ago",
    read: false,
    type: "success" as const,
  },
  {
    id: "n2",
    title: "New Job Match",
    message: "Senior React Developer at TechCorp matches your profile.",
    time: "1 hour ago",
    read: false,
    type: "info" as const,
  },
  {
    id: "n3",
    title: "Interview Reminder",
    message: "Your AI interview session is scheduled for tomorrow at 2 PM.",
    time: "3 hours ago",
    read: true,
    type: "warning" as const,
  },
  {
    id: "n4",
    title: "Score Updated",
    message: "Your interview score has been calculated. Check your results.",
    time: "Yesterday",
    read: true,
    type: "info" as const,
  },
  {
    id: "n5",
    title: "Application Submitted",
    message: "Your application for Product Manager at InnovateCo was sent.",
    time: "2 days ago",
    read: true,
    type: "success" as const,
  },
];

// ─── Resume Data ───────────────────────────────────────
export const DUMMY_PARSED_RESUME = {
  fileName: "JohnDoe_Resume_2025.pdf",
  fileSize: "245 KB",
  parsedAt: "2025-02-20T10:30:00Z",
  skills: [
    { name: "React", confidence: 95 },
    { name: "TypeScript", confidence: 92 },
    { name: "Node.js", confidence: 88 },
    { name: "React Native", confidence: 85 },
    { name: "GraphQL", confidence: 78 },
    { name: "AWS", confidence: 75 },
    { name: "Docker", confidence: 70 },
    { name: "PostgreSQL", confidence: 72 },
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      duration: "3 years",
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      duration: "3 years",
    },
  ],
  education: [
    {
      school: "Stanford University",
      degree: "BS Computer Science",
      year: "2018",
    },
  ],
  keywords: [
    "Frontend Architecture",
    "API Design",
    "CI/CD",
    "Agile",
    "Team Leadership",
    "Performance Optimization",
  ],
  summary:
    "Experienced full-stack developer with strong frontend expertise. Proven track record of leading engineering teams and delivering scalable solutions.",
};

// ─── Jobs ──────────────────────────────────────────────
export const DUMMY_JOBS = [
  {
    id: "job_001",
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    salary: "$130K – $160K",
    type: "Full-time",
    matchScore: 95,
    posted: "2 days ago",
    description:
      "We are looking for an experienced React developer to join our growing team. You will lead the frontend architecture of our enterprise platform.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "State management (Redux/Zustand)",
      "REST & GraphQL APIs",
      "Testing (Jest, Cypress)",
    ],
    tags: ["React", "TypeScript", "Remote", "Senior"],
  },
  {
    id: "job_002",
    title: "Full Stack Engineer",
    company: "InnovateCo",
    location: "Hybrid – NYC",
    salary: "$120K – $145K",
    type: "Full-time",
    matchScore: 88,
    posted: "3 days ago",
    description:
      "Join a fast-paced startup building the future of edtech. Work on both frontend and backend systems.",
    requirements: [
      "3+ years full stack experience",
      "React + Node.js",
      "Database design",
      "Cloud services (AWS/GCP)",
    ],
    tags: ["Full Stack", "Node.js", "Hybrid", "Startup"],
  },
  {
    id: "job_003",
    title: "React Native Developer",
    company: "MobileFirst Labs",
    location: "Remote",
    salary: "$110K – $140K",
    type: "Full-time",
    matchScore: 92,
    posted: "1 week ago",
    description:
      "Build and maintain cross-platform mobile applications for our B2B clients. Ship features fast with quality.",
    requirements: [
      "3+ years React Native",
      "Expo ecosystem",
      "Native module experience",
      "App store deployment",
    ],
    tags: ["React Native", "Mobile", "Remote", "Expo"],
  },
  {
    id: "job_004",
    title: "Frontend Team Lead",
    company: "Enterprise Solutions",
    location: "Onsite – Austin, TX",
    salary: "$140K – $175K",
    type: "Full-time",
    matchScore: 82,
    posted: "4 days ago",
    description:
      "Lead a team of 5 frontend developers. Drive technical decisions, mentor juniors, and maintain code quality.",
    requirements: [
      "7+ years frontend experience",
      "Team leadership",
      "Architecture design",
      "Performance optimization",
    ],
    tags: ["Leadership", "React", "Onsite", "Senior"],
  },
  {
    id: "job_005",
    title: "Product Designer & Developer",
    company: "DesignHub",
    location: "Remote",
    salary: "$100K – $130K",
    type: "Contract",
    matchScore: 65,
    posted: "5 days ago",
    description:
      "Unique hybrid role combining UI/UX design with frontend development. Perfect for creative developers.",
    requirements: [
      "Figma proficiency",
      "React or Vue.js",
      "Design system experience",
      "CSS/Animation skills",
    ],
    tags: ["Design", "Frontend", "Remote", "Contract"],
  },
];

// ─── Interview Data ────────────────────────────────────
export const DUMMY_INTERVIEW_QUESTIONS = [
  {
    id: "q1",
    question:
      "Tell me about yourself and your experience in software development.",
    category: "Introduction",
    timeLimit: 120,
  },
  {
    id: "q2",
    question:
      "Describe a challenging project you worked on. What was your role and how did you overcome obstacles?",
    category: "Behavioral",
    timeLimit: 180,
  },
  {
    id: "q3",
    question:
      "How do you approach debugging a complex issue in a production environment?",
    category: "Technical",
    timeLimit: 150,
  },
  {
    id: "q4",
    question:
      "Explain the difference between server-side rendering and client-side rendering. When would you use each?",
    category: "Technical",
    timeLimit: 120,
  },
  {
    id: "q5",
    question:
      "How do you handle disagreements with team members on technical decisions?",
    category: "Behavioral",
    timeLimit: 120,
  },
];

// ─── Score & Results ───────────────────────────────────
export const DUMMY_SCORES = {
  overall: 87,
  categories: [
    { name: "Skills Match", score: 92, icon: "code" as const },
    { name: "Experience Relevance", score: 88, icon: "briefcase" as const },
    { name: "Communication", score: 85, icon: "comments" as const },
    { name: "Confidence & Tone", score: 83, icon: "microphone" as const },
    { name: "Behavioral Fit", score: 89, icon: "users" as const },
  ],
  strengths: [
    "Strong technical knowledge in React ecosystem",
    "Clear and structured communication style",
    "Good problem-solving approach with real examples",
    "Demonstrates leadership and team collaboration",
  ],
  weaknesses: [
    "Could elaborate more on system design decisions",
    "Limited examples of cross-functional collaboration",
    "May benefit from discussing failure scenarios more openly",
  ],
  improvementTips: [
    "Practice explaining complex topics in simpler terms",
    "Prepare 2-3 STAR format stories for behavioral questions",
    "Review system design fundamentals for senior-level interviews",
    "Consider adding cloud architecture experience to your skillset",
  ],
  recommendedRoles: [
    "Senior Frontend Developer",
    "React Native Developer",
    "Full Stack Engineer",
    "Frontend Team Lead",
  ],
};

// ─── Application Status (Pipeline) ─────────────────────
// New flow: Apply → Resume Submitted → Resume Scored → AI Interview → Scored → Decision
export type ApplicationStatus =
  | "Resume Submitted"
  | "Resume Scoring"
  | "Resume Scored"
  | "Interview Pending"
  | "Interview Completed"
  | "Under Review"
  | "Shortlisted"
  | "Offered"
  | "Rejected";

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdate: string;
  resumeMatchScore: number | null; // resume vs job match %
  interviewScore: number | null; // AI interview score
}

export const DUMMY_APPLICATIONS: Application[] = [
  {
    id: "app_001",
    jobId: "job_001",
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc.",
    status: "Interview Completed",
    appliedDate: "Feb 15, 2025",
    lastUpdate: "Feb 18, 2025",
    resumeMatchScore: 95,
    interviewScore: 87,
  },
  {
    id: "app_002",
    jobId: "job_002",
    jobTitle: "Full Stack Engineer",
    company: "InnovateCo",
    status: "Resume Scored",
    appliedDate: "Feb 12, 2025",
    lastUpdate: "Feb 14, 2025",
    resumeMatchScore: 88,
    interviewScore: null,
  },
  {
    id: "app_003",
    jobId: "job_003",
    jobTitle: "React Native Developer",
    company: "MobileFirst Labs",
    status: "Interview Pending",
    appliedDate: "Feb 10, 2025",
    lastUpdate: "Feb 17, 2025",
    resumeMatchScore: 92,
    interviewScore: null,
  },
  {
    id: "app_004",
    jobId: "job_004",
    jobTitle: "Frontend Team Lead",
    company: "Enterprise Solutions",
    status: "Resume Submitted",
    appliedDate: "Feb 18, 2025",
    lastUpdate: "Feb 18, 2025",
    resumeMatchScore: null,
    interviewScore: null,
  },
  {
    id: "app_005",
    jobId: "job_005",
    jobTitle: "Product Designer & Developer",
    company: "DesignHub",
    status: "Rejected",
    appliedDate: "Feb 5, 2025",
    lastUpdate: "Feb 12, 2025",
    resumeMatchScore: 65,
    interviewScore: null,
  },
  {
    id: "app_006",
    jobId: "job_001",
    jobTitle: "Senior React Developer",
    company: "TechCorp Inc.",
    status: "Offered",
    appliedDate: "Jan 20, 2025",
    lastUpdate: "Feb 10, 2025",
    resumeMatchScore: 95,
    interviewScore: 92,
  },
];

// ─── FAQ Data ──────────────────────────────────────────
export const DUMMY_FAQ = [
  {
    id: "faq_1",
    question: "How does the AI interview work?",
    answer:
      "The AI interview uses advanced natural language processing to conduct a voice-based interview. It asks relevant questions based on your resume and desired role, then evaluates your responses for skills match, communication quality, and more.",
  },
  {
    id: "faq_2",
    question: "How is my score calculated?",
    answer:
      "Your score is based on multiple factors: skills relevance (30%), experience match (25%), communication quality (20%), confidence and tone (15%), and behavioral indicators (10%). Each category is scored individually and combined for an overall rating.",
  },
  {
    id: "faq_3",
    question: "Can I retake the AI interview?",
    answer:
      "Yes, you can retake the interview once every 7 days. Your latest score will be used for job matching. However, all previous scores are stored for your reference.",
  },
  {
    id: "faq_4",
    question: "What file formats are supported for resume upload?",
    answer:
      "We support PDF, DOC, and DOCX formats. For best results, we recommend uploading a well-formatted PDF with clear headings and sections.",
  },
  {
    id: "faq_5",
    question: "How do I improve my match score?",
    answer:
      "Complete your profile fully, upload an updated resume, and practice with the AI interview. Focus on the improvement tips provided in your score feedback.",
  },
  {
    id: "faq_6",
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption for all data. Your personal information and interview recordings are stored securely and never shared without your consent.",
  },
];

// ─── Onboarding Slides ────────────────────────────────
export const ONBOARDING_SLIDES = [
  {
    id: "1",
    image: require("@/assets/images/onboarding_img.jpg"),
    title: "NexHire",
    subtitle: "AI-Driven Recruitment Platform",
    description: "Leverage cutting-edge AI\nto build your future workforce.",
    isSplash: true,
  },
  {
    id: "2",
    image: require("@/assets/images/finding_job.jpg"),
    title: "Find Remote\nOpportunities That Fit\nYou",
    description:
      "Get matched with verified global clients looking for skilled virtual professionals like you.",
    isSplash: false,
  },
  {
    id: "3",
    image: require("@/assets/images/interviewing_ai.jpg"),
    title: "Interview with AI First",
    description:
      "Complete your initial screening through our AI interview system. Get instant scoring and feedback.",
    isSplash: false,
  },
  {
    id: "4",
    image: require("@/assets/images/get_priority_hired.jpg"),
    title: "Get Hired Faster",
    description:
      "Top-performing applicants move directly to client interviews. No long waiting process.",
    isSplash: false,
  },
];
