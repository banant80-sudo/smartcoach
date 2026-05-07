import { ProgressBadge } from "@/components/ProgressBadge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGetQuiz, useSubmitQuizAttempt } from "@/hooks/useBackend";
import type { Question } from "@/types";
import { ProgressFlag, QuestionType } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { useState } from "react";

interface QuizResult {
  score: number;
  total: number;
  flag: ProgressFlag;
}

function computeFlag(pct: number): ProgressFlag {
  if (pct >= 70) return ProgressFlag.green;
  if (pct >= 40) return ProgressFlag.yellow;
  return ProgressFlag.red;
}

export default function QuizPage() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/quiz/$id" });
  const navigate = useNavigate();
  const quizId = BigInt(id);

  const { data: quiz, isLoading } = useGetQuiz(quizId);
  const submitAttempt = useSubmitQuizAttempt();

  const [studentIdInput, setStudentIdInput] = useState("");
  const [studentIdConfirmed, setStudentIdConfirmed] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  function startQuiz() {
    if (!studentIdInput.trim() || !quiz) return;
    setAnswers(Array(quiz.questions.length).fill(""));
    setCurrentQ(0);
    setStudentIdConfirmed(true);
  }

  function handleAnswer(val: string) {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQ] = val;
      return updated;
    });
  }

  async function handleSubmit() {
    if (!quiz) return;
    try {
      const attempt = await submitAttempt.mutateAsync({
        studentId: BigInt(studentIdInput.trim()),
        quizId,
        answers,
      });
      const pct = Math.round(
        (Number(attempt.score) / Math.max(1, Number(attempt.totalQuestions))) *
          100,
      );
      setResult({
        score: Number(attempt.score),
        total: Number(attempt.totalQuestions),
        flag: computeFlag(pct),
      });
    } catch {
      setResult({
        score: 0,
        total: quiz.questions.length,
        flag: ProgressFlag.red,
      });
    }
  }

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="quiz.loading_state"
      >
        <div className="space-y-3 w-full max-w-md p-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="quiz.error_state"
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            {language === "odia"
              ? "କ୍ୱିଜ ମିଳିଲା ନାହିଁ"
              : language === "hindi"
                ? "क्विज़ नहीं मिली"
                : "Quiz not found"}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: "/" })}
          >
            <ArrowLeft className="w-4 h-4" /> {t.home}
          </Button>
        </div>
      </div>
    );
  }

  // Results screen
  if (result) {
    const pct = Math.round((result.score / Math.max(1, result.total)) * 100);
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center p-6"
        data-ocid="quiz.results_page"
      >
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center space-y-6 shadow-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              {pct}%
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {result.score}/{result.total}{" "}
              {language === "odia"
                ? "ସଠିକ"
                : language === "hindi"
                  ? "सही"
                  : "correct"}
            </p>
          </div>
          <div className="flex justify-center">
            <ProgressBadge flag={result.flag} size="md" />
          </div>
          <p className="text-sm text-muted-foreground">
            {result.flag === ProgressFlag.green
              ? language === "odia"
                ? "ଉତ୍ତମ! ଆପଣ ଭଲ କଲେ!"
                : language === "hindi"
                  ? "शाबाश! आपने अच्छा किया!"
                  : "Excellent work! Keep it up!"
              : result.flag === ProgressFlag.yellow
                ? language === "odia"
                  ? "ଭଲ ପ୍ରୟାସ! ଆହୁରି ଅଭ୍ୟାସ କର"
                  : language === "hindi"
                    ? "अच्छा प्रयास! और अभ्यास करें"
                    : "Good effort! Keep practicing."
                : language === "odia"
                  ? "ଅଧ୍ୟୟନ ଜାରି ରଖ ଏବଂ ଶିକ୍ଷକଙ୍କ ଭଲ ଦ୍ୱାରରେ ସହାୟ ନିଅ"
                  : language === "hindi"
                    ? "पढ़ाई जारी रखें और अध्यापक से मदद लें"
                    : "Keep studying and ask your teacher for help."}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate({
                to: "/student/$id",
                params: { id: studentIdInput.trim() },
              })
            }
            className="w-full"
            data-ocid="quiz.back_to_student_button"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "odia"
              ? "ଡ୍ୟାଶବୋର୍ଡ"
              : language === "hindi"
                ? "डैशबोर्ड"
                : "Back to Dashboard"}
          </Button>
        </div>
      </div>
    );
  }

  // Student ID entry
  if (!studentIdConfirmed) {
    return (
      <div
        className="min-h-screen bg-background flex flex-col items-center justify-center p-6"
        data-ocid="quiz.id_entry_page"
      >
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-md space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {quiz.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {quiz.subject} · {quiz.questions.length}{" "}
              {language === "odia"
                ? "ପ୍ରଶ୍ନ"
                : language === "hindi"
                  ? "प्रश्न"
                  : "questions"}
            </p>
          </div>
          <div className="space-y-3">
            <label
              htmlFor="student-id-input"
              className="block text-sm font-medium text-foreground"
            >
              {language === "odia"
                ? "ଆପଣଙ୍କ ଛାତ୍ର ID ଦିଅ"
                : language === "hindi"
                  ? "अपना Student ID दर्ज करें"
                  : "Enter your Student ID"}
            </label>
            <input
              type="text"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startQuiz()}
              placeholder="e.g. 1"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              data-ocid="quiz.student_id_input"
            />
          </div>
          <Button
            type="button"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            onClick={startQuiz}
            disabled={!studentIdInput.trim()}
            data-ocid="quiz.start_button"
          >
            <PlayCircle className="w-4 h-4" />
            {t.takeQuiz}
          </Button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const q: Question = quiz.questions[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progressPct = Math.round(
    ((currentQ + 1) / quiz.questions.length) * 100,
  );

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-6"
      data-ocid="quiz.question_page"
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 shadow-md space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">
              {quiz.title}
            </h2>
            <span className="text-sm text-muted-foreground">
              {currentQ + 1}/{quiz.questions.length}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-smooth"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{quiz.subject}</span>
        </div>

        <div className="space-y-4" data-ocid="quiz.question_container">
          <p className="text-base font-semibold text-foreground leading-relaxed">
            {q.text}
          </p>

          {q.questionType === QuestionType.multipleChoice ? (
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <label
                  key={`opt-${oi}-${opt}`}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-smooth ${
                    answers[currentQ] === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                  data-ocid={`quiz.option.${oi + 1}`}
                >
                  <input
                    type="radio"
                    name={`q${currentQ}`}
                    value={opt}
                    checked={answers[currentQ] === opt}
                    onChange={() => handleAnswer(opt)}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      answers[currentQ] === opt
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {answers[currentQ] === opt && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </span>
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[currentQ] ?? ""}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={
                language === "odia"
                  ? "ଆପଣଙ୍କ ଉତ୍ତର ଲେଖ..."
                  : language === "hindi"
                    ? "अपना उत्तर लिखें..."
                    : "Write your answer here..."
              }
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
              data-ocid="quiz.short_answer_input"
            />
          )}
        </div>

        <div className="flex gap-3">
          {currentQ > 0 && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentQ((c) => c - 1)}
              data-ocid="quiz.prev_button"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "odia"
                ? "ପୂର୍ବ"
                : language === "hindi"
                  ? "पिछला"
                  : "Previous"}
            </Button>
          )}
          {isLast ? (
            <Button
              type="button"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={handleSubmit}
              disabled={submitAttempt.isPending}
              data-ocid="quiz.submit_button"
            >
              {submitAttempt.isPending ? t.loading : t.submit}
            </Button>
          ) : (
            <Button
              type="button"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={() => setCurrentQ((c) => c + 1)}
              data-ocid="quiz.next_button"
            >
              {language === "odia"
                ? "ପରବର୍ତ୍ତୀ"
                : language === "hindi"
                  ? "अगला"
                  : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
