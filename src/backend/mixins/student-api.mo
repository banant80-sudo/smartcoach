import Map "mo:core/Map";
import CommonTypes "../types/common";
import StudentTypes "../types/student";
import StudentLib "../lib/student";

mixin (
  students : Map.Map<StudentTypes.StudentId, StudentTypes.Student>,
  studentCounter : { var nextStudentId : Nat },
) {
  let studentState : StudentLib.State = {
    students;
    counter = studentCounter;
  };

  public shared func createStudent(req : StudentTypes.CreateStudentRequest) : async StudentTypes.Student {
    StudentLib.createStudent(studentState, req);
  };

  public query func getStudent(id : StudentTypes.StudentId) : async ?StudentTypes.Student {
    StudentLib.getStudent(studentState, id);
  };

  public shared func updateStudentLanguage(id : StudentTypes.StudentId, language : CommonTypes.Language) : async Bool {
    StudentLib.updateStudentLanguage(studentState, id, language);
  };

  public query func listStudents(gradeFilter : ?CommonTypes.Grade) : async [StudentTypes.Student] {
    StudentLib.listStudents(studentState, gradeFilter);
  };
};
