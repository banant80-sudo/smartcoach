import CommonTypes "common";

module {
  public type StudentId = Nat;

  public type Student = {
    id : StudentId;
    name : Text;
    grade : CommonTypes.Grade;
    languagePreference : CommonTypes.Language;
    createdAt : CommonTypes.Timestamp;
  };

  public type CreateStudentRequest = {
    name : Text;
    grade : CommonTypes.Grade;
    languagePreference : CommonTypes.Language;
  };
};
