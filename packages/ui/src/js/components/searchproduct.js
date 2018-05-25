import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchProduct extends Component {
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
    return <div>{"SearchProduct"}</div>;
  }
}

SearchProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

SearchProduct.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default SearchProduct;
