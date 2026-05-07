import { useLanguage } from "@/contexts/LanguageContext";
import { ProgressFlag } from "@/types";
import { Flag } from "lucide-react";

interface ProgressBadgeProps {
  flag: ProgressFlag;
  size?: "sm" | "md";
}

const flagConfig: Record<
  ProgressFlag,
  {
    label: keyof import("@/i18n").I18nStrings;
    bgClass: string;
    textClass: string;
  }
> = {
  [ProgressFlag.red]: {
    label: "needsAttention",
    bgClass: "bg-destructive/10",
    textClass: "text-destructive",
  },
  [ProgressFlag.yellow]: {
    label: "improving",
    bgClass: "bg-chart-2/10",
    textClass: "text-chart-2",
  },
  [ProgressFlag.green]: {
    label: "onTrack",
    bgClass: "bg-chart-3/10",
    textClass: "text-chart-3",
  },
};

export function ProgressBadge({ flag, size = "md" }: ProgressBadgeProps) {
  const { t } = useLanguage();
  const config = flagConfig[flag];
  const sizeClass =
    size === "sm" ? "text-xs px-1.5 py-0.5 gap-1" : "text-xs px-2 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-md ${sizeClass} ${config.bgClass} ${config.textClass}`}
    >
      <Flag
        className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"}
        fill="currentColor"
      />
      {t[config.label] as string}
    </span>
  );
}

export function ProgressBar({ score }: { score: number }) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const colorClass =
    clampedScore < 40
      ? "bg-destructive"
      : clampedScore < 70
        ? "bg-chart-2"
        : "bg-chart-3";

  return (
    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className={`h-full rounded-full transition-smooth ${colorClass}`}
        style={{ width: `${clampedScore}%` }}
      />
    </div>
  );
}
