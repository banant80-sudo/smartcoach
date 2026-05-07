import Map "mo:core/Map";
import TeacherTypes "../types/teacher";
import TeacherLib "../lib/teacher";

mixin (
  teachers : Map.Map<TeacherTypes.TeacherId, TeacherTypes.Teacher>,
  teacherCounter : { var nextTeacherId : Nat },
) {
  let teacherState : TeacherLib.State = {
    teachers;
    counter = teacherCounter;
  };

  public shared ({ caller }) func createTeacher(req : TeacherTypes.CreateTeacherRequest) : async TeacherTypes.Teacher {
    TeacherLib.createTeacher(teacherState, caller, req);
  };

  public query func getTeacher(id : TeacherTypes.TeacherId) : async ?TeacherTypes.Teacher {
    TeacherLib.getTeacher(teacherState, id);
  };
};
