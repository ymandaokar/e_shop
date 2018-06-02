import Reflux from "reflux";
import createStore from "reflux-core/lib/createStore";
import Immutable from "immutable";
import Actions from "../actions/actions.js";
import ObjectID from "bson-objectid";
import { filter } from "lodash-es";
import axios from "axios";
import {
  stripeConfig,
  braintree,
  paypal,
  productsLimit
} from "../appsettings.js";
import PaymentGatewayFactory from "../helpers/paymentgatwatfactory.js";
import {
  categories,
  products,
  organisationalConfig
} from "../helpers/appdata.js";
import SearchProduct from "../components/searchproduct.js";
const paymentGatewayTypes = {
  stripe: {
    token: stripeConfig.apiKey,
    url: stripeConfig.tokenURL
  },
  braintree: {
    token: braintree.apiKey
  },
  paypal: {
    token: paypal.apiKey
  }
};
function addSubCatagorisToCategories(categories, subCategories) {
  return categories.map(category => {
    category.children = filter(
      subCategories,
      obj => obj.ParentCategoryId == category.id
    );
    subCategories = filter(
      subCategories,
      obj => obj.ParentCategoryId != category.id
    );
    return category;
  });
}
const AppStore = Reflux.createStore({
  listenables: [Actions],
  _skip: 0,
  _limit: productsLimit,
  _key: "",
  _totalPages: Immutable.Map(),
  init: function() {
    this.state = Immutable.Map({
      cardDetails: Immutable.Map({
        number: "",
        name: "",
        expiry: "",
        cvc: ""
      }),
      totalPage: 0,
      currentPage: 0,
      categories: Immutable.Set(),
      products: Immutable.Set(),
      organizationalConfig: {},
      currentProduct: null
    });
  },
  validateEmail: function(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
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
    this.getEvents();
  },
  prev: function() {
    let pageNo = this.state.get("currentPage");
    this.updateState(
      this.state.set("currentPage", Math.max(pageNo - 1, 0)),
      true
    );
    this.getEvents();
  },
  jumpTo: function(pageNo) {
    this.updateState(this.state.set("currentPage", pageNo), true);
    this.getEvents();
  },
  search: function(key) {
    if (this._key == key) {
      return;
    }
    this._key = key;
    this.getAfterTotal();
  },
  getAfterTotal: function() {
    return axios({
      url: `${serverURL}/svc/api/Events`,
      method: "GET",
      params: {
        filter: {
          where: {
            EndDate: { gt: new Date() },
            IsOnlineEvent: true
          },
          fields: ["id"]
        }
      }
    }).then(response => {
      let { data } = response;
      this.updateState(
        this.state.set("totalPage", Math.ceil(data.length / this._limit))
      );
      return this.getEvents();
    });
  },
  getEvents: function() {
    let pageNo = this.state.get("currentPage");
    this._skip = this._limit * pageNo;
    return axios({
      url: `${serverURL}/svc/api/Events`,
      method: "GET",
      params: {
        filter: {
          where: {
            EndDate: { gt: new Date() },
            IsOnlineEvent: true
          },
          limit: this._limit,
          skip: this._skip
        }
      }
    }).then(response => {
      let { data } = response,
        events = Immutable.Map();
      data.forEach(event => {
        events = events.set(event.id, Immutable.Map(event));
      });
      this.updateState(
        this.state.set("events", this.state.get("events").merge(events))
      );
    });
  },
  loadEvents: function() {
    return this.getAfterTotal();
  },
  loadEvent: function(id) {
    if (!id) {
      return;
    }
    if (
      this.state.getIn(["currentEvent"]) &&
      this.state.getIn(["currentEvent", "id"]) == id
    ) {
      this.triggerState();
      return;
    }
    if (this._allEvents.has(id)) {
      this.updateState(this.state.set("currentEvent", this._allEvents.get(id)));
      return;
    }
    return axios({
      url: `${serverURL}/svc/api/Events/condensed?eventid=${id}`,
      method: "GET"
    })
      .then(response => {
        let { data } = response;
        this._allEvents = this._allEvents.set(id, Immutable.Map(data.result));
        this.updateState(
          this.state.set("currentEvent", Immutable.Map(data.result))
        );
      })
      .catch(err => {
        console.debug(err);
      });
  },
  setCardtInfo: function(value) {
    this.updateState(this.state.setIn(["cardDetails"], value));
  },
  triggerState: function() {
    this.trigger(this.state);
  },
  getPaymentToken(paymentMethod, card) {
    if (indexOf(["Credit Card", "Debit"], paymentMethod) == -1) {
      return Promise.resolve();
    }
    let type = "stripe";
    let paymentGateway = PaymentGatewayFactory[type](paymentGatewayTypes[type]);
    return paymentGateway.getNonce(card).catch(err => {
      this.updateState(
        this.state
          .set("response", {
            processFailed: true,
            error: "Please enter correct card details."
          })
          .set("pending", false)
      );
      throw err;
    });
  },
  reset: function() {
    this._skip = 0;
    this.updateState(
      this.state
        .set("currentPage", 0)
        .set("totalPage", 0)
        .set(
          "cardDetails",
          Immutable.Map({
            number: "",
            name: "",
            expiry: "",
            cvc: ""
          })
        )
    );
  },
  getCategories() {
    //For Localhost use the below url
    // const url = `${siteURL}/svc/api/Categories`;

    // return axios({
    //   method: "get",
    //   url
    // }).then(response => {
    //   let categories = [],
    //     subCategories = [];
    //   response.data.forEach(category => {
    //     if (!category.IsActive) {
    //       return;
    //     }
    //     if (!category.ParentCategoryId) {
    //       categories.push(category);
    //     } else {
    //       subCategories.push(category);
    //     }
    //   });
    //   categories = addSubCatagorisToCategories(categories, subCategories);
    //   this.updateState(
    //     this.state.set("categories", Immutable.Set(categories)),
    //     true
    //   );
    //   return;
    // });
    let Categories = [],
      subCategories = [];
    categories.forEach(category => {
      if (!category.IsActive) {
        return;
      }
      if (!category.ParentCategoryId) {
        Categories.push(category);
      } else {
        subCategories.push(category);
      }
    });
    Categories = addSubCatagorisToCategories(Categories, subCategories);
    this.updateState(
      this.state.set("categories", Immutable.Set(Categories)),
      true
    );
  },
  searchingForCategory(category) {
    return function(x) {
      return x.categories.indexOf(category) != -1 || !category;
    };
  },
  loadCategorizedProducts(id) {
    let serchedProducts = products.filter(this.searchingForCategory(id));
    this.updateState(
      this.state.set("products", Immutable.Set(serchedProducts))
    );
  },
  loadData() {
    this.getCategories();
    this.updateState(
      this.state.set("organizationalConfig", organisationalConfig)
    );
  },
  loadProduct(id) {
    let currentProduct;
    products.forEach(product => {
      if (product.id == id) {
        currentProduct = product;
      }
    });
    this.updateState(this.state.set("currentProduct", currentProduct));
  }
});

export default AppStore;
