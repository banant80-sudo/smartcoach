import { u as useLanguage, a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-CJdRh2sV.js";
import { B as Button } from "./createLucideIcon-yiondUdy.js";
import { G as GraduationCap, a as Globe } from "./graduation-cap-HqU38MgN.js";
import { U as Users } from "./users-qeZQDQnR.js";
const LANG_OPTIONS = [
  { value: "odia", label: "Odia" },
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" }
];
function Home() {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [studentInput, setStudentInput] = reactExports.useState("");
  function handleStudentGo() {
    const trimmed = studentInput.trim();
    if (!trimmed) return;
    navigate({ to: "/student/$id", params: { id: trimmed } });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "home.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-xl leading-tight", children: t.appName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.tagline })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", "data-ocid": "home.lang_switcher", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-secondary rounded-full p-1", children: LANG_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setLanguage(opt.value),
                "data-ocid": `home.lang_${opt.value}`,
                className: `text-xs px-3 py-1 rounded-full font-semibold transition-smooth ${language === opt.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                children: opt.label
              },
              opt.value
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border-b border-border px-6 py-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4" }),
            language === "odia" ? "LKG – ଶ୍ରେଣୀ ୧୦" : language === "hindi" ? "LKG – कक्षा १०" : "LKG – Standard 10"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground mb-3", children: t.appName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: language === "odia" ? "ଶିକ୍ଷକ ଏବଂ ଛାତ୍ରଙ୍କ ମଧ୍ୟରେ ସ୍ମାର୍ଟ ସଂଯୋଗ" : language === "hindi" ? "शिक्षक और छात्र के बीच स्मार्ट संपर्क" : "Smart connection between teacher and student for guided growth" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex items-start justify-center px-6 py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-smooth",
              "data-ocid": "home.teacher_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-7 h-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: t.teacherPortal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: language === "odia" ? "ଛାତ୍ରଙ୍କ ଅଗ୍ରଗତି ଦେଖ ଏବଂ କୋଚିଂ ଯୋଗ ଦିଅ" : language === "hindi" ? "छात्रों की प्रगति देखें और कोचिंग नोट जोड़ें" : "Monitor student progress and add coaching notes" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
                    onClick: () => navigate({ to: "/teacher" }),
                    "data-ocid": "home.teacher_dashboard_button",
                    children: [
                      t.dashboard,
                      " →"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-smooth",
              "data-ocid": "home.student_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-7 h-7 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: t.studentPortal }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: language === "odia" ? "ଆପଣଙ୍କ ପ୍ରଗତି ଦେଖ ଏବଂ କ୍ୱିଜ ଦିଅ" : language === "hindi" ? "अपनी प्रगति देखें और क्विज़ दें" : "View your progress, lessons and take quizzes" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: studentInput,
                      onChange: (e) => setStudentInput(e.target.value),
                      onKeyDown: (e) => e.key === "Enter" && handleStudentGo(),
                      placeholder: language === "odia" ? "ଛାତ୍ର ID ଦିଅ" : language === "hindi" ? "छात्र ID दर्ज करें" : "Enter Student ID",
                      className: "flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "home.student_id_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      onClick: handleStudentGo,
                      disabled: !studentInput.trim(),
                      className: "bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4",
                      "data-ocid": "home.student_go_button",
                      children: "→"
                    }
                  )
                ] })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-muted/40 border-t border-border px-6 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
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
  Home as default
};
