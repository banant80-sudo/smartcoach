import Map "mo:core/Map";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import CommonTypes "../types/common";
import StudentTypes "../types/student";

module {
  public type State = {
    students : Map.Map<StudentTypes.StudentId, StudentTypes.Student>;
    counter : { var nextStudentId : Nat };
  };

  public func createStudent(
    state : State,
    req : StudentTypes.CreateStudentRequest,
  ) : StudentTypes.Student {
    let id = state.counter.nextStudentId;
    state.counter.nextStudentId += 1;
    let student : StudentTypes.Student = {
      id;
      name = req.name;
      grade = req.grade;
      languagePreference = req.languagePreference;
      createdAt = Time.now();
    };
    state.students.add(id, student);
    student;
  };

  public func getStudent(
    state : State,
    id : StudentTypes.StudentId,
  ) : ?StudentTypes.Student {
    state.students.get(id);
  };

  public func updateStudentLanguage(
    state : State,
    id : StudentTypes.StudentId,
    language : CommonTypes.Language,
  ) : Bool {
    switch (state.students.get(id)) {
      case null { false };
      case (?existing) {
        state.students.add(id, { existing with languagePreference = language });
        true;
      };
    };
  };

  public func listStudents(
    state : State,
    gradeFilter : ?CommonTypes.Grade,
  ) : [StudentTypes.Student] {
    let all = state.students.values().toArray();
    switch (gradeFilter) {
      case null { all };
      case (?grade) {
        all.filter(func(s : StudentTypes.Student) : Bool {
          s.grade == grade
        })
      };
    };
  };
};
