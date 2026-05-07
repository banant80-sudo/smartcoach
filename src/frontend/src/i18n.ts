import type { AppLanguage } from "./types";

export interface I18nStrings {
  // App
  appName: string;
  tagline: string;

  // Nav
  home: string;
  dashboard: string;
  students: string;
  reports: string;
  settings: string;
  login: string;
  logout: string;

  // Grades
  lkg: string;
  ukg: string;
  std1: string;
  std2: string;
  std3: string;
  std4: string;
  std5: string;
  std6: string;
  std7: string;
  std8: string;
  std9: string;
  std10: string;

  // Status flags
  needsAttention: string;
  improving: string;
  onTrack: string;

  // Buttons & Labels
  startCoaching: string;
  viewDetails: string;
  addStudent: string;
  takeQuiz: string;
  saveNote: string;
  cancel: string;
  submit: string;
  search: string;
  loading: string;
  noStudents: string;
  progress: string;
  coachingNotes: string;
  lessonPlans: string;
  quizzes: string;
  recentAttempts: string;
  subject: string;
  score: string;
  date: string;
  writeCoachingNote: string;
  grade: string;
  section: string;
  language: string;
  allGrades: string;
  welcomeBack: string;
  teacherPortal: string;
  studentPortal: string;
}

const english: I18nStrings = {
  appName: "SmartCoach",
  tagline: "Coaching Platform",
  home: "Home",
  dashboard: "Dashboard",
  students: "Students",
  reports: "Reports",
  settings: "Settings",
  login: "Login",
  logout: "Logout",
  lkg: "LKG",
  ukg: "UKG",
  std1: "Standard 1",
  std2: "Standard 2",
  std3: "Standard 3",
  std4: "Standard 4",
  std5: "Standard 5",
  std6: "Standard 6",
  std7: "Standard 7",
  std8: "Standard 8",
  std9: "Standard 9",
  std10: "Standard 10",
  needsAttention: "Needs Attention",
  improving: "Improving",
  onTrack: "On Track",
  startCoaching: "Start Coaching",
  viewDetails: "View Details",
  addStudent: "Add Student",
  takeQuiz: "Take Quiz",
  saveNote: "Save Note",
  cancel: "Cancel",
  submit: "Submit",
  search: "Search students...",
  loading: "Loading...",
  noStudents: "No students found",
  progress: "Progress",
  coachingNotes: "Coaching Notes",
  lessonPlans: "Lesson Plans",
  quizzes: "Quizzes",
  recentAttempts: "Recent Attempts",
  subject: "Subject",
  score: "Score",
  date: "Date",
  writeCoachingNote: "Write coaching note...",
  grade: "Grade",
  section: "Section",
  language: "Language",
  allGrades: "All Grades",
  welcomeBack: "Welcome back",
  teacherPortal: "Teacher Portal",
  studentPortal: "Student Portal",
};

const hindi: I18nStrings = {
  appName: "स्मार्टकोच",
  tagline: "कोचिंग प्लेटफ़ॉर्म",
  home: "होम",
  dashboard: "डैशबोर्ड",
  students: "छात्र",
  reports: "रिपोर्ट",
  settings: "सेटिंग्स",
  login: "लॉगिन",
  logout: "लॉगआउट",
  lkg: "एलकेजी",
  ukg: "यूकेजी",
  std1: "कक्षा 1",
  std2: "कक्षा 2",
  std3: "कक्षा 3",
  std4: "कक्षा 4",
  std5: "कक्षा 5",
  std6: "कक्षा 6",
  std7: "कक्षा 7",
  std8: "कक्षा 8",
  std9: "कक्षा 9",
  std10: "कक्षा 10",
  needsAttention: "ध्यान चाहिए",
  improving: "सुधर रहा है",
  onTrack: "सही राह पर",
  startCoaching: "कोचिंग शुरू करें",
  viewDetails: "विवरण देखें",
  addStudent: "छात्र जोड़ें",
  takeQuiz: "क्विज़ लें",
  saveNote: "नोट सहेजें",
  cancel: "रद्द करें",
  submit: "जमा करें",
  search: "छात्र खोजें...",
  loading: "लोड हो रहा है...",
  noStudents: "कोई छात्र नहीं मिला",
  progress: "प्रगति",
  coachingNotes: "कोचिंग नोट्स",
  lessonPlans: "पाठ योजना",
  quizzes: "क्विज़",
  recentAttempts: "हाल के प्रयास",
  subject: "विषय",
  score: "अंक",
  date: "तारीख",
  writeCoachingNote: "कोचिंग नोट लिखें...",
  grade: "ग्रेड",
  section: "सेक्शन",
  language: "भाषा",
  allGrades: "सभी ग्रेड",
  welcomeBack: "वापस स्वागत है",
  teacherPortal: "शिक्षक पोर्टल",
  studentPortal: "छात्र पोर्टल",
};

