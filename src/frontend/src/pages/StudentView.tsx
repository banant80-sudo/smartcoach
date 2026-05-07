import { GradeTag } from "@/components/GradeTag";
import { ProgressBadge, ProgressBar } from "@/components/ProgressBadge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useCoachingNotes,
  useGetStudent,
  useLessonsByGrade,
  useListQuizzesByGrade,
  useStudentAttempts,
  useStudentProgress,
} from "@/hooks/useBackend";
import { Language, ProgressFlag } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  PlayCircle,
  Trophy,
} from "lucide-react";

const LANG_BADGE_MAP: Record<Language, string> = {
  [Language.english]: "EN",
  [Language.hindi]: "HI",
  [Language.odia]: "OD",
};

function langBadgeColor(lang: Language) {
  if (lang === Language.odia)
    return "bg-[oklch(0.6_0.18_150/0.12)] text-[oklch(0.45_0.18_150)]";
  if (lang === Language.hindi)
    return "bg-[oklch(0.72_0.15_85/0.12)] text-[oklch(0.52_0.14_85)]";
  return "bg-primary/10 text-primary";
}

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString();
}

export default function StudentView() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/student/$id" });
  const navigate = useNavigate();
  const studentId = BigInt(id);

  const { data: student, isLoading: loadingStudent } = useGetStudent(studentId);
  const { data: progress } = useStudentProgress(studentId);
  const { data: attempts = [] } = useStudentAttempts(studentId);
  const { data: notes = [] } = useCoachingNotes(studentId);
  const { data: lessons = [] } = useLessonsByGrade(
    student ? student.grade : null,
  );
  const { data: quizzes = [] } = useListQuizzesByGrade(
    student ? student.grade : null,
  );

  const flag = progress?.flag ?? ProgressFlag.red;
  const scores = progress?.latestScores.map(Number) ?? [];
  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  if (loadingStudent) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="student_view.loading_state"
      >
        <div className="space-y-3 w-full max-w-md p-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="student_view.error_state"
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            {language === "odia"
              ? "ଛାତ୍ର ମିଳିଲା ନାହିଁ"
              : language === "hindi"
                ? "छात्र नहीं मिला"
                : "Student not found"}
          </p>
          <Button
            type="button"
            onClick={() => navigate({ to: "/" })}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4" /> {t.home}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="student_view.page"
    >
      <header className="bg-card border-b border-border px-6 py-4 shadow-sm flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="student_view.back_button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="font-display font-bold text-foreground text-lg">
            {student.name}
          </h1>
          <GradeTag grade={student.grade} />
        </div>
        <ProgressBadge flag={flag} size="sm" />
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-3xl mx-auto w-full">
        {/* Progress summary */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            {t.progress}
          </p>
          <ProgressBar score={avgScore} />
          <div className="flex items-center justify-between mt-3">
            <ProgressBadge flag={flag} size="md" />
            <span className="text-2xl font-display font-bold text-foreground">
              {avgScore}
              <span className="text-sm text-muted-foreground">%</span>
            </span>
          </div>
        </div>

        {/* Lessons */}
        <section data-ocid="student_view.lessons_section">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            {t.lessonPlans}
          </h2>
          {lessons.length === 0 ? (
            <div
              className="text-center py-8 bg-card border border-border rounded-xl text-muted-foreground"
              data-ocid="student_view.lessons_empty"
            >
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "କୌଣସି ପାଠ ଉପଲବ୍ଧ ନାହିଁ"
                  : language === "hindi"
                    ? "कोई पाठ उपलब्ध नहीं"
                    : "No lessons available yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {lessons.map((lesson, i) => (
                <div
                  key={lesson.id.toString()}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                  data-ocid={`student_view.lesson.${i + 1}`}
                >
                  <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lesson.subject}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${langBadgeColor(lesson.language)}`}
                  >
                    {LANG_BADGE_MAP[lesson.language]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quizzes */}
        <section data-ocid="student_view.quizzes_section">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <PlayCircle className="w-5 h-5 text-accent" />
            {t.quizzes}
          </h2>
          {quizzes.length === 0 ? (
            <div
              className="text-center py-8 bg-card border border-border rounded-xl text-muted-foreground"
              data-ocid="student_view.quizzes_empty"
            >
              <PlayCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "କୌଣସି କ୍ୱିଜ ଉପଲବ୍ଧ ନାହିଁ"
                  : language === "hindi"
                    ? "कोई क्विज़ उपलब्ध नहीं"
                    : "No quizzes available"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {quizzes.map((quiz, i) => (
                <div
                  key={quiz.id.toString()}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                  data-ocid={`student_view.quiz.${i + 1}`}
                >
                  <PlayCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {quiz.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {quiz.subject} · {quiz.questions.length}{" "}
                      {language === "odia"
                        ? "ପ୍ରଶ୍ନ"
                        : language === "hindi"
                          ? "प्रश्न"
                          : "questions"}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-semibold"
                    onClick={() =>
                      navigate({
                        to: "/quiz/$id",
                        params: { id: quiz.id.toString() },
                      })
                    }
                    data-ocid={`student_view.quiz_start.${i + 1}`}
                  >
                    {t.takeQuiz}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent attempts */}
        <section data-ocid="student_view.attempts_section">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-primary" />
            {t.recentAttempts}
          </h2>
          {attempts.length === 0 ? (
            <div
              className="text-center py-8 bg-card border border-border rounded-xl text-muted-foreground"
              data-ocid="student_view.attempts_empty"
            >
              <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପ୍ରୟାସ ନାହିଁ"
                  : language === "hindi"
                    ? "अभी तक कोई प्रयास नहीं"
                    : "No attempts yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {attempts.map((a, i) => {
                const pct = Math.round(
                  (Number(a.score) / Math.max(1, Number(a.totalQuestions))) *
                    100,
                );
                const pctFlag =
                  pct >= 70
                    ? ProgressFlag.green
                    : pct >= 40
                      ? ProgressFlag.yellow
                      : ProgressFlag.red;
                return (
                  <div
                    key={a.id.toString()}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                    data-ocid={`student_view.attempt.${i + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        Quiz #{a.quizId.toString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(a.timestamp)}
                      </p>
                    </div>
                    <ProgressBadge flag={pctFlag} size="sm" />
                    <span className="text-sm font-bold text-foreground">
                      {Number(a.score)}/{Number(a.totalQuestions)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Coaching feedback */}
        <section data-ocid="student_view.coaching_section">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            {t.coachingNotes}
          </h2>
          {notes.length === 0 ? (
            <div
              className="text-center py-8 bg-card border border-border rounded-xl text-muted-foreground"
              data-ocid="student_view.coaching_empty"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫିଡ଼ବ୍ୟାକ ନାହିଁ"
                  : language === "hindi"
                    ? "अभी तक कोई फ़ीडबैक नहीं"
                    : "No feedback from teacher yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note, i) => (
                <div
                  key={note.id.toString()}
                  className="bg-card border border-border rounded-xl p-4"
                  data-ocid={`student_view.note.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      {note.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(note.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="bg-card border-t border-border px-6 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
