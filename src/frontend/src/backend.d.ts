import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Student {
    id: StudentId;
    languagePreference: Language;
    name: string;
    createdAt: Timestamp;
    grade: Grade;
}
export interface SubmitAttemptRequest {
    studentId: StudentId;
    answers: Array<string>;
    quizId: QuizId;
}
export type Timestamp = bigint;
export type NoteId = bigint;
export type AttemptId = bigint;
export type LessonId = bigint;
export interface CreateNoteRequest {
    content: string;
    studentId: StudentId;
    subject: string;
    teacherId: TeacherId;
}
export interface Quiz {
    id: QuizId;
    title: string;
    subject: string;
    createdAt: Timestamp;
    gradeLevel: Grade;
    questions: Array<Question>;
}
export type QuestionId = bigint;
export interface CreateTeacherRequest {
    name: string;
}
export interface Teacher {
    id: TeacherId;
    principal: Principal;
    name: string;
}
export type StudentId = bigint;
export type TeacherId = bigint;
export interface CreateStudentRequest {
    languagePreference: Language;
    name: string;
    grade: Grade;
}
export interface Lesson {
    id: LessonId;
    title: string;
    content: string;
    subject: string;
    createdAt: Timestamp;
    language: Language;
    gradeLevel: Grade;
}
export interface QuizAttempt {
    id: AttemptId;
    studentId: StudentId;
    answers: Array<string>;
    score: bigint;
    totalQuestions: bigint;
    timestamp: Timestamp;
    quizId: QuizId;
}
export interface CreateQuizRequest {
    title: string;
    subject: string;
    gradeLevel: Grade;
    questions: Array<Question>;
}
export interface StudentProgress {
    studentId: StudentId;
    flag: ProgressFlag;
    latestAttempts: Array<QuizAttempt>;
    latestScores: Array<bigint>;
}
export interface CoachingNote {
    id: NoteId;
    content: string;
    studentId: StudentId;
    subject: string;
    teacherId: TeacherId;
    timestamp: Timestamp;
}
export interface Question {
    id: QuestionId;
    text: string;
    correctAnswer: string;
    questionType: QuestionType;
    options: Array<string>;
}
export interface CreateLessonRequest {
    title: string;
    content: string;
    subject: string;
    language: Language;
    gradeLevel: Grade;
}
export type QuizId = bigint;
export enum Grade {
    lkg = "lkg",
    ukg = "ukg",
    std1 = "std1",
    std2 = "std2",
    std3 = "std3",
    std4 = "std4",
    std5 = "std5",
    std6 = "std6",
    std7 = "std7",
    std8 = "std8",
    std9 = "std9",
    std10 = "std10"
}
export enum Language {
    hindi = "hindi",
    odia = "odia",
    english = "english"
}
export enum ProgressFlag {
    red = "red",
    green = "green",
    yellow = "yellow"
}
export enum QuestionType {
    shortAnswer = "shortAnswer",
    multipleChoice = "multipleChoice"
}
export interface backendInterface {
    addCoachingNote(req: CreateNoteRequest): Promise<CoachingNote>;
    createLesson(req: CreateLessonRequest): Promise<Lesson>;
    createQuiz(req: CreateQuizRequest): Promise<Quiz>;
    createStudent(req: CreateStudentRequest): Promise<Student>;
    createTeacher(req: CreateTeacherRequest): Promise<Teacher>;
    getAttemptDetail(attemptId: AttemptId): Promise<QuizAttempt | null>;
    getCoachingNotesForStudent(studentId: StudentId): Promise<Array<CoachingNote>>;
    getLessonsByGrade(grade: Grade): Promise<Array<Lesson>>;
    getQuiz(id: QuizId): Promise<Quiz | null>;
    getStudent(id: StudentId): Promise<Student | null>;
    getStudentAttempts(studentId: StudentId): Promise<Array<QuizAttempt>>;
    getStudentProgress(studentId: StudentId): Promise<StudentProgress>;
    getTeacher(id: TeacherId): Promise<Teacher | null>;
    listQuizzesByGrade(grade: Grade): Promise<Array<Quiz>>;
    listStudents(gradeFilter: Grade | null): Promise<Array<Student>>;
    submitQuizAttempt(req: SubmitAttemptRequest): Promise<QuizAttempt>;
    updateStudentLanguage(id: StudentId, language: Language): Promise<boolean>;
}
