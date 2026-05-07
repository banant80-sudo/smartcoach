import Map "mo:core/Map";
import Iter "mo:core/Iter";
import CommonTypes "../types/common";
import StudentTypes "../types/student";
import QuizTypes "../types/quiz";
import CoachingTypes "../types/coaching";
import CoachingLib "../lib/coaching";

mixin (
  notes : Map.Map<CoachingTypes.NoteId, CoachingTypes.CoachingNote>,
  lessons : Map.Map<CoachingTypes.LessonId, CoachingTypes.Lesson>,
  coachingCounter : { var nextNoteId : Nat; var nextLessonId : Nat },
  quizzes : Map.Map<QuizTypes.QuizId, QuizTypes.Quiz>,
  attempts : Map.Map<QuizTypes.AttemptId, QuizTypes.QuizAttempt>,
  quizCounter : { var nextQuizId : Nat; var nextAttemptId : Nat },
) {
  let coachingState : CoachingLib.State = {
    notes;
    lessons;
    counter = coachingCounter;
  };

  public shared func addCoachingNote(req : CoachingTypes.CreateNoteRequest) : async CoachingTypes.CoachingNote {
    CoachingLib.addCoachingNote(coachingState, req);
  };

  public query func getCoachingNotesForStudent(studentId : StudentTypes.StudentId) : async [CoachingTypes.CoachingNote] {
    CoachingLib.getCoachingNotesForStudent(coachingState, studentId);
  };

  public query func getStudentProgress(studentId : StudentTypes.StudentId) : async CoachingTypes.StudentProgress {
    let allAttempts = attempts.values().toArray();
    CoachingLib.getStudentProgress(coachingState, allAttempts, studentId);
  };

  public shared func createLesson(req : CoachingTypes.CreateLessonRequest) : async CoachingTypes.Lesson {
    CoachingLib.createLesson(coachingState, req);
  };

  public query func getLessonsByGrade(grade : CommonTypes.Grade) : async [CoachingTypes.Lesson] {
    CoachingLib.getLessonsByGrade(coachingState, grade);
  };
};
