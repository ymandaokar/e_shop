import React, { Component } from "react";
import ImageLoader from "react-imageloader";
import LazyLoad from "react-lazyload";
import { SyncLoader } from "react-spinners";
import ContentLoader from "react-content-loader";
class MyImageLoader extends Component {
  preloader() {
    return <div className=""> </div>;
  }
  render() {
    let { siteURL, image, imageDimentions, altText, disableZoom } = this.props;
    return !disableZoom ? (
      <LazyLoad height={200}>
        <div className="img-wrapper">
          <ImageLoader
            src={siteURL ? `${siteURL}/${image}` : image}
            wrapper={React.createFactory("div")}
            style={imageDimentions}
            preloader={this.preloader}
          >
            {altText || "Image failed to load"}
          </ImageLoader>
        </div>
      </LazyLoad>
    ) : (
      <LazyLoad height={200}>
        <ImageLoader
          src={siteURL ? `${siteURL}/${image}` : image}
          wrapper={React.createFactory("div")}
          style={imageDimentions}
          preloader={this.preloader}
        >
          {altText || "Image failed to load"}
        </ImageLoader>
      </LazyLoad>
    );
  }
}

export default MyImageLoader;
