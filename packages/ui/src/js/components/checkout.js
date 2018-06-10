import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppActions from "../actions/actions.js";
//import AppStore from "../stores/store.js";
import { Switch, Route } from "react-router";
import Login from "./login.js";
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

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // let self = this;
    // this.unsubscribe = AppStore.listen(state =>
    //   this.setState({ AppState: state })
    // );
  }

  componentWillUnmount() {
    // let self = this;
    // this.unsubscribe();
  }

  render() {
    // if (!this.state.AppState) {
    //   return <div />;
    // }
    let { isMobile } = this.context,
      { themeColors } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <div className="" style={{ marginTop: 55 }}>
          <Switch>
            <Route exact path="/checkout/login" component={Login} />
            <Route exact path="/checkout/address" component={Login} />
            <Route exact path="/checkout/payment" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

Checkout.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};
export default withStyles(styles)(Checkout);
