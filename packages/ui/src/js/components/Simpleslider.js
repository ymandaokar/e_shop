import React, { Component } from "react";
import Slider from "react-slick";
import ImageLoader from "./imageloader.js";
class SimpleSlider extends Component {
  getImage({ isMobile, item, siteURL, key }) {
    return isMobile ? (
      <div className="mobileImage">
        <ImageLoader
          isMobile={isMobile}
          disableZoom={true}
          key={key}
          image={item.image.s}
          siteURL={siteURL}
          imageDimentions={{
            height: 200,
            width: "100%"
          }}
        />
      </div>
    ) : (
      <ImageLoader
        isMobile={isMobile}
        disableZoom={true}
        key={key}
        image={item.image.l}
        siteURL={siteURL}
        imageDimentions={{
          height: 300,
          width: "100%"
        }}
      />
    );
  }
  render() {
    let { items, siteURL, isMobile } = this.props,
      settings = !isMobile
        ? {
            infinite: true,
            // autoplay: true,
            pauseOnHover: true,
            speed: 100,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        : {
            infinite: true,
            centerMode: true,
            //autoplay: true,
            arrows: false,
            pauseOnHover: true,
            speed: 100,
            slidesToShow: 1,
            slidesToScroll: 1
          };
    return (
      <div>
        <div
          className="row center-xs sliderparent "
          style={{ height: isMobile ? 200 : 300, background: "lightgray" }}
        >
          <div className="sliderDiv heroSlider">
            <Slider {...settings}>
              {items &&
                items.map((item, key) => {
                  return (
                    <div key={key} className="simple-Slick-item">
                      {this.getImage({ isMobile, item, siteURL, key })}
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
export default SimpleSlider;
