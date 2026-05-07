import Map "mo:core/Map";
import StudentTypes "types/student";
import TeacherTypes "types/teacher";
import QuizTypes "types/quiz";
import CoachingTypes "types/coaching";
import StudentLib "lib/student";
import TeacherLib "lib/teacher";
import QuizLib "lib/quiz";
import CoachingLib "lib/coaching";
import StudentMixin "mixins/student-api";
import TeacherMixin "mixins/teacher-api";
import QuizMixin "mixins/quiz-api";
import CoachingMixin "mixins/coaching-api";
import Principal "mo:core/Principal";

actor {
  // Student state
  let students = Map.empty<StudentTypes.StudentId, StudentTypes.Student>();
  let studentCounter = { var nextStudentId = 0 };

  // Teacher state
  let teachers = Map.empty<TeacherTypes.TeacherId, TeacherTypes.Teacher>();
  let teacherCounter = { var nextTeacherId = 0 };

  // Quiz state
  let quizzes = Map.empty<QuizTypes.QuizId, QuizTypes.Quiz>();
  let attempts = Map.empty<QuizTypes.AttemptId, QuizTypes.QuizAttempt>();
  let quizCounter = { var nextQuizId = 0; var nextAttemptId = 0 };

  // Coaching and lesson state
  let notes = Map.empty<CoachingTypes.NoteId, CoachingTypes.CoachingNote>();
  let lessons = Map.empty<CoachingTypes.LessonId, CoachingTypes.Lesson>();
  let coachingCounter = { var nextNoteId = 0; var nextLessonId = 0 };

  // ── Sample data seed (runs once at first deploy) ──────────────────────────
  let _studentState : StudentLib.State = { students; counter = studentCounter };
  let _teacherState : TeacherLib.State = { teachers; counter = teacherCounter };
  let _quizState : QuizLib.State = { quizzes; attempts; counter = quizCounter };
  let _coachingState : CoachingLib.State = { notes; lessons; counter = coachingCounter };

  // Sample teacher
  ignore TeacherLib.createTeacher(_teacherState, Principal.fromText("2vxsx-fae"), { name = "Sunita Mishra" });

  // Sample students across grades
  ignore StudentLib.createStudent(_studentState, { name = "Arjun Das"; grade = #lkg; languagePreference = #odia });
  ignore StudentLib.createStudent(_studentState, { name = "Priya Sharma"; grade = #std3; languagePreference = #hindi });
  ignore StudentLib.createStudent(_studentState, { name = "Ravi Kumar"; grade = #std6; languagePreference = #english });
  ignore StudentLib.createStudent(_studentState, { name = "Anita Patel"; grade = #std10; languagePreference = #odia });

  // Sample quizzes for early grades (LKG/UKG)
  ignore QuizLib.createQuiz(_quizState, {
    title = "Basic Shapes";
    subject = "Mathematics";
    gradeLevel = #lkg;
    questions = [
      { id = 0; text = "Which shape has 3 sides?"; questionType = #multipleChoice; options = ["Circle", "Triangle", "Square", "Rectangle"]; correctAnswer = "Triangle" },
      { id = 1; text = "Which shape is round?"; questionType = #multipleChoice; options = ["Square", "Triangle", "Circle", "Rectangle"]; correctAnswer = "Circle" },
    ];
  });
  ignore QuizLib.createQuiz(_quizState, {
    title = "Animals Around Us";
    subject = "Environmental Studies";
    gradeLevel = #ukg;
    questions = [
      { id = 0; text = "Which animal gives us milk?"; questionType = #multipleChoice; options = ["Dog", "Cow", "Cat", "Fish"]; correctAnswer = "Cow" },
      { id = 1; text = "Which animal can fly?"; questionType = #multipleChoice; options = ["Dog", "Fish", "Bird", "Cow"]; correctAnswer = "Bird" },
    ];
  });

  // Sample quizzes for middle grades (Std 3-6)
  ignore QuizLib.createQuiz(_quizState, {
    title = "Addition and Subtraction";
    subject = "Mathematics";
    gradeLevel = #std3;
    questions = [
      { id = 0; text = "What is 15 + 27?"; questionType = #multipleChoice; options = ["40", "42", "43", "41"]; correctAnswer = "42" },
      { id = 1; text = "What is 50 - 18?"; questionType = #multipleChoice; options = ["32", "30", "33", "31"]; correctAnswer = "32" },
    ];
  });
  ignore QuizLib.createQuiz(_quizState, {
    title = "Our Solar System";
    subject = "Science";
    gradeLevel = #std6;
    questions = [
      { id = 0; text = "Which is the largest planet?"; questionType = #multipleChoice; options = ["Earth", "Mars", "Jupiter", "Saturn"]; correctAnswer = "Jupiter" },
      { id = 1; text = "How many planets are in the solar system?"; questionType = #multipleChoice; options = ["7", "8", "9", "10"]; correctAnswer = "8" },
    ];
  });

  // Sample lessons
  ignore CoachingLib.createLesson(_coachingState, {
    title = "Odia Varnamala";
    subject = "Odia Language";
    content = "Learn the basic Odia alphabet (ଓଡ଼ିଆ ବର୍ଣ୍ଣମାଳା). Practice writing and pronouncing each letter carefully.";
    gradeLevel = #std1;
    language = #odia;
  });
  ignore CoachingLib.createLesson(_coachingState, {
    title = "Hindi Matra";
    subject = "Hindi Language";
    content = "Understanding matras (मात्राएं) in Hindi. Learn aa ki matra, e ki matra, and practice with simple words.";
    gradeLevel = #std2;
    language = #hindi;
  });
  ignore CoachingLib.createLesson(_coachingState, {
    title = "English Phonics";
    subject = "English";
    content = "Introduction to phonics sounds. Learn the sounds of each letter and practice blending to read simple words.";
    gradeLevel = #std1;
    language = #english;
  });

  // ── Mixin composition ─────────────────────────────────────────────────────
  include StudentMixin(students, studentCounter);
  include TeacherMixin(teachers, teacherCounter);
  include QuizMixin(quizzes, attempts, quizCounter);
  include CoachingMixin(notes, lessons, coachingCounter, quizzes, attempts, quizCounter);
};
