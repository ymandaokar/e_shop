import Reflux from "reflux";
import createStore from "reflux-core/lib/createStore";
import Immutable from "immutable";
import CategoryActions from "../actions/categoryactions.js";
import AuthActions from "../actions/authactions.js";
import ObjectID from "bson-objectid";
import { filter, omit } from "lodash-es";
import axios from "axios";
import { adminDataLimit } from "../appsettings.js";
import preciseRound from "../helpers/preciseround.js";
import history from "../helpers/history.js";
const AdminStore = Reflux.createStore({
  listenables: [CategoryActions, AuthActions],
  _skip: 0,
  _limit: adminDataLimit,
  _key: "",
  _totalPages: Immutable.Map(),
  init: function() {
    this.state = Immutable.Map({
      categories: Immutable.Map(),
      currentCategory: {},
      categoryTypes: [],
      totalPage: 0,
      currentPage: 0
    });
  },
  userChanged: function(prevProfile, newProfile) {
    this._currentProfile = newProfile;
    this.reset();
    this.loadCategories();
  },
  updateState: function(newState, suppressTrigger) {
    if (this.state.equals(newState)) {
      //return;
    }
    if (newState) {
      this.state = newState;
    }

    if (!suppressTrigger) {
      this.trigger(this.state);
    }
  },
  next: function() {
    let pageNo = this.state.get("currentPage"),
      totalPage = this.state.get("totalPage");
    if (!totalPage) {
      return;
    }
    this.updateState(
      this.state.set("currentPage", Math.min(pageNo + 1, totalPage - 1)),
      true
    );
    this.getCategories();
  },
  prev: function() {
    let pageNo = this.state.get("currentPage");
    this.updateState(
      this.state.set("currentPage", Math.max(pageNo - 1, 0)),
      true
    );
    this.getCategories();
  },
  jumpTo: function(pageNo) {
    this.updateState(this.state.set("currentPage", pageNo), true);
    this.getCategories();
  },
  search: function(key) {
    if (this._key == key) {
      return;
    }
    this._key = key;
    this.getAfterTotal();
  },
  getAfterTotal: function() {
    if (!this._currentProfile || !this._currentProfile.isAdmin) {
      return;
    }
    return axios({
      url: `/auth/categories`,
      method: "GET",
      params: {
        skip: Number(this._skip),
        fields: ["_id", "name", "parentCategoryId"],
        user: this._currentProfile._id
      }
    }).then(response => {
      let {
        data: { docs }
      } = response;
      this.updateState(
        this.state
          .set("totalPage", Math.ceil(docs.length / this._limit))
          .set(
            "categoryTypes",
            docs.filter(category => !category.parentCategoryId)
          )
      );
      return this.getCategories();
    });
  },
  getCategories: function() {
    if (!this._currentProfile || !this._currentProfile.isAdmin) {
      return;
    }
    let pageNo = this.state.get("currentPage");
    this._skip = this._limit * pageNo;
    if (this._totalPages.has(pageNo)) {
      this.updateState(
        this.state.set("categories", this._totalPages.get(pageNo))
      );
      return;
    }
    return axios({
      url: `/auth/categories`,
      method: "GET",
      params: {
        limit: this._limit,
        skip: this._skip,
        user: this._currentProfile._id
      }
    }).then(response => {
      let {
          data: { docs }
        } = response,
        categories = Immutable.Map();
      docs.forEach(category => {
        categories = categories.set(category._id, category);
      });
      this._totalPages = this._totalPages.set(pageNo, categories);
      this.updateState(this.state.set("categories", categories));
    });
  },
  loadCategories: function() {
    return this.getAfterTotal();
  },
  triggerState: function() {
    this.trigger(this.state);
  },
  reset: function() {
    this._skip = 0;
    this._totalPages = Immutable.Map();
    this._key = "";
    this.updateState(
      this.state
        .set("currentPage", 0)
        .set("totalPage", 0)
        .set("categories", Immutable.Map())
    );
  },
  setCurrentCategory(category) {
    this.updateState(this.state.set("currentCategory", category));
  }
});

export default AdminStore;
