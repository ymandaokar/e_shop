import React, { Component } from "react";
import Cards from "react-credit-cards";
import Radium from "radium";

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: "",
      cardType: {
        maxLength: 16
      }
    };
  }
  handleCardNumber(evt) {
    let value = evt.target.value.replace(/ /g, ""),
      { cardType, cNumber } = this.state,
      cardDetails =
        this.state.AppState &&
        this.state.AppState.getIn(["responses", "cardDetails"]);
    if (value.length > this.state.cardType.maxLength) {
      return;
    }
    this.props.setCardtInfo("number", value);
  }
  handleCardName(evt) {
    let value = evt.target.value;
    this.props.setCardtInfo("name", value);
  }
  handleCardExpiery(evt) {
    let value = evt.target.value.replace(/ |\//g, "");
    if (value.length > 4) {
      return;
    }
    this.props.setCardtInfo("expiry", value);
  }
  handleCardCvc(evt) {
    let value = evt.target.value;
    if (value.length > 4) {
      return;
    }
    this.props.setCardtInfo("cvc", value);
  }
  handleCallback(type, isValid) {
    this.setState({ cardType: type });
    //console.log(type, isValid); //eslint-disable-line no-console
  }
  getButtonLable() {
    if (this.props.status) {
      return "DONE";
    }
    return this.props.showPay ? "PAY" : "PROCEED TO PAYMENT";
  }
  handleButtonClick() {
    if (this.props.status) {
      this.handleClose();
      return;
    }
    this.props.showPay ? this.processPayment() : this.validateUserInfo();
  }

  handleInputFocus(e) {
    let { target } = e;
    this.setState({
      focused: target.name
    });
  }

  render() {
    let {
        isMobile,
        cardDetails: { number, name, expiry, cvc },
        themeColors
      } = this.props,
      { focused } = this.state;
    return (
      <div className="">
        <div className="">
          <div>
            <div className={isMobile ? "" : "row"}>
              <div
                className={isMobile ? "col-xs-12 center-xs" : "col-xs-6 end-xs"}
              >
                <div
                  className={"box"}
                  style={{
                    marginTop: 24,
                    display: "inline-block",
                    zoom: isMobile && 0.9
                  }}
                >
                  <Cards
                    number={number || ""}
                    name={name || ""}
                    expiry={expiry || ""}
                    cvc={cvc || ""}
                    focused={focused || ""}
                    callback={this.handleCallback.bind(this)}
                  />
                </div>
              </div>
              <div className={isMobile ? "col-xs-12 mobPadlr20" : "col-xs-6"}>
                <div className={"box"}>
                  <form style={{ maxWidth: !isMobile && 300 }}>
                    <div style={{ marginTop: 24 }}>
                      <input
                        style={{
                          ":focus": {
                            borderColor: themeColors.primary1Color,
                            boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                              themeColors.accent1Color
                            }`
                          }
                        }}
                        className="form-control"
                        placeholder={"Card Number"}
                        id={"card-input"}
                        value={number || ""}
                        ref="cardNo"
                        type={"number"}
                        name={"number"}
                        onChange={this.handleCardNumber.bind(this)}
                        onFocus={this.handleInputFocus.bind(this)}
                      />
                      <div
                        className={"themeColor"}
                        style={{
                          fontSize: "90%",
                          marginTop: 5,
                          marginLeft: 5,
                          fontWeight: "bold"
                        }}
                      >
                        {"E.g. 49..., 51..., 36..., 37..."}
                      </div>
                    </div>
                    <div style={{ marginTop: 17 }}>
                      <input
                        style={{
                          ":focus": {
                            borderColor: themeColors.primary1Color,
                            boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                              themeColors.accent1Color
                            }`
                          }
                        }}
                        className={"form-control"}
                        placeholder={"Name"}
                        id={"name-input"}
                        value={name || ""}
                        ref="cardName"
                        onChange={this.handleCardName.bind(this)}
                        type={"text"}
                        name={"name"}
                        onFocus={this.handleInputFocus.bind(this)}
                      />
                    </div>
                    <div style={{ marginTop: 17 }}>
                      <div className={isMobile ? "center-xs" : "row center-xs"}>
                        <div className={isMobile ? "" : "col-xs-8"}>
                          <div className={"box"}>
                            <input
                              style={{
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              }}
                              className={"form-control"}
                              placeholder={"Valid Thru"}
                              id={"expiry-input"}
                              ref="cardExpiry"
                              value={expiry || ""}
                              type={"number"}
                              name={"expiry"}
                              onChange={this.handleCardExpiery.bind(this)}
                              onFocus={this.handleInputFocus.bind(this)}
                            />
                          </div>
                        </div>
                        <div className={isMobile ? "marTop20" : "col-xs-4"}>
                          <div className={"box"}>
                            <input
                              style={{
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              }}
                              className={"form-control"}
                              placeholder={"CVC"}
                              id={"expiry-input"}
                              ref="cardCVV"
                              value={cvc || ""}
                              type={"number"}
                              name={"cvc"}
                              onChange={this.handleCardCvc.bind(this)}
                              onFocus={this.handleInputFocus.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(CreditCard);
