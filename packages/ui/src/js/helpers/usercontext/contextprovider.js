import UserContext from "./context.js";
const ContextProvider = {
  userContexts: {},
  getUserContext: function(userProfile) {
    if (this.userContexts[userProfile._id]) {
      return this.userContexts[userProfile._id].then(uc => {
        return uc.isValid()
          ? uc
          : (this.userContexts[userProfile._id] = new UserContext(
              userProfile
            )._initialize());
      });
    }
    return (this.userContexts[userProfile._id] = new UserContext(
      userProfile
    )._initialize());
  }
};

export default ContextProvider;
