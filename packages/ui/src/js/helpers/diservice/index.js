import dependable from "../dependable";

import ContextProvider from "../usercontext/contextprovider";
import GuestProfile from "../guestprofile";

let DIService = {
  container: dependable.container(),
  initialize: function() {
    this.container.register(
      "UserContext",
      ContextProvider.getUserContext(GuestProfile)
    );
    return this.container;
  }
};

export default DIService.initialize();
