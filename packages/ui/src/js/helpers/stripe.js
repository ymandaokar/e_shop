import PaymentInterface from "./paymentinterface.js";
import axios from "axios";
import _ from "lodash";
export default class StripAPI extends PaymentInterface {
  constructor(obj) {
    super();
    this._token = obj.token;
    this._url = obj.url;
  }
  _getCardObjString(obj) {
    let cardString = [];
    _.forIn(obj, (val, key) => {
      cardString.push(`card[${key}]=${val}`);
    });
    return cardString.join(`&`);
  }
  getNonce(cardDetails) {
    return axios({
      url: this._url,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this._token}`
      },
      data: this._getCardObjString(cardDetails)
    }).then(res => {
      let { data } = res;
      return {
        ...data.card,
        token: data.id,
        client_ip: data.client_ip
      };
    });
  }
  getOTP() {}
}
