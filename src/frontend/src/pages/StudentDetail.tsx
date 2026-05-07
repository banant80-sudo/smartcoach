import { GradeTag } from "@/components/GradeTag";
import { Layout } from "@/components/Layout";
import { ProgressBadge } from "@/components/ProgressBadge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useAddCoachingNote,
  useCoachingNotes,
  useGetStudent,
  useStudentAttempts,
  useStudentProgress,
} from "@/hooks/useBackend";
import type { CreateNoteRequest } from "@/types";
import { ProgressFlag } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, MessageSquare, Trophy } from "lucide-react";
import { useState } from "react";

const SUBJECT_OPTIONS = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Odia",
  "Social Studies",
  "General Knowledge",
];

function flagDescription(flag: ProgressFlag, lang: string): string {
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

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString();
}

export default function StudentDetail() {
  const { t, language } = useLanguage();
  const { id } = useParams({ from: "/teacher/student/$id" });
  const navigate = useNavigate();
  const studentId = BigInt(id);

  const { data: student, isLoading: loadingStudent } = useGetStudent(studentId);
  const { data: progress } = useStudentProgress(studentId);
  const { data: attempts = [], isLoading: loadingAttempts } =
    useStudentAttempts(studentId);
  const { data: notes = [], isLoading: loadingNotes } =
    useCoachingNotes(studentId);
  const addNote = useAddCoachingNote();

  const [noteSubject, setNoteSubject] = useState(SUBJECT_OPTIONS[0]);
  const [noteContent, setNoteContent] = useState("");

  async function handleSubmitNote() {
    if (!noteContent.trim()) return;
    const req: CreateNoteRequest = {
      studentId,
      teacherId: BigInt(1),
      subject: noteSubject,
      content: noteContent.trim(),
    };
    await addNote.mutateAsync(req);
    setNoteContent("");
  }

  if (loadingStudent) {
    return (
      <Layout>
        <div className="p-6 space-y-4" data-ocid="student_detail.loading_state">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout>
        <div
          className="p-6 text-center text-muted-foreground py-24"
          data-ocid="student_detail.error_state"
        >
          <p className="text-lg font-medium">
            {language === "odia"
              ? "ଛାତ୍ର ମିଳିଲା ନାହିଁ"
              : language === "hindi"
                ? "छात्र नहीं मिला"
                : "Student not found"}
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => navigate({ to: "/teacher" })}
          >
            <ArrowLeft className="w-4 h-4" /> {t.dashboard}
          </Button>
        </div>
      </Layout>
    );
  }

  const flag = progress?.flag ?? ProgressFlag.red;

  return (
    <Layout>
      <div
        className="p-6 space-y-6 max-w-4xl mx-auto"
        data-ocid="student_detail.page"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/teacher" })}
            className="text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="student_detail.back_button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-bold text-foreground truncate">
              {student.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <GradeTag grade={student.grade} />
              <span className="text-xs text-muted-foreground capitalize">
                {student.languagePreference}
              </span>
            </div>
          </div>
        </div>

        {/* Progress banner */}
        <div
          className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4"
          data-ocid="student_detail.progress_banner"
        >
          <div className="flex-1">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              {t.progress}
            </p>
            <ProgressBadge flag={flag} size="md" />
            <p className="text-sm text-muted-foreground mt-2">
              {flagDescription(flag, language)}
            </p>
          </div>
          {progress && (
            <div className="text-right">
              <p className="text-3xl font-display font-bold text-foreground">
                {progress.latestScores.length > 0
                  ? Math.round(
                      progress.latestScores
                        .map(Number)
                        .reduce((a, b) => a + b, 0) /
                        progress.latestScores.length,
                    )
                  : 0}
                <span className="text-sm text-muted-foreground">%</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {language === "odia"
                  ? "ହାରାହারି"
                  : language === "hindi"
                    ? "औसत स्कोर"
                    : "avg score"}
              </p>
            </div>
          )}
        </div>

        {/* Quiz Attempts */}
        <section data-ocid="student_detail.attempts_section">
          <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-primary" />
            {t.recentAttempts}
          </h3>
          {loadingAttempts ? (
            <div
              className="space-y-2"
              data-ocid="student_detail.attempts_loading"
            >
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-12 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : attempts.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground bg-card border border-border rounded-xl"
              data-ocid="student_detail.attempts_empty"
            >
              <Trophy className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "କୌଣସି ପ୍ରୟାସ ନାହିଁ"
                  : language === "hindi"
                    ? "कोई प्रयास नहीं"
                    : "No attempts yet"}
              </p>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">
                      {t.subject}
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">
                      {t.score}
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">
                      {t.date}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attempts.map((a, i) => {
                    const pct = Math.round(
                      (Number(a.score) /
                        Math.max(1, Number(a.totalQuestions))) *
                        100,
                    );
                    return (
                      <tr
                        key={a.id.toString()}
                        className="hover:bg-muted/30 transition-smooth"
                        data-ocid={`student_detail.attempt.${i + 1}`}
                      >
                        <td className="px-4 py-3 text-foreground">
                          Quiz #{a.quizId.toString()}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">
                          <span
                            className={
                              pct >= 70
                                ? "text-chart-3"
                                : pct >= 40
                                  ? "text-chart-2"
                                  : "text-destructive"
                            }
                          >
                            {Number(a.score)}/{Number(a.totalQuestions)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                          {formatDate(a.timestamp)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Coaching Notes */}
        <section data-ocid="student_detail.notes_section">
          <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            {t.coachingNotes}
          </h3>
          {loadingNotes ? (
            <div className="space-y-2" data-ocid="student_detail.notes_loading">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground bg-card border border-border rounded-xl"
              data-ocid="student_detail.notes_empty"
            >
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">
                {language === "odia"
                  ? "କୌଣସି ନୋଟ ନାହିଁ"
                  : language === "hindi"
                    ? "कोई नोट नहीं"
                    : "No coaching notes yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note, i) => (
                <div
                  key={note.id.toString()}
                  className="bg-card border border-border rounded-xl p-4"
                  data-ocid={`student_detail.note.${i + 1}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      {note.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(note.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add note */}
        <section
          className="bg-card border border-border rounded-2xl p-5"
          data-ocid="student_detail.add_note_section"
        >
          <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-accent" />
            {t.writeCoachingNote}
          </h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="note-subject"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                {t.subject}
              </label>
              <select
                id="note-subject"
                value={noteSubject}
                onChange={(e) => setNoteSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="student_detail.note_subject_select"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="note-content"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                {language === "odia"
                  ? "ନୋଟ"
                  : language === "hindi"
                    ? "नोट"
                    : "Note"}
              </label>
              <textarea
                id="note-content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder={t.writeCoachingNote}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                data-ocid="student_detail.note_textarea"
              />
            </div>
            <Button
              type="button"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              onClick={handleSubmitNote}
              disabled={!noteContent.trim() || addNote.isPending}
              data-ocid="student_detail.note_submit_button"
            >
              {addNote.isPending ? t.loading : t.saveNote}
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
