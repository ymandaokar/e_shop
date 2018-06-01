import React, { Component } from "react";
import * as Vibrant from "node-vibrant";
class ProductsViewerMobile extends Component {
  constructor() {
    super();
    this.state = { backgroundColor: "" };
  }
  getItem(item) {
    let { siteURL } = this.props;
    return (
      <div className="mobileGridItem">
        <div className="">
          <img
            src={siteURL ? `${siteURL}/${item.image.m}` : item.image.m}
            height={120}
            width="100%"
          />
        </div>
        <div className="">
          <div className="productDesc">
            <div className="fea-product-title"> {item.title}</div>
            <div className="fea-product-desc">{item.description}</div>
            <div className="fea-product-category">{item.category}</div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let { backgroundImage } = this.props;
    Vibrant.from(backgroundImage).getPalette((err, palette) => {
      let { r, g, b } = palette.Vibrant;
      this.setState({ backgroundColor: `${r},${g},${b}` });
    });
  }
  render() {
    let {
        title,
        description,
        items,
        buttonLabel,
        siteURL,
        backgroundImage
      } = this.props,
      { backgroundColor } = this.state;
    return (
      <div
        className=""
        style={{
          backgroundColor: `rgb(${backgroundColor})`,
          marginBottom: 20,
          paddingBottom: 5
        }}
      >
        <div
          className="gridTitle"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        >
          <div className="row mar15">
            <div
              className="start-xs vertMiddle gridTitleFonts"
              style={{ color: backgroundImage && "white" }}
            >
              {title}
            </div>
            <div className="col-xs end-xs">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  background: backgroundImage && "white",
                  color: backgroundImage && `rgb(${backgroundColor})`
                }}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </div>
        <div className="mobileGrid mar15">
          <div className="grids">
            <div className="row">
              <div className="col-xs-6 borderRight" style={{ paddingRight: 0 }}>
                {items[0] && this.getItem(items[0])}
              </div>
              <div className="col-xs-6" style={{ paddingLeft: 0 }}>
                {items[1] && this.getItem(items[1])}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 borderRight" style={{ paddingRight: 0 }}>
                {items[2] && this.getItem(items[2])}
              </div>
              <div className="col-xs-6" style={{ paddingLeft: 0 }}>
                {items[3] && this.getItem(items[3])}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsViewerMobile;
