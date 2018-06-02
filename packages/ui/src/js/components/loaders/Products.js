import React, { Component } from "react";
import Product from "./Product";

class LoadingProducts extends Component {
  render() {
    let { isMobile } = this.props;
    return (
      <div style={{ marginTop: isMobile && 40 }}>
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
        <Product isMobile={isMobile} />
      </div>
    );
  }
}

export default LoadingProducts;
