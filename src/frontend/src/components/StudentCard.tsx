import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Student, StudentProgress } from "@/types";
import { ProgressFlag } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Eye } from "lucide-react";
import { GradeTag } from "./GradeTag";
import { ProgressBadge, ProgressBar } from "./ProgressBadge";

interface StudentCardProps {
  student: Student;
  progress?: StudentProgress | null;
  onCoach?: () => void;
  index?: number;
}

function getProgressScore(progress?: StudentProgress | null): number {
  if (!progress || progress.latestScores.length === 0) return 0;
  const scores = progress.latestScores.map(Number);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function getFlag(progress?: StudentProgress | null): ProgressFlag {
  if (!progress) return ProgressFlag.red;
  return progress.flag;
}

export function StudentCard({
  student,
  progress,
  onCoach,
  index = 1,
}: StudentCardProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const flag = getFlag(progress);
  const score = getProgressScore(progress);
  const isPrimary = flag === ProgressFlag.red;

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-smooth"
      data-ocid={`student.item.${index}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground truncate text-sm leading-tight">
            {student.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <GradeTag grade={student.grade} />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground font-medium">
          {t.progress}
        </p>
        <ProgressBar score={score} />
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <ProgressBadge flag={flag} size="sm" />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        {isPrimary ? (
          <Button
            type="button"
            size="sm"
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs"
            onClick={onCoach}
            data-ocid={`student.coach_button.${index}`}
          >
            <BookOpen className="w-3 h-3" />
            {t.startCoaching}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() =>
              navigate({
                to: "/teacher/student/$id",
                params: { id: student.id.toString() },
              })
            }
            data-ocid={`student.view_button.${index}`}
          >
            <Eye className="w-3 h-3" />
            {t.viewDetails}
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-xs px-2"
          onClick={() =>
            navigate({
              to: "/teacher/student/$id",
              params: { id: student.id.toString() },
            })
          }
          data-ocid={`student.details_link.${index}`}
        >
          <Eye className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
