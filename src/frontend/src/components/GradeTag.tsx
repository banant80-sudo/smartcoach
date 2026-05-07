import { useLanguage } from "@/contexts/LanguageContext";
import { Grade } from "@/types";

interface GradeTagProps {
  grade: Grade;
  className?: string;
}

export function GradeTag({ grade, className = "" }: GradeTagProps) {
  const { t } = useLanguage();

  const gradeKey = grade as keyof typeof t;
  const label = t[gradeKey] as string;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20 ${className}`}
    >
      {label}
    </span>
  );
}

export const GRADE_ORDER: Grade[] = [
  Grade.lkg,
  Grade.ukg,
  Grade.std1,
  Grade.std2,
  Grade.std3,
  Grade.std4,
  Grade.std5,
  Grade.std6,
  Grade.std7,
  Grade.std8,
  Grade.std9,
  Grade.std10,
];

export function gradeLabel(grade: Grade, t: Record<string, string>): string {
  return (t[grade as keyof typeof t] as string) ?? grade;
}
