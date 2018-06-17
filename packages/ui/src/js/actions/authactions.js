import Reflux from "reflux-core";
const AuthActions = Reflux.createActions([
  "login",
  "logout",
  "userChanged",
  "onBeforeLogout",
  "onAfterLogout",
  "triggerState"
]);

export default AuthActions;
