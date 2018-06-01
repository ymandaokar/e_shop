import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Home from "./Home.js";
import Categories from "./categories.js";
import AppActions from "../actions/actions.js";
import AppStore from "../stores/store.js";
const styles = {
  root: {
    flexGrow: 1,
    minHeight: 46
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let self = this;
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
    AppActions.loadData();
  }

  componentWillUnmount() {
    let self = this;
    this.unsubscribe();
  }

  render() {
    if (!this.state.AppState) {
      return <div />;
    }
    let { isMobile } = this.context,
      categories = this.state.AppState.get("categories");
    return (
      <div>
        <Categories categories={categories} isMobile={isMobile} />
        <Home isMobile={isMobile} />
      </div>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired
};

Products.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};
export default withStyles(styles)(Products);
