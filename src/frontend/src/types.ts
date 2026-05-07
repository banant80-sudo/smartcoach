export type {
  Student,
  Teacher,
  Quiz,
  QuizAttempt,
  CoachingNote,
  Lesson,
  StudentProgress,
  Question,
  CreateStudentRequest,
  CreateNoteRequest,
  CreateQuizRequest,
  CreateLessonRequest,
  SubmitAttemptRequest,
} from "@/backend";
export { Grade, Language, ProgressFlag, QuestionType } from "@/backend";
export type {
  StudentId,
  TeacherId,
  QuizId,
  NoteId,
  LessonId,
  AttemptId,
  Timestamp,
} from "@/backend";

export type AppLanguage = "english" | "hindi" | "odia";
