import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import CommonTypes "../types/common";
import StudentTypes "../types/student";
import QuizTypes "../types/quiz";
import CoachingTypes "../types/coaching";

module {
  public type State = {
    notes : Map.Map<CoachingTypes.NoteId, CoachingTypes.CoachingNote>;
    lessons : Map.Map<CoachingTypes.LessonId, CoachingTypes.Lesson>;
    counter : { var nextNoteId : Nat; var nextLessonId : Nat };
  };

  public func addCoachingNote(
    state : State,
    req : CoachingTypes.CreateNoteRequest,
  ) : CoachingTypes.CoachingNote {
    let id = state.counter.nextNoteId;
    state.counter.nextNoteId += 1;
    let note : CoachingTypes.CoachingNote = {
      id;
      teacherId = req.teacherId;
      studentId = req.studentId;
      subject = req.subject;
      content = req.content;
      timestamp = Time.now();
    };
    state.notes.add(id, note);
    note;
  };

  public func getCoachingNotesForStudent(
    state : State,
    studentId : StudentTypes.StudentId,
  ) : [CoachingTypes.CoachingNote] {
    let all = state.notes.values().toArray();
    all.filter(func(n : CoachingTypes.CoachingNote) : Bool { n.studentId == studentId });
  };

  // Compute progress flag: red < 40%, yellow 40-69%, green >= 70%
  // Based on latest 3 attempts avg (score / totalQuestions * 100)
  public func getStudentProgress(
    _state : State,
    quizAttempts : [QuizTypes.QuizAttempt],
    studentId : StudentTypes.StudentId,
  ) : CoachingTypes.StudentProgress {
    let studentAttempts = quizAttempts.filter(func(a : QuizTypes.QuizAttempt) : Bool {
      a.studentId == studentId
    });
    // Sort by timestamp descending: take latest 3
    let sorted = studentAttempts.sort(func(a : QuizTypes.QuizAttempt, b : QuizTypes.QuizAttempt) : { #less; #equal; #greater } {
      if (a.timestamp > b.timestamp) { #less }
      else if (a.timestamp < b.timestamp) { #greater }
      else { #equal }
    });
    let latest3 = sorted.sliceToArray(0, 3);
    let latestScores = latest3.map(func(a) { a.score });
    let flag : CommonTypes.ProgressFlag = if (latest3.size() == 0) {
      #red
    } else {
      // Compute average percentage
      var totalPct = 0;
      var count = 0;
      latest3.forEach(func(a : QuizTypes.QuizAttempt) {
        if (a.totalQuestions > 0) {
          totalPct += (a.score * 100) / a.totalQuestions;
          count += 1;
        };
      });
      let avgPct = if (count == 0) { 0 } else { totalPct / count };
      if (avgPct < 40) { #red }
      else if (avgPct < 70) { #yellow }
      else { #green };
    };
    {
      studentId;
      flag;
      latestScores;
      latestAttempts = latest3;
    };
  };

  public func createLesson(
    state : State,
    req : CoachingTypes.CreateLessonRequest,
  ) : CoachingTypes.Lesson {
    let id = state.counter.nextLessonId;
    state.counter.nextLessonId += 1;
    let lesson : CoachingTypes.Lesson = {
      id;
      title = req.title;
      subject = req.subject;
      content = req.content;
      gradeLevel = req.gradeLevel;
      language = req.language;
      createdAt = Time.now();
    };
    state.lessons.add(id, lesson);
    lesson;
  };

  public func getLessonsByGrade(
    state : State,
    grade : CommonTypes.Grade,
  ) : [CoachingTypes.Lesson] {
    let all = state.lessons.values().toArray();
    all.filter(func(l : CoachingTypes.Lesson) : Bool { l.gradeLevel == grade });
  };
};
