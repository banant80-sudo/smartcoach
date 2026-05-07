module {
  public type TeacherId = Nat;

  public type Teacher = {
    id : TeacherId;
    name : Text;
    principal : Principal;
  };

  public type CreateTeacherRequest = {
    name : Text;
  };
};
