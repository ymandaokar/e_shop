import React, { Component } from "react";
import PropTypes from "prop-types";

class Products extends Component {
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
    return <div>{"Products"}</div>;
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
};

Products.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default Products;
