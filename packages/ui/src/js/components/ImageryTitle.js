import React, { Component } from "react";
import Slider from "react-slick";
import ImageLoader from "./imageloader.js";
var Carousel = require("react-responsive-carousel").Carousel;
class ImageryTitle extends Component {
  render() {
    let {
      items,
      isMobile,
      siteURL,
      noOfProductsToScroll,
      noOfProductsToShow,
      sectionTitle
    } = this.props;
    const settings = !isMobile
      ? {
          infinite: true,
          // autoplay: true,
          pauseOnHover: true,
          speed: 100,
          slidesToShow: noOfProductsToShow,
          slidesToScroll: noOfProductsToScroll
        }
      : {
          infinite: true,
          centerMode: true,
          //autoplay: true,
          arrows: false,
          pauseOnHover: true,
          speed: 100,
          slidesToShow: noOfProductsToShow,
          slidesToScroll: noOfProductsToScroll
        };
    return (
      <div>
        <div
          className="containerDiv"
          style={{ margin: "0px -5px", height: 330 }}
        >
          <div className="start-xs imageryTitle">{sectionTitle}</div>
          {!isMobile ? (
            <div className="ImageryTiles heroSlider">
              <Slider {...settings}>
                {items.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="imageryImgTitle ImageryTile pointer"
                    >
                      <ImageLoader
                        image={item.image.m}
                        siteURL={siteURL}
                        imageDimentions={{
                          height: 250,
                          width: "100%"
                        }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          ) : (
            <div className="">
              <div
                className="mobileCouresel titlesImagery"
                style={{ margin: "0px 10px" }}
              >
                <Carousel
                  showArrows={true}
                  swipeable={true}
                  showThumbs={false}
                  className={"homeImagery"}
                >
                  {items.map((item, key) => (
                    <div key={key} className="row pointer">
                      <div className="">
                        <img
                          src={
                            siteURL
                              ? `${siteURL}/${item.image.m}`
                              : item.image.m
                          }
                          height={250}
                          width="100%"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ImageryTitle;
