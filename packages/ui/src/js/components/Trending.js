import React, { Component } from "react";
import Slider from "react-slick";
import ImageLoader from "./imageloader.js";
import ProductsViewerMobile from "./ProductsViewerMobile.js";
class SimpleSlider extends Component {
  getItem(product) {
    let { siteURL } = this.props;
    return (
      <div className="multiTile-Slick-item">
        <ImageLoader
          image={product.image.m}
          siteURL={siteURL}
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
  render() {
    let {
      items,
      siteURL,
      isMobile,
      settings: {
        buttonLabel,
        sectionTitle,
        noOfProductsToShow,
        noOfProductsToScroll
      },
      backgroundImage
    } = this.props;
    let settings = {
      infinite: true,
      speed: 200,
      slidesToShow: noOfProductsToShow,
      slidesToScroll: noOfProductsToScroll
    };
    return (
      <div>
        {!isMobile ? (
          <div className="row" style={{ height: 310 }}>
            <div className="col-xs-2 vertMiddle center-xs sectionBackground">
              <div className="">
                <div className="featuredTitle"> {sectionTitle}</div>
                <div className="">
                  <button type="button" className="btn btn-primary">
                    {buttonLabel}
                  </button>
                </div>
              </div>
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
          </div>
        )}
      </div>
    );
  }
}
export default SimpleSlider;
