import Map "mo:core/Map";
import TeacherTypes "../types/teacher";

module {
  public type State = {
    teachers : Map.Map<TeacherTypes.TeacherId, TeacherTypes.Teacher>;
    counter : { var nextTeacherId : Nat };
  };

  public func createTeacher(
    state : State,
    caller : Principal,
    req : TeacherTypes.CreateTeacherRequest,
  ) : TeacherTypes.Teacher {
    let id = state.counter.nextTeacherId;
    state.counter.nextTeacherId += 1;
    let teacher : TeacherTypes.Teacher = {
      id;
      name = req.name;
      principal = caller;
    };
    state.teachers.add(id, teacher);
    teacher;
  };

  public func getTeacher(
    state : State,
    id : TeacherTypes.TeacherId,
  ) : ?TeacherTypes.Teacher {
    state.teachers.get(id);
  };
};
