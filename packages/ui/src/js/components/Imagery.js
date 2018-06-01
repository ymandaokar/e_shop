import React, { Component } from "react";
import Slider from "react-slick";
import ImageLoader from "./imageloader.js";
var Carousel = require("react-responsive-carousel").Carousel;

class Imagery extends Component {
  getImage({ isMobile, textColor, items, siteURL, patternUrl }) {
    return !isMobile ? (
      items.map((item, key) => (
        <div
          className="col-xs row imageryImg pointer marLR10 partionImage"
          style={{ backgroundImage: `url(${patternUrl})` }}
        >
          <div className="col-xs-7">
            <div className="partionImageDiv">
              <ImageLoader
                key={key}
                image={item.image.m}
                siteURL={siteURL}
                imageDimentions={{
                  height: isMobile ? 200 : 225,
                  width: "100%"
                }}
              />
            </div>
          </div>
          <div className="col-xs midWay">
            <div className="" style={{ width: "100%" }}>
              <div className="imageryTitlee" style={{ color: textColor }}>
                {item.title}
              </div>
              <div className="row center-xs">
                <div
                  className="imageryDivider"
                  style={{ width: "20%", borderColor: textColor }}
                />
              </div>
              <div className="imageryDesc" style={{ color: textColor }}>
                {item.category}
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="mobileCouresel">
        <Carousel
          showArrows={true}
          swipeable={true}
          showThumbs={false}
          className={"homeImagery"}
        >
          {items.map((item, key) => (
            <div
              className="row imageryImg pointer partionImage"
              style={{ backgroundImage: `url(${patternUrl})` }}
              key={key}
            >
              <div className="col-xs-7">
                <img
                  src={siteURL ? `${siteURL}/${item.image.m}` : item.image.m}
                  height={isMobile ? 200 : 225}
                  width="100%"
                />
              </div>
              <div className="col-xs midWay" style={{ marginRight: 20 }}>
                <div className="" style={{ width: "100%" }}>
                  <div className="imageryTitlee" style={{ color: textColor }}>
                    {item.title}
                  </div>
                  <div className="row center-xs">
                    <div
                      className="imageryDivider"
                      style={{ width: "20%", borderColor: textColor }}
                    />
                  </div>
                  <div className="imageryDesc" style={{ color: textColor }}>
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
  render() {
    let {
      items,
      siteURL,
      isMobile,
      settings: {
        noOfProductsToScroll,
        noOfProductsToShow,
        patternUrl,
        textColor
      }
    } = this.props;
    if (!patternUrl) {
      patternUrl = "./extern/imagery_background.jpg";
    } else {
      patternUrl = siteURL + patternUrl;
    }
    return (
      <div>
        <div
          className=""
          style={{ margin: "0px -5px", height: isMobile ? 225 : 250 }}
        >
          <div className="row" style={{ margin: isMobile ? "" : "0px 10px" }}>
            {this.getImage({ isMobile, items, siteURL, patternUrl, textColor })}
          </div>
        </div>
      </div>
    );
  }
}
export default Imagery;
