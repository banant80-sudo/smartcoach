import Time "mo:core/Time";

module {
  public type Timestamp = Time.Time;

  public type Grade = {
    #lkg;
    #ukg;
    #std1;
    #std2;
    #std3;
    #std4;
    #std5;
    #std6;
    #std7;
    #std8;
    #std9;
    #std10;
  };

  public type Language = {
    #odia;
    #hindi;
    #english;
  };

  public type ProgressFlag = {
    #red;    // < 40%
    #yellow; // 40-69%
    #green;  // >= 70%
  };
};
