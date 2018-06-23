import React from "react";
import Superlogin from "superlogin-client";
import Reflux from "reflux";
import GuestProfile from "../helpers/guestprofile";
import Immutable from "immutable";
import _ from "lodash";
import Logger from "../helpers/logger.js";
import ContextProvider from "../helpers/usercontext/contextprovider";
import {
  OAuth,
  clientConfig,
  userDb,
  skipSignOutRoutes
} from "../appsettings.js";
import AuthActions from "../actions/authactions.js";
import url from "url";
import history from "../helpers/history.js";
import DIService from "../helpers/diservice";
const guestUser = "guest",
  AuthStates = {
    SIGNED_IN: "signed-in",
    SIGNING_IN: "signing-in",
    SIGNED_OUT: "signed-out",
    SIGNING_OUT: "signing-out",
    ERROR: "error"
  },
  AuthProviders = [
    {
      name: "google",
      title: "Google",
      logo: (
        <path d="M16.319 13.713v5.487h9.075c-0.369 2.356-2.744 6.9-9.075 6.9-5.463 0-9.919-4.525-9.919-10.1s4.456-10.1 9.919-10.1c3.106 0 5.188 1.325 6.375 2.469l4.344-4.181c-2.788-2.612-6.4-4.188-10.719-4.188-8.844 0-16 7.156-16 16s7.156 16 16 16c9.231 0 15.363-6.494 15.363-15.631 0-1.050-0.113-1.85-0.25-2.65l-15.113-0.006z" />
      )
    },
    {
      name: "facebook",
      title: "Facebook",
      logo: (
        <path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z" />
      )
    }
  ],
  filterProviders = function(providers) {
    return _.takeWhile(providers, provider => {
      return (
        _.findKey(OAuth, client => {
          return client.name == provider.name;
        }) != undefined
      );
    });
  },
  defaultData = Immutable.fromJS({
    AuthStates: AuthStates,
    AuthProviders: filterProviders(AuthProviders),
    authState: AuthStates.SIGNED_OUT,
    provider: null,
    error: null,
    userProfile: GuestProfile
  }),
  AuthStore = Reflux.createStore({
    listenables: AuthActions,
    state: defaultData,
    provider: null,
    _subscribers: Immutable.Map({
      onbeforelogout: [],
      onafterlogout: []
    }),
    onLogout: false,
    updateState: function(newState, trigger) {
      this.state = newState;
      if (trigger) {
        this.trigger(this.state);
      }
    },
    getInitialState: function() {
      return this.state;
    },
    subscribe: function(event, fn) {
      if (this._subscribers.get(event).indexOf(fn) == -1) {
        this._subscribers.get(event).push(fn);
      }
    },
    unsubscribe: function(event, fn) {
      let index = this._subscribers.get(event).indexOf(fn);
      if (index > -1) {
        this._subscribers.get(event).splice(index, 1);
      }
    },
    triggerEvent: function(event, ...payload) {
      return this._subscribers.get(event).reduce((acc, handler) => {
        if (!handler(...payload)) {
          acc = false;
        }
        return acc;
      }, true);
    },
    routeToProducts: function() {
      let currentLocationArr = window.location.href.split("/"),
        skipRoute = skipSignOutRoutes.reduce((result, testRoute) => {
          let index = _.indexOf(currentLocationArr, testRoute);
          if (index != -1) {
            result = true;
          }
          return result;
        }, false);
      if (skipRoute) return;
      history.push({ pathname: "/products" });
    },
    init: function() {
      Superlogin.configure(clientConfig);
      if (Superlogin.authenticated()) {
        this._getProfile()
          .then(profile => {
            this.updateState(
              this.state.mergeDeep({
                authState: AuthStates.SIGNED_IN,
                userProfile: profile
              }),
              true
            );
            this.registerContextAndProviders(profile);
            AuthActions.userChanged(GuestProfile, profile, true);
          })
          .catch(err => Logger.log);
      } else {
        this.registerContextAndProviders(GuestProfile);
        AuthActions.userChanged(null, GuestProfile);
      }
    },
    getProperDBURL: function(dbURL) {
      let urlObj = url.parse(dbURL);
      urlObj.pathname = `\db${urlObj.pathname}`;
      return url.format(urlObj);
    },
    _getProfile: function() {
      return Superlogin.getHttp()
        .get("user/profile")
        .then(res => {
          let profile = res.data,
            dbURL = Superlogin.getDbUrl(userDb);
          profile["userDbUrl"] = this.getProperDBURL(dbURL);
          profile["isGuest"] = false;
          return profile;
        });
    },
    login: function(provider) {
      this.updateState(
        this.state.setIn(["authState"], AuthStates.SIGNING_IN),
        true
      );
      Superlogin.socialAuth(provider)
        .then(() => this._getProfile())
        .then(profile => {
          this.updateState(
            this.state.mergeDeep({
              authState: AuthStates.SIGNED_IN,
              userProfile: profile
            }),
            true
          );
          this.registerContextAndProviders(profile);
          AuthActions.userChanged(GuestProfile, profile);
          // NotificationActions.notify(
          //   Notifications.INFO,
          //   i18n.t("You are successfully logged in")
          // );
          Logger.log("logged-in");
        })
        .catch(err => {
          Logger.error(err);
          // NotificationActions.notify(
          //   Notifications.ERROR,
          //   i18n.t(`The Login wasn't completed`)
          // );
          this.updateState(
            this.state.mergeDeep({
              authState: AuthStates.SIGNED_OUT,
              userProfile: GuestProfile
            }),
            true
          );
        });
    },
    logout: function(...payload) {
      this.updateState(
        this.state.setIn(["authState"], AuthStates.SIGNING_IN),
        true
      );
      //AuthActions.onBeforeLogout();
      if (this.onLogout) {
        return;
      }
      this.onLogout = true;
      if (!this.triggerEvent("onbeforelogout", ...payload)) {
        this.onLogout = false;
        return;
      }
      DIService.get("UserContext")
        .then(uc => uc.destroy())
        .then(() => Superlogin.logout("logout"))
        .then(() => {
          this.registerContextAndProviders(GuestProfile);
          AuthActions.userChanged(
            this.state.getIn(["userProfile"]).toJSON(),
            GuestProfile
          );
          this.updateState(
            this.state.mergeDeep({
              authState: AuthStates.SIGNED_OUT,
              userProfile: GuestProfile
            }),
            true
          );
          this.onLogout = false;
          //AuthActions.onAfterLogout();
          this.triggerEvent("onafterlogout", ...payload);
          this.routeToProducts();
          // NotificationActions.notify(
          //   Notifications.INFO,
          //   i18n.t(`You have successfully logged out`)
          // );
          this.updateState(
            this.state.setIn(["authState"], AuthStates.SIGNED_OUT),
            true
          );
        })
        .catch(error => {
          this.onLogout = false;
          Logger.error(error);
          this.updateState(
            this.state.mergeDeep({
              authState: AuthStates.ERROR,
              error: { message: "An error occurred during logout" }
            }),
            true
          );
          this.updateState(
            this.state.setIn(["authState"], AuthStates.SIGNED_IN),
            true
          );
        });
    },
    triggerState() {
      this.trigger(this.state);
    },
    registerContextAndProviders(profile) {
      DIService.register(
        "UserContext",
        ContextProvider.getUserContext(profile)
      );
    }
  });

export default AuthStore;
