import React, { Component } from "react";
import PropTypes from "prop-types";

class Product extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return <div>{"Product"}</div>;
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired
};

Product.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default Product;
