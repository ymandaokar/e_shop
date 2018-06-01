import React, { Component } from "react";
import SimpleSlider from "./Simpleslider.js";
import Featured from "./Featured.js";
import Trending from "./Trending.js";
import Imagery from "./Imagery.js";
import ImageryTitle from "./ImageryTitle.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Appdata from "../helpers/appdata.js";
import "../../styles/homestyles.css";
let {
  FeaturedData,
  ImageryData,
  TitledImageryData,
  HeroData,
  TrendingData
} = Appdata;
//expireTime in ISO string
class Home extends Component {
  constructor() {
    super();
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  handleCategoryClick() {
    let { location, history } = this.props;
    history.push("/store");
  }
  render() {
    let { isMobile, categories } = this.props;
    return (
      <div className="parentofAll grayColorBack">
        <div className="row center-xs" style={{ background: "#fcf9f9b5" }}>
          <div
            className={"col-xs-12 maxWidth"}
            style={
              isMobile
                ? {
                    overflow: "hidden",
                    overflowY: "auto"
                  }
                : {}
            }
          >
            <div className="homeCatParent">
              {categories &&
                !!categories.length && (
                  <div className="">
                    {categories.map(category => {
                      return (
                        <div className="homeCategory" key={category.Code}>
                          <button
                            className="btn-link homeCatButton"
                            onClick={this.handleCategoryClick}
                          >
                            {category.Name}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
            <div className={!isMobile ? "marTB20" : "marBot20"}>
              <SimpleSlider
                items={HeroData.items}
                siteURL={""}
                isMobile={isMobile}
              />
            </div>
            <div className="marTB20">
              <Imagery
                items={ImageryData.items}
                settings={ImageryData.categorySettings["Imagery"]}
                siteURL={""}
                isMobile={isMobile}
              />
            </div>
            <div className={isMobile ? "" : "mar20"}>
              <ImageryTitle
                items={TitledImageryData.items}
                siteURL={""}
                sectionTitle={TitledImageryData.title}
                isMobile={isMobile}
                noOfProductsToShow={3}
                noOfProductsToScroll={1}
              />
            </div>
            <div className={isMobile ? "" : "mar20"}>
              <Featured
                items={FeaturedData.items}
                settings={FeaturedData.categorySettings["Featured"]}
                siteURL={""}
                isMobile={isMobile}
                backgroundImage={
                  FeaturedData.categorySettings["Featured"].backgroundImageMob
                }
              />
            </div>
            <div className={isMobile ? "" : "mar20"}>
              <Trending
                items={TrendingData.items}
                settings={TrendingData.categorySettings["Trending"]}
                siteURL={""}
                isMobile={isMobile}
                backgroundImage={
                  TrendingData.categorySettings["Trending"].backgroundImageMob
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
