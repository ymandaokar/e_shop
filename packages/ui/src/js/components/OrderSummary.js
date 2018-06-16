import React, { Component } from "react";
import { forIn } from "lodash-es";
import AppStore from "../stores/store.js";
import AppActions from "../actions/actions.js";
import { Collapse } from "react-collapse";

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = { collapse: false };
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.setState({ collapse: true });
  }
  getAppBarWithTitle(title) {
    let { themeColors } = this.props;
    return (
      <div className={"start-xs"}>
        <h4
          className={"sectionTitleCap"}
          style={{ color: themeColors.primary3Color }}
        >
          {title}
        </h4>
      </div>
    );
  }
  preciseRound(num, decimals = 2) {
    let sign = num >= 0 ? 1 : -1;
    return (
      Math.round(num * Math.pow(10, decimals) + sign * 0.001) /
      Math.pow(10, decimals)
    ).toFixed(decimals);
  }

  redirect() {
    AppActions.prevActiveStep();
    let { history } = this.props;
    history.push({ pathname: "/checkout/address" });
  }

  getFooterButtons() {
    let { themeColors } = this.props;
    return (
      <div className={"dialogFooter row end-xs"}>
        <div className={"footerDiv"}>
          <div className={"leftButton"}>
            <button
              onClick={this.redirect}
              className={"btn btn-primary"}
              style={{
                background: themeColors.primary1Color,
                color: themeColors.textColor,
                borderColor: themeColors.primary1Color
              }}
            >
              {"BACK"}
            </button>
          </div>
          <div className={"rightButton"}>
            <button
              onClick={this.validateUserInfo}
              className={"btn btn-primary"}
              style={{
                background: themeColors.primary1Color,
                color: themeColors.textColor,
                borderColor: themeColors.primary1Color
              }}
            >
              {"CONTINUE"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  render() {
    let { activeStep, history } = this.props;
    if (activeStep != 2) {
      history.push({ pathname: "/checkout/login" });
    }
    let { isMobile, invoice, themeColors, currency } = this.props,
      charges = [],
      { pathname } = this.props.location;
    invoice &&
      forIn(invoice.charges, (value, key) => {
        if (value)
          charges.push(
            <div className={"row invoiceCharges"} key={key}>
              <div className={"col-xs"} />
              {!isMobile && <div className={"col-xs"} />}
              <div
                className={
                  "col-xs-5 font90Pr start-xs contextSectionDescriptionColor"
                }
              >
                {key}
              </div>
              <div
                className={
                  "col-xs font90Pr end-xs contextSectionDescriptionColor"
                }
              >
                {`${currency} ${this.preciseRound(value)}`}
              </div>
            </div>
          );
      });
    return (
      <div className="row center-xs">
        <div className="col-xs-10 start-xs">
          <Collapse isOpened={this.state.collapse}>
            <div
              className={
                isMobile ? "box pad15Per" : "box summaryPane leftAlignIE"
              }
              style={{ marginTop: 5 }}
            >
              <div className="center-xs">
                <div
                  className="row"
                  style={{
                    color: themeColors.primary3Color,
                    padding: !isMobile && "0px 10px"
                  }}
                >
                  <div className={"col-xs font90Pr start-xs uppercase"}>
                    {isMobile ? "ITEM" : "PRODUCT"}
                  </div>
                  <div className={"col-xs font90Pr uppercase"}>
                    {isMobile ? "U.PRICE" : "UNIT PRICE"}
                  </div>
                  <div className={"col-xs font90Pr uppercase "}>
                    {isMobile ? "QTY" : "QUANTITY"}
                  </div>
                  <div className={"col-xs font90Pr uppercase "}>
                    {isMobile ? "DISC" : "DISCOUNT"}
                  </div>
                  <div className={"col-xs font90Pr uppercase end-xs"}>
                    {isMobile ? "AMT" : "AMOUNT"}
                  </div>
                </div>
                <div className={"divider"} />
                <div
                  className={isMobile ? "" : "overFlow25"}
                  style={{ padding: !isMobile && "0px 10px" }}
                >
                  {invoice &&
                    invoice.items.map(product => {
                      return (
                        <div className="row marBot10" key={product.id}>
                          <div
                            className={
                              isMobile
                                ? "col-xs start-xs tableLable font90Pr textEllipse"
                                : "col-xs start-xs tableLable font90Pr"
                            }
                          >
                            {product.name}
                          </div>
                          <div
                            className={"col-xs tableLable font90Pr"}
                          >{`${currency} ${this.preciseRound(
                            this.preciseRound(product.unitcost)
                          )}`}</div>
                          <div className={"col-xs tableLable  font90Pr"}>
                            {product.quantity}
                          </div>
                          <div className={"col-xs tableLable  font90Pr"}>
                            {(product.discount && `${product.discount}%`) || ""}
                          </div>
                          <div
                            className={"col-xs tableLable end-xs font90Pr"}
                          >{`${currency} ${this.preciseRound(
                            product.cost
                          )}`}</div>
                        </div>
                      );
                    })}
                </div>
                <div className={"marTop10 marBot20 divider"} />
                <div className="" style={{}}>
                  <div className={"row boldFonts invoiceCharges"}>
                    <div className={"col-xs"} />
                    {!isMobile && <div className={"col-xs"} />}
                    <div
                      className={
                        "col-xs-5 start-xs contextSectionDescriptionColor"
                      }
                    >
                      {"Sub total"}
                    </div>
                    <div
                      className={"col-xs end-xs contextSectionDescriptionColor"}
                    >
                      {`${currency} ${invoice &&
                        this.preciseRound(invoice.subtotal)}`}
                    </div>
                  </div>
                  {charges}
                  <div className={"marTop10 marBot20 divider"} />
                  <div className={"row boldFonts invoiceCharges"}>
                    <div className={"col-xs-5"} />
                    {!isMobile && <div className={"col-xs"} />}
                    <div
                      className={
                        "col-xs start-xs contextSectionDescriptionColor"
                      }
                    >
                      {"Order total"}
                    </div>
                    <div
                      className={"col-xs end-xs contextSectionDescriptionColor"}
                    >
                      {`${currency} ${invoice &&
                        this.preciseRound(invoice.net)}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
        <div className="col-xs-10 start-xs">{this.getFooterButtons()}</div>
      </div>
    );
  }
}

export default OrderSummary;
