import React, { Component } from "react";

const LoadingProduct = ({ isMobile }) => {
  return (
    <div
      className={isMobile ? "product loading center-xs" : "product loading"}
      style={
        isMobile ? { display: "inline-block" } : { display: "inline-block" }
      }
    >
      <div className="product-image" />
      <div className="product-text" />
      <div className="product-text" />
      <div className="product-text" />
      <div className="product-button" />
    </div>
  );
};

export default LoadingProduct;
