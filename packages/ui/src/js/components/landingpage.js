import React, { Component } from "react";
import PropTypes from "prop-types";

class LandingPage extends Component {
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
    return <div className="parentofALL">{"LandingPage"}</div>;
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

LandingPage.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default LandingPage;
