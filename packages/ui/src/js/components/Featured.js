import React, { Component } from "react";
import Slider from "react-slick";
import timediff from "timediff";
import ImageLoader from "./imageloader.js";
import ProductsViewerMobile from "./ProductsViewerMobile.js";
class SimpleSlider extends Component {
  constructor() {
    super();
    this.state = { expireTime: "" };
  }
  padZero(number) {
    return parseInt(number) < 10 && parseInt(number) >= 0
      ? `0${number}`
      : number;
  }
  componentDidMount() {
    let {
      settings: { expireTime }
    } = this.props;
    setInterval(() => {
      let dateDiff = timediff(new Date(), new Date(expireTime));
      this.setState({
        expireTime: `${this.padZero(dateDiff.hours)} : ${this.padZero(
          dateDiff.minutes
        )} : ${this.padZero(dateDiff.seconds)}`
      });
    }, 1000);
  }
  getTimeRemail(expireTime) {
    return <div className="timeRemail">{expireTime}</div>;
  }
  getItem(product) {
    let { siteURL } = this.props;
    return (
      <div className="multiTile-Slick-item">
        <ImageLoader
          image={product.image.m}
          siteURL={""}
          imageDimentions={{
            height: 150,
            width: "100%"
          }}
        />
        <div className="productDesc">
          <div className="fea-product-title"> {product.title}</div>
          <div className="fea-product-desc"> {product.description}</div>
          <div className="fea-product-category"> {product.category}</div>
        </div>
      </div>
    );
  }
  getLeftMenu({ sectionTitle, expireTime, buttonLabel }) {
    return (
      <div className="">
        <div className="featuredTitle"> {sectionTitle}</div>
        <div className="row center-xs">
          <div className="clockIcon">
            <i class="fa fa-clock-o" aria-hidden="true" />
          </div>
          <div className="">{this.getTimeRemail(expireTime)} </div>
        </div>
        <div className="">
          <button type="button" class="btn btn-primary">
            {buttonLabel}
          </button>
        </div>
      </div>
    );
  }
  render() {
    let {
      items,
      siteURL,
      settings: { buttonLabel, sectionTitle, noOfProductsToShow },
      isMobile,
      backgroundImage
    } = this.props;
    let settings = {
      infinite: true,
      speed: 200,
      slidesToShow: noOfProductsToShow,
      slidesToScroll: noOfProductsToShow
    };
    let { expireTime } = this.state;
    return (
      <div>
        {!isMobile ? (
          <div className="row" style={{ height: 310 }}>
            <div className="col-xs-2 vertMiddle center-xs sectionBackground">
              {this.getLeftMenu({ sectionTitle, expireTime, buttonLabel })}
            </div>
            <div className="col-xs-10 containerDivSpecial">
              <div className="row center-xs ">
                <div className="sliderDiv">
                  <Slider {...settings}>
                    {items.map((item, key) => {
                      return <div key={key}>{this.getItem(item)}</div>;
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <ProductsViewerMobile
              siteURL={siteURL}
              title={sectionTitle}
              description={
                "You will get additional discounts on the following products."
              }
              items={items}
              buttonLabel={buttonLabel}
              backgroundImage={backgroundImage}
            />
          </div>
        )}
      </div>
    );
  }
}
export default SimpleSlider;
