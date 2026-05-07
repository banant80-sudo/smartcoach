import { createActor } from "@/backend";
import type {
  AttemptId,
  CoachingNote,
  CreateLessonRequest,
  CreateNoteRequest,
  CreateQuizRequest,
  CreateStudentRequest,
  Lesson,
  Quiz,
  QuizAttempt,
  QuizId,
  Student,
  StudentId,
  StudentProgress,
  SubmitAttemptRequest,
  Teacher,
  TeacherId,
} from "@/types";
import type { Grade } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Students ──────────────────────────────────────────────────────────────────

export function useListStudents(gradeFilter?: Grade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student[]>({
    queryKey: ["students", gradeFilter ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listStudents(gradeFilter ?? null);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStudent(id: StudentId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student | null>({
    queryKey: ["student", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getStudent(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Student, Error, CreateStudentRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createStudent(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

// ── Teachers ──────────────────────────────────────────────────────────────────

export function useGetTeacher(id: TeacherId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Teacher | null>({
    queryKey: ["teacher", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getTeacher(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

// ── Progress ──────────────────────────────────────────────────────────────────

export function useStudentProgress(studentId: StudentId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StudentProgress | null>({
    queryKey: ["progress", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === null) return null;
      return actor.getStudentProgress(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== null,
  });
}

export function useStudentAttempts(studentId: StudentId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<QuizAttempt[]>({
    queryKey: ["attempts", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === null) return [];
      return actor.getStudentAttempts(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== null,
  });
}

export function useAttemptDetail(attemptId: AttemptId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<QuizAttempt | null>({
    queryKey: ["attempt", attemptId?.toString()],
    queryFn: async () => {
      if (!actor || attemptId === null) return null;
      return actor.getAttemptDetail(attemptId);
    },
    enabled: !!actor && !isFetching && attemptId !== null,
  });
}

export function useSubmitQuizAttempt() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<QuizAttempt, Error, SubmitAttemptRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitQuizAttempt(req);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["attempts", variables.studentId.toString()],
      });
      qc.invalidateQueries({
        queryKey: ["progress", variables.studentId.toString()],
      });
    },
  });
}

// ── Coaching Notes ────────────────────────────────────────────────────────────

export function useCoachingNotes(studentId: StudentId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CoachingNote[]>({
    queryKey: ["coaching-notes", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === null) return [];
      return actor.getCoachingNotesForStudent(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== null,
  });
}

export function useAddCoachingNote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<CoachingNote, Error, CreateNoteRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addCoachingNote(req);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["coaching-notes", variables.studentId.toString()],
      });
    },
  });
}

// ── Lessons ───────────────────────────────────────────────────────────────────

export function useLessonsByGrade(grade: Grade | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Lesson[]>({
    queryKey: ["lessons", grade],
    queryFn: async () => {
      if (!actor || grade === null) return [];
      return actor.getLessonsByGrade(grade);
    },
    enabled: !!actor && !isFetching && grade !== null,
  });
}

export function useCreateLesson() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Lesson, Error, CreateLessonRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createLesson(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}

// ── Quizzes ───────────────────────────────────────────────────────────────────

export function useListQuizzesByGrade(grade: Grade | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Quiz[]>({
    queryKey: ["quizzes", grade],
    queryFn: async () => {
      if (!actor || grade === null) return [];
      return actor.listQuizzesByGrade(grade);
    },
    enabled: !!actor && !isFetching && grade !== null,
  });
}

export function useGetQuiz(id: QuizId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Quiz | null>({
    queryKey: ["quiz", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getQuiz(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateQuiz() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<Quiz, Error, CreateQuizRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createQuiz(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quizzes"] }),
  });
}
