import { GRADE_ORDER, GradeTag } from "@/components/GradeTag";
import { Layout } from "@/components/Layout";
import { ProgressBadge, ProgressBar } from "@/components/ProgressBadge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useAddCoachingNote,
  useListStudents,
  useStudentProgress,
} from "@/hooks/useBackend";
import type { CreateNoteRequest, Grade, Student } from "@/types";
import { ProgressFlag } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Eye, Search, Users, X } from "lucide-react";
import { useMemo, useState } from "react";

function StudentCardWithProgress({
  student,
  index,
}: {
  student: Student;
  index: number;
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: progress } = useStudentProgress(student.id);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [noteText, setNoteText] = useState("");
  const addNote = useAddCoachingNote();

  const flag = progress?.flag ?? ProgressFlag.red;
  const scores = progress?.latestScores.map(Number) ?? [];
  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
  const isRed = flag === ProgressFlag.red;

  async function handleSaveNote() {
    if (!subject.trim() || !noteText.trim()) return;
    const req: CreateNoteRequest = {
      studentId: student.id,
      teacherId: BigInt(1),
      subject: subject.trim(),
      content: noteText.trim(),
    };
    await addNote.mutateAsync(req);
    setSubject("");
    setNoteText("");
    setShowForm(false);
  }

  return (
    <div
      className="bg-card rounded-xl border border-border shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-smooth"
      data-ocid={`student.item.${index}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {student.name}
          </h3>
          <div className="mt-1">
            <GradeTag grade={student.grade} />
          </div>
        </div>
        <button
          type="button"
          aria-label="View Details"
          onClick={() =>
            navigate({
              to: "/teacher/student/$id",
              params: { id: student.id.toString() },
            })
          }
          className="text-muted-foreground hover:text-foreground transition-smooth p-1"
          data-ocid={`student.details_link.${index}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground font-medium">
          {t.progress}
        </p>
        <ProgressBar score={avgScore} />
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <ProgressBadge flag={flag} size="sm" />
        </div>
      </div>

      {!showForm ? (
        <div className="flex gap-2 pt-1">
          {isRed ? (
            <Button
              type="button"
              size="sm"
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs"
              onClick={() => setShowForm(true)}
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
            size="sm"
            variant="ghost"
            className="text-xs px-2"
            onClick={() =>
              navigate({
                to: "/teacher/student/$id",
                params: { id: student.id.toString() },
              })
            }
            data-ocid={`student.view_icon.${index}`}
          >
            <Eye className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div
          className="border border-border rounded-lg p-3 bg-secondary/30 space-y-2"
          data-ocid={`student.coaching_form.${index}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              {t.writeCoachingNote}
            </span>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
              data-ocid={`student.coaching_form_close.${index}`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t.subject}
            className="w-full px-2 py-1 text-xs border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid={`student.coaching_subject.${index}`}
          />
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={t.writeCoachingNote}
            rows={3}
            className="w-full px-2 py-1 text-xs border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            data-ocid={`student.coaching_textarea.${index}`}
          />
          <div className="flex gap-1.5">
            <Button
              type="button"
              size="sm"
              className="flex-1 text-xs bg-primary hover:bg-primary/90"
              onClick={handleSaveNote}
              disabled={
                !subject.trim() || !noteText.trim() || addNote.isPending
              }
              data-ocid={`student.coaching_save.${index}`}
            >
              {addNote.isPending ? "..." : t.saveNote}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => setShowForm(false)}
              data-ocid={`student.coaching_cancel.${index}`}
            >
              {t.cancel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeacherDashboard() {
  const { t } = useLanguage();
  const [gradeFilter, setGradeFilter] = useState<Grade | null>(null);
  const [search, setSearch] = useState("");

  const { data: students = [], isLoading } = useListStudents(
    gradeFilter ?? undefined,
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter((s) => s.name.toLowerCase().includes(q));
  }, [students, search]);

  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of students) {
      counts[s.grade] = (counts[s.grade] ?? 0) + 1;
    }
    return counts;
  }, [students]);

  return (
    <Layout>
      <div className="p-6 space-y-6" data-ocid="teacher.dashboard_page">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t.dashboard}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {students.length} {t.students}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {students.length}
            </span>
            <span className="text-sm text-muted-foreground">{t.students}</span>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.search}
            className="w-full pl-9 pr-4 py-2.5 border border-input rounded-xl bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
            data-ocid="teacher.search_input"
          />
        </div>

        <div
          className="flex gap-1.5 flex-wrap border-b border-border pb-4"
          data-ocid="teacher.grade_filter"
        >
          <button
            type="button"
            onClick={() => setGradeFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
              gradeFilter === null
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
            data-ocid="teacher.grade_all"
          >
            {t.allGrades}
            <span className="ml-1.5 text-xs opacity-70">{students.length}</span>
          </button>
          {GRADE_ORDER.map((g) => {
            const cnt = gradeCounts[g] ?? 0;
            const gradeKey = g as keyof typeof t;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGradeFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth ${
                  gradeFilter === g
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
                data-ocid={`teacher.grade_${g}`}
              >
                {t[gradeKey] as string}
                {cnt > 0 && (
                  <span className="ml-1.5 text-xs opacity-70">{cnt}</span>
                )}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="teacher.loading_state"
          >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
              <div
                key={k}
                className="bg-card rounded-xl border border-border h-48 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="teacher.empty_state"
          >
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">{t.noStudents}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((student, idx) => (
              <StudentCardWithProgress
                key={student.id.toString()}
                student={student}
                index={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
