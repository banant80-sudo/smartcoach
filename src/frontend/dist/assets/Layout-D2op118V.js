import { u as useLanguage, j as jsxRuntimeExports, c as useRouter, L as Link } from "./index-CJdRh2sV.js";
import { G as GraduationCap, a as Globe } from "./graduation-cap-HqU38MgN.js";
import { c as createLucideIcon } from "./createLucideIcon-yiondUdy.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode);
const LANG_OPTIONS = [
  { value: "odia", short: "ଓ" },
  { value: "hindi", short: "ह" },
  { value: "english", short: "E" }
];
function NavItem({ to, icon, label, ocid }) {
  const router = useRouter();
  const isActive = router.state.location.pathname === to || router.state.location.pathname.startsWith(`${to}/`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      "data-ocid": ocid,
      className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 flex-shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label })
      ]
    }
  );
}
function Layout({ children }) {
  const { t, language, setLanguage } = useLanguage();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "smartcoach";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-background overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-56 flex-shrink-0 bg-card border-r border-border flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center gap-2.5 px-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-4 h-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight truncate", children: t.appName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.tagline })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-3 space-y-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavItem,
        {
          to: "/teacher",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" }),
          label: t.dashboard,
          ocid: "nav.dashboard"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: t.language })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "lang.toggle", children: LANG_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setLanguage(opt.value),
            "data-ocid": `lang.${opt.value}`,
            className: `flex-1 py-1 rounded text-xs font-semibold transition-smooth ${language === opt.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`,
            children: opt.short
          },
          opt.value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mt-1 text-center", children: LANG_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex-1 text-[10px] text-muted-foreground capitalize",
            children: opt.value.slice(0, 3)
          },
          opt.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 flex items-center justify-between px-6 bg-card border-b border-border shadow-sm flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-foreground text-lg", children: t.appName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm hidden sm:block", children: [
            "— ",
            t.teacherPortal
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-0.5 bg-secondary rounded-full px-1 py-0.5",
            "data-ocid": "header.lang_switcher",
            children: LANG_OPTIONS.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setLanguage(opt.value),
                  className: `text-xs px-2 py-0.5 rounded-full font-medium transition-smooth ${language === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
                  children: opt.value.charAt(0).toUpperCase() + opt.value.slice(1)
                }
              ),
              i < LANG_OPTIONS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border text-xs mx-0.5", children: "|" })
            ] }, opt.value))
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-background", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border px-6 py-3 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
        "© ",
        year,
        ". Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: caffeineUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary hover:underline",
            children: "caffeine.ai"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  Layout as L
};
