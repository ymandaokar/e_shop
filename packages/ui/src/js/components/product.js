import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductLoader from "./loaders/Product.js";
import NoResult from "./empty-states/NoResults.js";
var Carousel = require("react-responsive-carousel").Carousel;
import "react-responsive-carousel/lib/styles/carousel.css";
import Counter from "./Counter";
import AppActions from "../actions/actions.js";
import AppStore from "../stores/store.js";
import { ThemeContext } from "../helpers/theme-context";
import { truncate } from "lodash-es";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLabel: "ADD TO CART",
      currentQuantity: 1
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    let self = this;
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
    let { id } = this.props.match.params;
    AppActions.loadProduct(id);
  }

  componentWillUnmount() {
    let self = this;
    this.unsubscribe();
  }

  addToCart(product, event) {
    event.stopPropagation();
    AppActions.addToCart(product, parseInt(this.state.currentQuantity));
    this.setState(
      {
        buttonLabel: "✔ ADDED",
        currentQuantity: 1
      },
      function() {
        setTimeout(() => {
          this.setState({
            buttonLabel: "ADD TO CART"
          });
        }, 2000);
      }
    );
  }

  handleUpdateQuantity(currentQuantity) {
    this.setState({ currentQuantity });
  }
  render() {
    if (!this.state.AppState) {
      return <ProductLoader />;
    }
    let { isMobile } = this.context,
      product = this.state.AppState.get("currentProduct"),
      organizationalConfig = this.state.AppState.get("organizationalConfig");
    if (!product) {
      return <NoResult />;
    }
    let {} = this.props,
      { currency, maxAllowQuantity } = organizationalConfig,
      { id, name, description, price, images } = product;
    return (
      <ThemeContext.Consumer>
        {themeColors => (
          <div
            className="quick-view"
            style={{ backgroundColor: "white", padding: "1px 10px" }}
          >
            <div className="row product-details">
              <div
                className={!isMobile ? "col-md-6" : ""}
                style={
                  isMobile
                    ? {
                        marginTop: 15
                      }
                    : {}
                }
              >
                <div className="product-img">
                  <div className={isMobile ? "" : "product-big-img"}>
                    {images && (
                      <Carousel
                        showArrows={!isMobile}
                        showThumbs={!isMobile}
                        swipeable={isMobile}
                      >
                        {images.map((image, i) => {
                          return (
                            <div key={i}>
                              <img src={image} />
                            </div>
                          );
                        })}
                      </Carousel>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 p40">
                <div className="product-name">
                  <span>
                    {" "}
                    {isMobile ? truncate(name, { length: 15 }) : name}
                  </span>
                </div>
                <div
                  className={
                    isMobile
                      ? "product-decription heightFix"
                      : "product-decription"
                  }
                >
                  <span> {description}</span>
                </div>
                <div
                  className={
                    isMobile ? "product-price zeroBottom" : "product-price"
                  }
                >
                  <span> {`${currency} ${price}`}</span>
                </div>
                <div
                  className={isMobile ? "row marBott10" : "row marBott15"}
                  style={
                    isMobile
                      ? {
                          zoom: 0.9
                        }
                      : {}
                  }
                >
                  {!isMobile && <div className="col-xs-4">Quantity </div>}
                  <div
                    className={isMobile ? "" : "col-xs"}
                    style={isMobile ? { width: "100%" } : {}}
                  >
                    <div className={isMobile ? "row center-xs" : "col-xs"}>
                      {
                        <Counter
                          disabled={false}
                          fromQuickView={true}
                          productQuantity={this.state.currentQuantity}
                          updateQuantity={this.handleUpdateQuantity.bind(this)}
                          resetQuantity={this.resetQuantity}
                          maxAllowQuantity={maxAllowQuantity}
                        />
                      }
                    </div>
                  </div>
                </div>
                <div
                  className={isMobile ? "row center-xs" : "row start-xs"}
                  style={
                    isMobile
                      ? {
                          zoom: 0.9
                        }
                      : {}
                  }
                >
                  <div className="col-xs">
                    <div className="">
                      <div className="btn-wrap bm-35">
                        <a
                          title="Add to cart"
                          className={"btn bdr addToCrdButton"}
                          style={
                            isMobile
                              ? {
                                  width: "100%",
                                  backgroundColor: themeColors.primary1Color,
                                  color: themeColors.textColor
                                }
                              : {
                                  backgroundColor: themeColors.primary1Color,
                                  color: themeColors.textColor
                                }
                          }
                          onClick={
                            this.state.buttonLabel != "ADD TO CART"
                              ? () => {}
                              : this.addToCart.bind(this, product)
                          }
                        >
                          {this.state.buttonLabel != "ADD TO CART" ? (
                            this.state.buttonLabel
                          ) : (
                            <span>
                              <i className="fa fa-shopping-cart" /> ADD TO CART
                            </span>
                          )}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

Product.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default Product;
