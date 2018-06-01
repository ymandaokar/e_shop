import React, { Component } from "react";
import { forIn } from "lodash-es";

class OrderSummary extends Component {
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
  render() {
    let { isMobile, invoice, themeColors } = this.props,
      charges = [],
      { pathname } = this.props.location;
    invoice &&
      forIn(invoice.charges, (value, key) => {
        if (value)
          charges.push(
            <div className={"row"} key={key}>
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
                {`${this.props.currency} ${this.preciseRound(value)}`}
              </div>
            </div>
          );
      });
    return (
      <div
        className={isMobile ? "box pad15Per" : "box summaryPane leftAlignIE"}
        style={{ marginTop: 5 }}
      >
        <div className="">{this.getAppBarWithTitle("Order Summary")}</div>
        <div className={"marTop10 marBot20 divider"} />
        <div className="center-xs marTop20">
          <div
            className="row marBot20"
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
                      {product.productName}
                    </div>
                    <div
                      className={"col-xs tableLable font90Pr"}
                    >{`${product.currency ||
                      this.props.currency} ${this.preciseRound(
                      this.preciseRound(product.unitPrice)
                    )}`}</div>
                    <div className={"col-xs tableLable  font90Pr"}>
                      {product.quantity}
                    </div>
                    <div className={"col-xs tableLable  font90Pr"}>
                      {(product.discount && `${product.discount}%`) || ""}
                    </div>
                    <div
                      className={"col-xs tableLable end-xs font90Pr"}
                    >{`${product.currency ||
                      this.props.currency} ${this.preciseRound(
                      product.netPrice
                    )}`}</div>
                  </div>
                );
              })}
          </div>
          <div className={"marTop10 marBot20 divider"} />
          <div className="" style={{ padding: !isMobile && "0px 10px" }}>
            <div className={"row boldFonts"}>
              <div className={"col-xs"} />
              {!isMobile && <div className={"col-xs"} />}
              <div
                className={"col-xs-5 start-xs contextSectionDescriptionColor"}
              >
                {"Sub total"}
              </div>
              <div className={"col-xs end-xs contextSectionDescriptionColor"}>
                {`${this.props.currency} ${invoice &&
                  this.preciseRound(invoice.totalAmount)}`}
              </div>
            </div>
            {charges}
            <div className={"marTop10 marBot20 divider"} />
            <div className={"row boldFonts"}>
              <div className={"col-xs-5"} />
              {!isMobile && <div className={"col-xs"} />}
              <div className={"col-xs start-xs contextSectionDescriptionColor"}>
                {"Order total"}
              </div>
              <div className={"col-xs end-xs contextSectionDescriptionColor"}>
                {`${this.props.currency} ${invoice &&
                  this.preciseRound(invoice.net)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummary;
