import { u as useLanguage, r as reactExports, j as jsxRuntimeExports, a as useNavigate } from "./index-CJdRh2sV.js";
import { G as GRADE_ORDER, a as GradeTag, B as BookOpen } from "./GradeTag-DQJ3GAOX.js";
import { L as Layout } from "./Layout-D2op118V.js";
import { u as useListStudents, a as useStudentProgress, b as useAddCoachingNote, P as ProgressFlag, c as ProgressBar, d as ProgressBadge } from "./useBackend-Bv6kT19D.js";
import { c as createLucideIcon, B as Button } from "./createLucideIcon-yiondUdy.js";
import { U as Users } from "./users-qeZQDQnR.js";
import "./graduation-cap-HqU38MgN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function StudentCardWithProgress({
  student,
  index
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: progress } = useStudentProgress(student.id);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [subject, setSubject] = reactExports.useState("");
  const [noteText, setNoteText] = reactExports.useState("");
  const addNote = useAddCoachingNote();
  const flag = (progress == null ? void 0 : progress.flag) ?? ProgressFlag.red;
  const scores = (progress == null ? void 0 : progress.latestScores.map(Number)) ?? [];
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const isRed = flag === ProgressFlag.red;
  async function handleSaveNote() {
    if (!subject.trim() || !noteText.trim()) return;
    const req = {
      studentId: student.id,
      teacherId: BigInt(1),
      subject: subject.trim(),
      content: noteText.trim()
    };
    await addNote.mutateAsync(req);
    setSubject("");
    setNoteText("");
    setShowForm(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-smooth",
      "data-ocid": `student.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-tight truncate", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradeTag, { grade: student.grade }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "View Details",
              onClick: () => navigate({
                to: "/teacher/student/$id",
                params: { id: student.id.toString() }
              }),
              className: "text-muted-foreground hover:text-foreground transition-smooth p-1",
              "data-ocid": `student.details_link.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: t.progress }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { score: avgScore }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBadge, { flag, size: "sm" }) })
        ] }),
        !showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          isRed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs",
              onClick: () => setShowForm(true),
              "data-ocid": `student.coach_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
                t.startCoaching
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "flex-1 text-xs",
              onClick: () => navigate({
                to: "/teacher/student/$id",
                params: { id: student.id.toString() }
              }),
              "data-ocid": `student.view_button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                t.viewDetails
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "ghost",
              className: "text-xs px-2",
              onClick: () => navigate({
                to: "/teacher/student/$id",
                params: { id: student.id.toString() }
              }),
              "data-ocid": `student.view_icon.${index}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border border-border rounded-lg p-3 bg-secondary/30 space-y-2",
            "data-ocid": `student.coaching_form.${index}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: t.writeCoachingNote }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowForm(false),
                    className: "text-muted-foreground hover:text-foreground",
                    "data-ocid": `student.coaching_form_close.${index}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: subject,
                  onChange: (e) => setSubject(e.target.value),
                  placeholder: t.subject,
                  className: "w-full px-2 py-1 text-xs border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                  "data-ocid": `student.coaching_subject.${index}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: noteText,
                  onChange: (e) => setNoteText(e.target.value),
                  placeholder: t.writeCoachingNote,
                  rows: 3,
                  className: "w-full px-2 py-1 text-xs border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none",
                  "data-ocid": `student.coaching_textarea.${index}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    className: "flex-1 text-xs bg-primary hover:bg-primary/90",
                    onClick: handleSaveNote,
                    disabled: !subject.trim() || !noteText.trim() || addNote.isPending,
                    "data-ocid": `student.coaching_save.${index}`,
                    children: addNote.isPending ? "..." : t.saveNote
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    variant: "outline",
                    className: "text-xs",
                    onClick: () => setShowForm(false),
                    "data-ocid": `student.coaching_cancel.${index}`,
                    children: t.cancel
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function TeacherDashboard() {
  const { t } = useLanguage();
  const [gradeFilter, setGradeFilter] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const { data: students = [], isLoading } = useListStudents(
    gradeFilter ?? void 0
  );
  const filtered = reactExports.useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter((s) => s.name.toLowerCase().includes(q));
  }, [students, search]);
  const gradeCounts = reactExports.useMemo(() => {
    const counts = {};
    for (const s of students) {
      counts[s.grade] = (counts[s.grade] ?? 0) + 1;
    }
    return counts;
  }, [students]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", "data-ocid": "teacher.dashboard_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: t.dashboard }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          students.length,
          " ",
          t.students
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: students.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: t.students })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: t.search,
          className: "w-full pl-9 pr-4 py-2.5 border border-input rounded-xl bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm",
          "data-ocid": "teacher.search_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-1.5 flex-wrap border-b border-border pb-4",
        "data-ocid": "teacher.grade_filter",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setGradeFilter(null),
              className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${gradeFilter === null ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-muted"}`,
              "data-ocid": "teacher.grade_all",
              children: [
                t.allGrades,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs opacity-70", children: students.length })
              ]
            }
          ),
          GRADE_ORDER.map((g) => {
            const cnt = gradeCounts[g] ?? 0;
            const gradeKey = g;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setGradeFilter(g),
                className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${gradeFilter === g ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-muted"}`,
                "data-ocid": `teacher.grade_${g}`,
                children: [
                  t[gradeKey],
                  cnt > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs opacity-70", children: cnt })
                ]
              },
              g
            );
          })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        "data-ocid": "teacher.loading_state",
        children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-card rounded-xl border border-border h-48 animate-pulse"
          },
          k
        ))
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 text-muted-foreground",
        "data-ocid": "teacher.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-12 h-12 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: t.noStudents })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filtered.map((student, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StudentCardWithProgress,
      {
        student,
        index: idx + 1
      },
      student.id.toString()
    )) })
  ] }) });
}
export {
  TeacherDashboard as default
};
