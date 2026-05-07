import { u as useLanguage, b as useParams, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CJdRh2sV.js";
import { a as GradeTag, B as BookOpen } from "./GradeTag-DQJ3GAOX.js";
import { L as Layout } from "./Layout-D2op118V.js";
import { e as useGetStudent, a as useStudentProgress, f as useStudentAttempts, g as useCoachingNotes, b as useAddCoachingNote, P as ProgressFlag, d as ProgressBadge } from "./useBackend-Bv6kT19D.js";
import { B as Button } from "./createLucideIcon-yiondUdy.js";
import { A as ArrowLeft, T as Trophy } from "./trophy-QjrkzCAZ.js";
import { M as MessageSquare } from "./message-square-DOzZRZdi.js";
import "./graduation-cap-HqU38MgN.js";
const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Odia",
  "Social Studies",
  "General Knowledge"
];
function flagDescription(flag, lang) {
  if (lang === "odia") {
    if (flag === ProgressFlag.red) return "ତୁରନ୍ତ ଧ୍ୟାନ ଦରକାର";
    if (flag === ProgressFlag.yellow) return "ସ୍ଥିରତା ଦରକାର";
    return "ଉତ୍ତମ ପ୍ରଦର୍ଶନ";
  }
  if (lang === "hindi") {
    if (flag === ProgressFlag.red) return "तत्काल ध्यान की आवश्यकता";
    if (flag === ProgressFlag.yellow) return "थोड़ा सुधार चाहिए";
    return "बेहतरीन प्रदर्शन";
  }
  if (flag === ProgressFlag.red) return "Needs urgent support and coaching.";
  if (flag === ProgressFlag.yellow)
    return "Making progress, needs consistency.";
  return "Excellent performance, keep it up!";
}
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString();
}
function StudentDetail() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/teacher/student/$id" });
  const navigate = useNavigate();
  const studentId = BigInt(id);
  const { data: student, isLoading: loadingStudent } = useGetStudent(studentId);
  const { data: progress } = useStudentProgress(studentId);
  const { data: attempts = [], isLoading: loadingAttempts } = useStudentAttempts(studentId);
  const { data: notes = [], isLoading: loadingNotes } = useCoachingNotes(studentId);
  const addNote = useAddCoachingNote();
  const [noteSubject, setNoteSubject] = reactExports.useState(SUBJECT_OPTIONS[0]);
  const [noteContent, setNoteContent] = reactExports.useState("");
  async function handleSubmitNote() {
    if (!noteContent.trim()) return;
    const req = {
      studentId,
      teacherId: BigInt(1),
      subject: noteSubject,
      content: noteContent.trim()
    };
    await addNote.mutateAsync(req);
    setNoteContent("");
  }
  if (loadingStudent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-4", "data-ocid": "student_detail.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 rounded-xl bg-muted animate-pulse" }, i)) }) });
  }
  if (!student) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 text-center text-muted-foreground py-24",
        "data-ocid": "student_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: language === "odia" ? "ଛାତ୍ର ମିଳିଲା ନାହିଁ" : language === "hindi" ? "छात्र नहीं मिला" : "Student not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "mt-4",
              onClick: () => navigate({ to: "/teacher" }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                " ",
                t.dashboard
              ]
            }
          )
        ]
      }
    ) });
  }
  const flag = (progress == null ? void 0 : progress.flag) ?? ProgressFlag.red;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 space-y-6 max-w-4xl mx-auto",
      "data-ocid": "student_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/teacher" }),
              className: "text-muted-foreground hover:text-foreground transition-smooth",
              "data-ocid": "student_detail.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground truncate", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GradeTag, { grade: student.grade }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: student.languagePreference })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-2xl p-5 flex items-center gap-4",
            "data-ocid": "student_detail.progress_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: t.progress }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag, size: "md" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: flagDescription(flag, language) })
              ] }),
              progress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-display font-bold text-foreground", children: [
                  progress.latestScores.length > 0 ? Math.round(
                    progress.latestScores.map(Number).reduce((a, b) => a + b, 0) / progress.latestScores.length
                  ) : 0,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: language === "odia" ? "ହାରାହারି" : language === "hindi" ? "औसत स्कोर" : "avg score" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_detail.attempts_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 text-primary" }),
            t.recentAttempts
          ] }),
          loadingAttempts ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-2",
              "data-ocid": "student_detail.attempts_loading",
              children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-12 rounded-lg bg-muted animate-pulse"
                },
                i
              ))
            }
          ) : attempts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8 text-muted-foreground bg-card border border-border rounded-xl",
              "data-ocid": "student_detail.attempts_empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "କୌଣସି ପ୍ରୟାସ ନାହିଁ" : language === "hindi" ? "कोई प्रयास नहीं" : "No attempts yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground", children: t.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground", children: t.score }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground", children: t.date })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: attempts.map((a, i) => {
              const pct = Math.round(
                Number(a.score) / Math.max(1, Number(a.totalQuestions)) * 100
              );
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-muted/30 transition-smooth",
                  "data-ocid": `student_detail.attempt.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
                      "Quiz #",
                      a.quizId.toString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: pct >= 70 ? "text-chart-3" : pct >= 40 ? "text-chart-2" : "text-destructive",
                        children: [
                          Number(a.score),
                          "/",
                          Number(a.totalQuestions)
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground text-xs", children: formatDate(a.timestamp) })
                  ]
                },
                a.id.toString()
              );
            }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "student_detail.notes_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
            t.coachingNotes
          ] }),
          loadingNotes ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "student_detail.notes_loading", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-16 rounded-lg bg-muted animate-pulse"
            },
            i
          )) }) : notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8 text-muted-foreground bg-card border border-border rounded-xl",
              "data-ocid": "student_detail.notes_empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: language === "odia" ? "କୌଣସି ନୋଟ ନାହିଁ" : language === "hindi" ? "कोई नोट नहीं" : "No coaching notes yet" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-4",
              "data-ocid": `student_detail.note.${i + 1}`,
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
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "section",
          {
            className: "bg-card border border-border rounded-2xl p-5",
            "data-ocid": "student_detail.add_note_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-bold text-foreground flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-accent" }),
                t.writeCoachingNote
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "note-subject",
                      className: "block text-xs font-medium text-muted-foreground mb-1",
                      children: t.subject
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "note-subject",
                      value: noteSubject,
                      onChange: (e) => setNoteSubject(e.target.value),
                      className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "student_detail.note_subject_select",
                      children: SUBJECT_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "note-content",
                      className: "block text-xs font-medium text-muted-foreground mb-1",
                      children: language === "odia" ? "ନୋଟ" : language === "hindi" ? "नोट" : "Note"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "note-content",
                      value: noteContent,
                      onChange: (e) => setNoteContent(e.target.value),
                      placeholder: t.writeCoachingNote,
                      rows: 4,
                      className: "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                      "data-ocid": "student_detail.note_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
                    onClick: handleSubmitNote,
                    disabled: !noteContent.trim() || addNote.isPending,
                    "data-ocid": "student_detail.note_submit_button",
                    children: addNote.isPending ? t.loading : t.saveNote
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
export {
  StudentDetail as default
};
