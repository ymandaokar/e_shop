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
import ScrollToTop from "./scrolltotop.js";
import Products from "./components/products.js";
import Product from "./components/product.js";
import SearchProduct from "./components/searchproduct.js";
import LandingPage from "./components/landingpage.js";
import Footer from "./components/Footer.js";
import { organisationalConfig } from "./helpers/appdata.js";
import { ThemeContext, themes } from "./helpers/theme-context";
import Avatar from "material-ui/Avatar";
const styles = {
  root: {
    flexGrow: 1,
    height: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  avatar: {
    width: 45,
    height: 45,
    marginRight: 10
  },
  toolbar: {
    padding: 0,
    minHeight: 40
  }
};

class App extends Component {
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
      <div className={classes.root}>
        <ThemeContext.Provider
          value={organisationalConfig.theme || themes.gray}
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
                      <Avatar
                        alt="Tofa"
                        src={organisationalConfig.logo}
                        className={classes.avatar}
                      />
                      <Typography
                        variant="title"
                        color="inherit"
                        className={classes.flex}
                      >
                        {organisationalConfig.title}
                      </Typography>
                      <IconButton aria-haspopup="true" color="inherit">
                        <AccountCircle />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                </div>
                <div className="appFrame">
                  <ScrollToTop location={this.props.location}>
                    <Switch>
                      <Route exact path="/" component={LandingPage} />
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
