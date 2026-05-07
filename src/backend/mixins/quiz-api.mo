import Map "mo:core/Map";
import CommonTypes "../types/common";
import StudentTypes "../types/student";
import QuizTypes "../types/quiz";
import QuizLib "../lib/quiz";

mixin (
  quizzes : Map.Map<QuizTypes.QuizId, QuizTypes.Quiz>,
  attempts : Map.Map<QuizTypes.AttemptId, QuizTypes.QuizAttempt>,
  quizCounter : { var nextQuizId : Nat; var nextAttemptId : Nat },
) {
  let quizState : QuizLib.State = {
    quizzes;
    attempts;
    counter = quizCounter;
  };

  public shared func createQuiz(req : QuizTypes.CreateQuizRequest) : async QuizTypes.Quiz {
    QuizLib.createQuiz(quizState, req);
  };

  public query func getQuiz(id : QuizTypes.QuizId) : async ?QuizTypes.Quiz {
    QuizLib.getQuiz(quizState, id);
  };

  public query func listQuizzesByGrade(grade : CommonTypes.Grade) : async [QuizTypes.Quiz] {
    QuizLib.listQuizzesByGrade(quizState, grade);
  };

  public shared func submitQuizAttempt(req : QuizTypes.SubmitAttemptRequest) : async QuizTypes.QuizAttempt {
    QuizLib.submitQuizAttempt(quizState, req);
  };

  public query func getStudentAttempts(studentId : StudentTypes.StudentId) : async [QuizTypes.QuizAttempt] {
    QuizLib.getStudentAttempts(quizState, studentId);
  };

  public query func getAttemptDetail(attemptId : QuizTypes.AttemptId) : async ?QuizTypes.QuizAttempt {
    QuizLib.getAttemptDetail(quizState, attemptId);
  };
};
