import CommonTypes "common";
import StudentTypes "student";
import TeacherTypes "teacher";
import QuizTypes "quiz";

module {
  public type NoteId = Nat;
  public type LessonId = Nat;

  public type CoachingNote = {
    id : NoteId;
    teacherId : TeacherTypes.TeacherId;
    studentId : StudentTypes.StudentId;
    subject : Text;
    content : Text;
    timestamp : CommonTypes.Timestamp;
  };

  public type Lesson = {
    id : LessonId;
    title : Text;
    subject : Text;
    content : Text;
    gradeLevel : CommonTypes.Grade;
    language : CommonTypes.Language;
    createdAt : CommonTypes.Timestamp;
  };

  public type StudentProgress = {
    studentId : StudentTypes.StudentId;
    flag : CommonTypes.ProgressFlag;
    latestScores : [Nat];
    latestAttempts : [QuizTypes.QuizAttempt];
  };

  public type CreateNoteRequest = {
    teacherId : TeacherTypes.TeacherId;
    studentId : StudentTypes.StudentId;
    subject : Text;
    content : Text;
  };

  public type CreateLessonRequest = {
    title : Text;
    subject : Text;
    content : Text;
    gradeLevel : CommonTypes.Grade;
    language : CommonTypes.Language;
  };
};
