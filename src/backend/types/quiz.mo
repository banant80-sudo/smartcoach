import CommonTypes "common";
import StudentTypes "student";

module {
  public type QuizId = Nat;
  public type QuestionId = Nat;
  public type AttemptId = Nat;

  public type QuestionType = {
    #multipleChoice;
    #shortAnswer;
  };

  public type Question = {
    id : QuestionId;
    text : Text;
    questionType : QuestionType;
    options : [Text];
    correctAnswer : Text;
  };

  public type Quiz = {
    id : QuizId;
    title : Text;
    subject : Text;
    gradeLevel : CommonTypes.Grade;
    questions : [Question];
    createdAt : CommonTypes.Timestamp;
  };

  public type QuizAttempt = {
    id : AttemptId;
    studentId : StudentTypes.StudentId;
    quizId : QuizId;
    answers : [Text];
    score : Nat;
    totalQuestions : Nat;
    timestamp : CommonTypes.Timestamp;
  };

  public type CreateQuizRequest = {
    title : Text;
    subject : Text;
    gradeLevel : CommonTypes.Grade;
    questions : [Question];
  };

  public type SubmitAttemptRequest = {
    studentId : StudentTypes.StudentId;
    quizId : QuizId;
    answers : [Text];
  };
};