const odia: I18nStrings = {
  appName: "ସ୍ମାର୍ଟକୋଚ",
  tagline: "କୋଚିଂ ପ୍ଲାଟଫର୍ମ",
  home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
  dashboard: "ଡ୍ୟାଶବୋର୍ଡ",
  students: "ଛାତ୍ର",
  reports: "ରିପୋର୍ଟ",
  settings: "ସେଟିଂ",
  login: "ଲଗଇନ",
  logout: "ଲଗଆଉଟ",
  lkg: "ଏଲକେଜି",
  ukg: "ୟୁକେଜି",
  std1: "ଶ୍ରେଣୀ ୧",
  std2: "ଶ୍ରେଣୀ ୨",
  std3: "ଶ୍ରେଣୀ ୩",
  std4: "ଶ୍ରେଣୀ ୪",
  std5: "ଶ୍ରେଣୀ ୫",
  std6: "ଶ୍ରେଣୀ ୬",
  std7: "ଶ୍ରେଣୀ ୭",
  std8: "ଶ୍ରେଣୀ ୮",
  std9: "ଶ୍ରେଣୀ ୯",
  std10: "ଶ୍ରେଣୀ ୧୦",
  needsAttention: "ଧ୍ୟାନ ଦରକାର",
  improving: "ଉନ୍ନତି ହେଉଛି",
  onTrack: "ଠିକ୍ ଚଲାଯାଇଛି",
  startCoaching: "କୋଚିଂ ଆରମ୍ଭ",
  viewDetails: "ବିବରଣୀ ଦେଖ",
  addStudent: "ଛାତ୍ର ଯୋଡ",
  takeQuiz: "କ୍ୱିଜ ନିଅ",
  saveNote: "ନୋଟ ସଞ୍ଚୟ",
  cancel: "ବାତିଲ",
  submit: "ଜମା ଦିଅ",
  search: "ଛାତ୍ର ଖୋଜ...",
  loading: "ଲୋଡ ହେଉଛି...",
  noStudents: "କୋଣସି ଛାତ୍ର ମିଳିଲା ନାହିଁ",
  progress: "ଅଗ୍ରଗତି",
  coachingNotes: "କୋଚିଂ ନୋଟ",
  lessonPlans: "ପାଠ ଯୋଜନା",
  quizzes: "କ୍ୱିଜ",
  recentAttempts: "ସାମ୍ପ୍ରତିକ ପ୍ରୟାସ",
  subject: "ବିଷୟ",
  score: "ସ୍କୋର",
  date: "ତାରିଖ",
  writeCoachingNote: "କୋଚିଂ ନୋଟ ଲେଖ...",
  grade: "ଶ୍ରେଣୀ",
  section: "ସେକ୍ସନ",
  language: "ଭାଷା",
  allGrades: "ସମସ୍ତ ଶ୍ରେଣୀ",
  welcomeBack: "ପୁଣି ସ୍ୱାଗତ",
  teacherPortal: "ଶିକ୍ଷକ ପୋର୍ଟାଲ",
  studentPortal: "ଛାତ୍ର ପୋର୍ଟାଲ",
};

export const translations: Record<AppLanguage, I18nStrings> = {
  english,
  hindi,
  odia,
};

export function useI18n(lang: AppLanguage): I18nStrings {
  return translations[lang];
}
