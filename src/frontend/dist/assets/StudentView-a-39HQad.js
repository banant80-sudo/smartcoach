import { u as useLanguage, b as useParams, a as useNavigate, j as jsxRuntimeExports } from "./index-CJdRh2sV.js";
import { a as GradeTag, B as BookOpen } from "./GradeTag-DQJ3GAOX.js";
import { e as useGetStudent, a as useStudentProgress, f as useStudentAttempts, g as useCoachingNotes, h as useLessonsByGrade, i as useListQuizzesByGrade, P as ProgressFlag, d as ProgressBadge, c as ProgressBar, L as Language } from "./useBackend-Bv6kT19D.js";
import { B as Button } from "./createLucideIcon-yiondUdy.js";
import { A as ArrowLeft, T as Trophy } from "./trophy-QjrkzCAZ.js";
import { C as CirclePlay } from "./circle-play-CqTEB054.js";
import { M as MessageSquare } from "./message-square-DOzZRZdi.js";
const LANG_BADGE_MAP = {
  [Language.english]: "EN",
  [Language.hindi]: "HI",
  [Language.odia]: "OD"
};
function langBadgeColor(lang) {
  if (lang === Language.odia)
    return "bg-[oklch(0.6_0.18_150/0.12)] text-[oklch(0.45_0.18_150)]";
  if (lang === Language.hindi)
    return "bg-[oklch(0.72_0.15_85/0.12)] text-[oklch(0.52_0.14_85)]";
  return "bg-primary/10 text-primary";
}
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString();
}
function StudentView() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/student/$id" });
  const navigate = useNavigate();
  const studentId = BigInt(id);
  const { data: student, isLoading: loadingStudent } = useGetStudent(studentId);
  const { data: progress } = useStudentProgress(studentId);
  const { data: attempts = [] } = useStudentAttempts(studentId);
  const { data: notes = [] } = useCoachingNotes(studentId);
  const { data: lessons = [] } = useLessonsByGrade(
    student ? student.grade : null
  );
  const { data: quizzes = [] } = useListQuizzesByGrade(
    student ? student.grade : null
  );
  const flag = (progress == null ? void 0 : progress.flag) ?? ProgressFlag.red;
  const scores = (progress == null ? void 0 : progress.latestScores.map(Number)) ?? [];
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  if (loadingStudent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center",
        "data-ocid": "student_view.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 w-full max-w-md p-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 rounded-xl bg-muted animate-pulse" }, i)) })
      }
    );
  }
  if (!student) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center",
        "data-ocid": "student_view.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: language === "odia" ? "ଛାତ୍ର ମିଳିଲା ନାହିଁ" : language === "hindi" ? "छात्र नहीं मिला" : "Student not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              variant: "outline",
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "student_view.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-6 py-4 shadow-sm flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              className: "text-muted-foreground hover:text-foreground transition-smooth",
              "data-ocid": "student_view.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-lg", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeTag, { grade: student.grade })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 p-6 space-y-6 max-w-3xl mx-auto w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-3", children: t.progress }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { score: avgScore }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag, size: "md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-display font-bold text-foreground", children: [
                avgScore,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "%" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_view.lessons_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-primary" }),
              t.lessonPlans
            ] }),
            lessons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 bg-card border border-border rounded-xl text-muted-foreground",
                "data-ocid": "student_view.lessons_empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "କୌଣସି ପାଠ ଉପଲବ୍ଧ ନାହିଁ" : language === "hindi" ? "कोई पाठ उपलब्ध नहीं" : "No lessons available yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: lessons.map((lesson, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
                "data-ocid": `student_view.lesson.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: lesson.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: lesson.subject })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-semibold px-2 py-0.5 rounded ${langBadgeColor(lesson.language)}`,
                      children: LANG_BADGE_MAP[lesson.language]
                    }
                  )
                ]
              },
              lesson.id.toString()
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_view.quizzes_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5 text-accent" }),
              t.quizzes
            ] }),
            quizzes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 bg-card border border-border rounded-xl text-muted-foreground",
                "data-ocid": "student_view.quizzes_empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "କୌଣସି କ୍ୱିଜ ଉପଲବ୍ଧ ନାହିଁ" : language === "hindi" ? "कोई क्विज़ उपलब्ध नहीं" : "No quizzes available" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: quizzes.map((quiz, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
                "data-ocid": `student_view.quiz.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: quiz.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      quiz.subject,
                      " · ",
                      quiz.questions.length,
                      " ",
                      language === "odia" ? "ପ୍ରଶ୍ନ" : language === "hindi" ? "प्रश्न" : "questions"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "bg-accent hover:bg-accent/90 text-accent-foreground text-xs font-semibold",
                      onClick: () => navigate({
                        to: "/quiz/$id",
                        params: { id: quiz.id.toString() }
                      }),
                      "data-ocid": `student_view.quiz_start.${i + 1}`,
                      children: t.takeQuiz
                    }
                  )
                ]
              },
              quiz.id.toString()
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_view.attempts_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-primary" }),
              t.recentAttempts
            ] }),
            attempts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 bg-card border border-border rounded-xl text-muted-foreground",
                "data-ocid": "student_view.attempts_empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ପ୍ରୟାସ ନାହିଁ" : language === "hindi" ? "अभी तक कोई प्रयास नहीं" : "No attempts yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: attempts.map((a, i) => {
              const pct = Math.round(
                Number(a.score) / Math.max(1, Number(a.totalQuestions)) * 100
              );
              const pctFlag = pct >= 70 ? ProgressFlag.green : pct >= 40 ? ProgressFlag.yellow : ProgressFlag.red;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-card border border-border rounded-xl p-4 flex items-center gap-3",
                  "data-ocid": `student_view.attempt.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                        "Quiz #",
                        a.quizId.toString()
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(a.timestamp) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag: pctFlag, size: "sm" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground", children: [
                      Number(a.score),
                      "/",
                      Number(a.totalQuestions)
                    ] })
                  ]
                },
                a.id.toString()
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_view.coaching_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
              t.coachingNotes
            ] }),
            notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 bg-card border border-border rounded-xl text-muted-foreground",
                "data-ocid": "student_view.coaching_empty",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫିଡ଼ବ୍ୟାକ ନାହିଁ" : language === "hindi" ? "अभी तक कोई फ़ीडबैक नहीं" : "No feedback from teacher yet" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-card border border-border rounded-xl p-4",
                "data-ocid": `student_view.note.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold border border-primary/20", children: note.subject }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(note.timestamp) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: note.content })
                ]
              },
              note.id.toString()
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border px-6 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary hover:underline",
              children: "caffeine.ai"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  StudentView as default
};
