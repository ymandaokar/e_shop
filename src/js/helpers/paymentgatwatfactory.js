import BraintreeAPI from "./braintree.js";
import StripeAPI from "./stripe.js";
module.exports = {
  braintree: obj => new BraintreeAPI(obj),
  stripe: obj => new StripeAPI(obj)
};
