import PaymentInterface from "./paymentinterface.js";
import { create } from "braintree-web/client";
export default class BraintreeAPI extends PaymentInterface {
  constructor(obj) {
    super();
    this._token = obj.token;
  }
  getNonce(cardDetails) {
    return new Promise((res, rej) => {
      create(
        {
          authorization: this._token
        },
        (createErr, clientInstance) => {
          if (createErr) {
            console.error(createErr);
            rej(createErr);
            return;
          }
          var data = {
            creditCard: {
              number: cardDetails.number,
              cvv: cardDetails.cvc,
              expirationDate: `${cardDetails.exp_month}/${
                cardDetails.exp_year
              }`,
              options: {
                validate: false
              }
            }
          };
          clientInstance.request(
            {
              endpoint: "payment_methods/credit_cards",
              method: "post",
              data: data
            },
            (requestErr, response) => {
              // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
              if (requestErr) {
                rej(requestErr);
                return;
              }
              //res(response);
              let [cardObject] = response.creditCards;
              res({
                token: cardObject.nonce,
                last4: cardObject.details.lastFour,
                brand: cardObject.details.cardType
              });
            }
          );
        }
      );
    });
  }
  getOTP() {}
}
