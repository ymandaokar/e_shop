import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import AccountCircle from "material-ui-icons/AccountCircle";
import Tooltip from "material-ui/Tooltip";
import Settings from "material-ui-icons/Settings";
import AppActions from "./actions/actions.js";
import AppStore from "./stores/store.js";
import AuthActions from "./actions/authactions.js";
import AuthStore from "./stores/authstore.js";
import ScrollToTop from "./scrolltotop.js";
import Products from "./components/products.js";
import LandingPage from "./components/landingpage.js";
import Footer from "./components/Footer.js";
import { ThemeContext, themes } from "./helpers/theme-context";
import Avatar from "material-ui/Avatar";
import ShoppingCart from "material-ui-icons/ShoppingCart";
import Cart from "./components/cart.js";
import Checkout from "./components/checkout.js";
import UserProfile from "./components/userprofile.js";
const styles = {
  root: {
    flexGrow: 1,
    height: "100%"
  },
  flex: {
    flex: 1,
    cursor: "pointer"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  avatar: {
    width: 45,
    height: 45,
    marginRight: 10,
    cursor: "pointer"
  },
  toolbar: {
    padding: 0,
    minHeight: 40
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = { Auth: null, AppState: null, openDrawer: false };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  toggleDrawer() {
    let { openDrawer } = this.state;
    this.setState({ openDrawer: !openDrawer });
  }
  getChildContext() {
    return { isMobile: this.props.isMobile, isShort: this.props.isShort };
  }
  componentDidMount() {
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
    AppActions.loadData();
    this.unsubscribeAuth = AuthStore.listen(state =>
      this.setState({ Auth: state })
    );
    AuthActions.triggerState();
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeAuth();
  }
  handleHome() {
    let history = this.props.history;
    history.push({ pathname: `/products` });
  }
  render() {
    let { classes, isMobile, location } = this.props,
      organizationalConfig =
        (this.state.AppState &&
          this.state.AppState.get("organizationalConfig")) ||
        {},
      categories = this.state.AppState && this.state.AppState.get("categories"),
      cartItems = this.state.AppState && this.state.AppState.get("cartItems"),
      activeStep =
        (this.state.AppState && this.state.AppState.get("activeStep")) || 0,
      shippingAddress =
        this.state.AppState && this.state.AppState.get("shippingAddress"),
      invoice = this.state.AppState && this.state.AppState.get("invoice"),
      auth = this.state.Auth && this.state.Auth.toJSON(),
      userInfo =
        (this.state.AppState && this.state.AppState.get("userInfo")) || {};
    return (
      <div className={classes.root}>
        <ThemeContext.Provider
          value={organizationalConfig.theme || themes.purple}
        >
          <ThemeContext.Consumer>
            {themeColors => (
              <div style={{ height: "100%" }}>
                <div>
                  <AppBar
                    style={{
                      backgroundColor: themeColors.primary1Color,
                      color: themeColors.textColor
                    }}
                  >
                    <Toolbar className={classes.toolbar}>
                      {isMobile && (
                        <IconButton
                          className={classes.menuButton}
                          color="inherit"
                          aria-label="Menu"
                          onClick={this.toggleDrawer}
                        >
                          <MenuIcon />
                        </IconButton>
                      )}
                      <Avatar
                        alt="Tofa"
                        src={organizationalConfig.logo}
                        className={classes.avatar}
                        onClick={this.handleHome.bind(this)}
                      />
                      <Typography
                        variant="title"
                        color="inherit"
                        className={classes.flex}
                        onClick={this.handleHome.bind(this)}
                      >
                        {organizationalConfig.title}
                      </Typography>
                      {location.pathname.indexOf("checkout") == -1 && (
                        <Cart
                          {...this.props}
                          themeColors={themeColors}
                          isMobile={isMobile}
                          cartItems={cartItems}
                          currency={organizationalConfig.currency}
                        />
                      )}
                      {/* <IconButton aria-haspopup="true" color="inherit">
                        <AccountCircle />
                      </IconButton> */}
                      <UserProfile auth={auth} />
                    </Toolbar>
                  </AppBar>
                </div>
                <div
                  className="appFrame fullHeight"
                  style={{ backgroundColor: "#d3d3d324" }}
                >
                  <ScrollToTop location={this.props.location}>
                    <Switch>
                      <Route exact path="/" component={LandingPage} />
                      <Route
                        path="/products"
                        render={props => (
                          <Products
                            {...this.props}
                            categories={categories}
                            openDrawer={this.state.openDrawer}
                            toggleDrawer={this.toggleDrawer.bind(this)}
                          />
                        )}
                      />
                      <Route
                        path="/checkout"
                        render={props => (
                          <Checkout
                            {...this.props}
                            themeColors={themeColors}
                            activeStep={activeStep}
                            shippingAddress={shippingAddress}
                            invoice={invoice}
                            userInfo={userInfo}
                            currency={organizationalConfig.currency}
                            auth={auth}
                          />
                        )}
                      />
                    </Switch>
                  </ScrollToTop>
                </div>
                <div>
                  <Footer themeColors={themeColors} />
                </div>
              </div>
            )}
          </ThemeContext.Consumer>
        </ThemeContext.Provider>
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
