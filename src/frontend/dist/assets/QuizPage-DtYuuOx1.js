import { u as useLanguage, b as useParams, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CJdRh2sV.js";
import { j as useGetQuiz, k as useSubmitQuizAttempt, d as ProgressBadge, P as ProgressFlag, Q as QuestionType } from "./useBackend-Bv6kT19D.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-yiondUdy.js";
import { A as ArrowLeft, T as Trophy } from "./trophy-QjrkzCAZ.js";
import { C as CirclePlay } from "./circle-play-CqTEB054.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
function computeFlag(pct) {
  if (pct >= 70) return ProgressFlag.green;
  if (pct >= 40) return ProgressFlag.yellow;
  return ProgressFlag.red;
}
function QuizPage() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/quiz/$id" });
  const navigate = useNavigate();
  const quizId = BigInt(id);
  const { data: quiz, isLoading } = useGetQuiz(quizId);
  const submitAttempt = useSubmitQuizAttempt();
  const [studentIdInput, setStudentIdInput] = reactExports.useState("");
  const [studentIdConfirmed, setStudentIdConfirmed] = reactExports.useState(false);
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState(null);
  function startQuiz() {
    if (!studentIdInput.trim() || !quiz) return;
    setAnswers(Array(quiz.questions.length).fill(""));
    setCurrentQ(0);
    setStudentIdConfirmed(true);
  }
  function handleAnswer(val) {
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
        answers
      });
      const pct = Math.round(
        Number(attempt.score) / Math.max(1, Number(attempt.totalQuestions)) * 100
      );
      setResult({
        score: Number(attempt.score),
        total: Number(attempt.totalQuestions),
        flag: computeFlag(pct)
      });
    } catch {
      setResult({
        score: 0,
        total: quiz.questions.length,
        flag: ProgressFlag.red
      });
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center",
        "data-ocid": "quiz.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 w-full max-w-md p-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 rounded-xl bg-muted animate-pulse" }, i)) })
      }
    );
  }
  if (!quiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center",
        "data-ocid": "quiz.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: language === "odia" ? "କ୍ୱିଜ ମିଳିଲା ନାହିଁ" : language === "hindi" ? "क्विज़ नहीं मिली" : "Quiz not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({ to: "/" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " ",
                t.home
              ]
            }
          )
        ] })
      }
    );
  }
  if (result) {
    const pct = Math.round(result.score / Math.max(1, result.total) * 100);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center p-6",
        "data-ocid": "quiz.results_page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center space-y-6 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold text-foreground", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
              result.score,
              "/",
              result.total,
              " ",
              language === "odia" ? "ସଠିକ" : language === "hindi" ? "सही" : "correct"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag: result.flag, size: "md" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: result.flag === ProgressFlag.green ? language === "odia" ? "ଉତ୍ତମ! ଆପଣ ଭଲ କଲେ!" : language === "hindi" ? "शाबाश! आपने अच्छा किया!" : "Excellent work! Keep it up!" : result.flag === ProgressFlag.yellow ? language === "odia" ? "ଭଲ ପ୍ରୟାସ! ଆହୁରି ଅଭ୍ୟାସ କର" : language === "hindi" ? "अच्छा प्रयास! और अभ्यास करें" : "Good effort! Keep practicing." : language === "odia" ? "ଅଧ୍ୟୟନ ଜାରି ରଖ ଏବଂ ଶିକ୍ଷକଙ୍କ ଭଲ ଦ୍ୱାରରେ ସହାୟ ନିଅ" : language === "hindi" ? "पढ़ाई जारी रखें और अध्यापक से मदद लें" : "Keep studying and ask your teacher for help." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => navigate({
                to: "/student/$id",
                params: { id: studentIdInput.trim() }
              }),
              className: "w-full",
              "data-ocid": "quiz.back_to_student_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                language === "odia" ? "ଡ୍ୟାଶବୋର୍ଡ" : language === "hindi" ? "डैशबोर्ड" : "Back to Dashboard"
              ]
            }
          )
        ] })
      }
    );
  }
  if (!studentIdConfirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center p-6",
        "data-ocid": "quiz.id_entry_page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-md space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: quiz.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              quiz.subject,
              " · ",
              quiz.questions.length,
              " ",
              language === "odia" ? "ପ୍ରଶ୍ନ" : language === "hindi" ? "प्रश्न" : "questions"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "student-id-input",
                className: "block text-sm font-medium text-foreground",
                children: language === "odia" ? "ଆପଣଙ୍କ ଛାତ୍ର ID ଦିଅ" : language === "hindi" ? "अपना Student ID दर्ज करें" : "Enter your Student ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: studentIdInput,
                onChange: (e) => setStudentIdInput(e.target.value),
                onKeyDown: (e) => e.key === "Enter" && startQuiz(),
                placeholder: "e.g. 1",
                className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm",
                "data-ocid": "quiz.student_id_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
              onClick: startQuiz,
              disabled: !studentIdInput.trim(),
              "data-ocid": "quiz.start_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4" }),
                t.takeQuiz
              ]
            }
          )
        ] })
      }
    );
  }
  const q = quiz.questions[currentQ];
  const isLast = currentQ === quiz.questions.length - 1;
  const progressPct = Math.round(
    (currentQ + 1) / quiz.questions.length * 100
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center p-6",
      "data-ocid": "quiz.question_page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-card border border-border rounded-2xl p-8 shadow-md space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: quiz.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              currentQ + 1,
              "/",
              quiz.questions.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-primary transition-smooth",
              style: { width: `${progressPct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: quiz.subject })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "quiz.question_container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground leading-relaxed", children: q.text }),
          q.questionType === QuestionType.multipleChoice ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: q.options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              className: `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-smooth ${answers[currentQ] === opt ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-secondary"}`,
              "data-ocid": `quiz.option.${oi + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "radio",
                    name: `q${currentQ}`,
                    value: opt,
                    checked: answers[currentQ] === opt,
                    onChange: () => handleAnswer(opt),
                    className: "sr-only"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${answers[currentQ] === opt ? "border-primary bg-primary" : "border-muted-foreground"}`,
                    children: answers[currentQ] === opt && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 text-primary-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: opt })
              ]
            },
            `opt-${oi}-${opt}`
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: answers[currentQ] ?? "",
              onChange: (e) => handleAnswer(e.target.value),
              placeholder: language === "odia" ? "ଆପଣଙ୍କ ଉତ୍ତର ଲେଖ..." : language === "hindi" ? "अपना उत्तर लिखें..." : "Write your answer here...",
              rows: 4,
              className: "w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm",
              "data-ocid": "quiz.short_answer_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          currentQ > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1",
              onClick: () => setCurrentQ((c) => c - 1),
              "data-ocid": "quiz.prev_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                language === "odia" ? "ପୂର୍ବ" : language === "hindi" ? "पिछला" : "Previous"
              ]
            }
          ),
          isLast ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
              onClick: handleSubmit,
              disabled: submitAttempt.isPending,
              "data-ocid": "quiz.submit_button",
              children: submitAttempt.isPending ? t.loading : t.submit
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
              onClick: () => setCurrentQ((c) => c + 1),
              "data-ocid": "quiz.next_button",
              children: [
                language === "odia" ? "ପରବର୍ତ୍ତୀ" : language === "hindi" ? "अगला" : "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  QuizPage as default
};
