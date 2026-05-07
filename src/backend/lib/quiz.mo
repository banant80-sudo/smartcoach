import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import StudentTypes "../types/student";
import QuizTypes "../types/quiz";

module {
  public type State = {
    quizzes : Map.Map<QuizTypes.QuizId, QuizTypes.Quiz>;
    attempts : Map.Map<QuizTypes.AttemptId, QuizTypes.QuizAttempt>;
    counter : { var nextQuizId : Nat; var nextAttemptId : Nat };
  };

  public func createQuiz(
    state : State,
    req : QuizTypes.CreateQuizRequest,
  ) : QuizTypes.Quiz {
    let id = state.counter.nextQuizId;
    state.counter.nextQuizId += 1;
    // Tag each question with its position index as id
    let taggedQuestions = req.questions.mapEntries(
      func(q, i) { { q with id = i } }
    );
    let quiz : QuizTypes.Quiz = {
      id;
      title = req.title;
      subject = req.subject;
      gradeLevel = req.gradeLevel;
      questions = taggedQuestions;
      createdAt = Time.now();
    };
    state.quizzes.add(id, quiz);
    quiz;
  };

  public func getQuiz(
    state : State,
    id : QuizTypes.QuizId,
  ) : ?QuizTypes.Quiz {
    state.quizzes.get(id);
  };

  public func listQuizzesByGrade(
    state : State,
    grade : CommonTypes.Grade,
  ) : [QuizTypes.Quiz] {
    let all = state.quizzes.values().toArray();
    all.filter(func(q : QuizTypes.Quiz) : Bool { q.gradeLevel == grade });
  };

  public func submitQuizAttempt(
    state : State,
    req : QuizTypes.SubmitAttemptRequest,
  ) : QuizTypes.QuizAttempt {
    let quiz = switch (state.quizzes.get(req.quizId)) {
      case null { Runtime.trap("Quiz not found") };
      case (?q) { q };
    };
    // Auto-grade: count correct answers for multipleChoice questions
    var score = 0;
    let totalQuestions = quiz.questions.size();
    quiz.questions.forEach(func(q : QuizTypes.Question) {
      let answerIdx = q.id;
      if (answerIdx < req.answers.size()) {
        let given = req.answers[answerIdx];
        switch (q.questionType) {
          case (#multipleChoice) {
            if (given == q.correctAnswer) { score += 1 };
          };
          case (#shortAnswer) {};
        };
      };
    });
    let id = state.counter.nextAttemptId;
    state.counter.nextAttemptId += 1;
    let attempt : QuizTypes.QuizAttempt = {
      id;
      studentId = req.studentId;
      quizId = req.quizId;
      answers = req.answers;
      score;
      totalQuestions;
      timestamp = Time.now();
    };
    state.attempts.add(id, attempt);
    attempt;
  };

  public func getStudentAttempts(
    state : State,
    studentId : StudentTypes.StudentId,
  ) : [QuizTypes.QuizAttempt] {
    let all = state.attempts.values().toArray();
    all.filter(func(a : QuizTypes.QuizAttempt) : Bool { a.studentId == studentId });
  };

  public func getAttemptDetail(
    state : State,
    attemptId : QuizTypes.AttemptId,
  ) : ?QuizTypes.QuizAttempt {
    state.attempts.get(attemptId);
  };
};
