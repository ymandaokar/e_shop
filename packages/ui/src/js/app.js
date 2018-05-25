import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Tooltip from "material-ui/Tooltip";
import Settings from "material-ui-icons/Settings";
import AppActions from "./actions/actions.js";
import AppStore from "./stores/store.js";
import ScrollToTop from "./scrolltotop.js";
import Products from "./components/products.js";
import Product from "./components/product.js";
import SearchProduct from "./components/searchproduct.js";
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

class App extends React.Component {
  constructor() {
    super();
    this.state = { AppState: null };
  }
  getChildContext() {
    return { isMobile: this.props.isMobile, isShort: this.props.isShort };
  }
  componentDidMount() {
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleHome() {
    let history = this.props.history;
    history.push({ pathname: `/` });
  }
  render() {
    let { classes } = this.props;
    return (
      <div style={{}}>
        <div className="appFrame">
          <ScrollToTop location={this.props.location}>
            <Switch>
              <Route exact path="/" component={Products} />
              <Route exact path="/products" component={Products} />
              <Route
                exact
                path="/products/search/:key"
                component={SearchProduct}
              />
              <Route path="/products/:id" component={Product} />
            </Switch>
          </ScrollToTop>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

App.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

module.exports = withStyles(styles)(App);
