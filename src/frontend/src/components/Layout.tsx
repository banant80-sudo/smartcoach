import { useLanguage } from "@/contexts/LanguageContext";
import type { AppLanguage } from "@/types";
import { Link, useRouter } from "@tanstack/react-router";
import { Globe, GraduationCap, LayoutDashboard } from "lucide-react";
import type { ReactNode } from "react";

const LANG_OPTIONS: { value: AppLanguage; short: string }[] = [
  { value: "odia", short: "ଓ" },
  { value: "hindi", short: "ह" },
  { value: "english", short: "E" },
];

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  ocid: string;
}

function NavItem({ to, icon, label, ocid }: NavItemProps) {
  const router = useRouter();
  const isActive =
    router.state.location.pathname === to ||
    router.state.location.pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      data-ocid={ocid}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <span className="w-4 h-4 flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { t, language, setLanguage } = useLanguage();

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "smartcoach";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-card border-r border-border flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-foreground text-sm leading-tight truncate">
              {t.appName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItem
            to="/teacher"
            icon={<LayoutDashboard className="w-4 h-4" />}
            label={t.dashboard}
            ocid="nav.dashboard"
          />
        </nav>

        {/* Language Switcher */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-1.5 mb-2">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">
              {t.language}
            </span>
          </div>
          <div className="flex gap-1" data-ocid="lang.toggle">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLanguage(opt.value)}
                data-ocid={`lang.${opt.value}`}
                className={`flex-1 py-1 rounded text-xs font-semibold transition-smooth ${
                  language === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {opt.short}
              </button>
            ))}
          </div>
          <div className="flex gap-1 mt-1 text-center">
            {LANG_OPTIONS.map((opt) => (
              <span
                key={opt.value}
                className="flex-1 text-[10px] text-muted-foreground capitalize"
              >
                {opt.value.slice(0, 3)}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="h-16 flex items-center justify-between px-6 bg-card border-b border-border shadow-sm flex-shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-foreground text-lg">
              {t.appName}
            </h1>
            <span className="text-muted-foreground text-sm hidden sm:block">
              — {t.teacherPortal}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex gap-0.5 bg-secondary rounded-full px-1 py-0.5"
              data-ocid="header.lang_switcher"
            >
              {LANG_OPTIONS.map((opt, i) => (
                <span key={opt.value}>
                  <button
                    type="button"
                    onClick={() => setLanguage(opt.value)}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition-smooth ${
                      language === opt.value
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.value.charAt(0).toUpperCase() + opt.value.slice(1)}
                  </button>
                  {i < LANG_OPTIONS.length - 1 && (
                    <span className="text-border text-xs mx-0.5">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-3 flex-shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
