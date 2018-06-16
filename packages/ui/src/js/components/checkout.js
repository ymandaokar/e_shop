import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper from "material-ui/Stepper/Stepper";
import Step from "material-ui/Stepper/Step";
import StepLabel from "material-ui/Stepper/StepLabel";
import Button from "material-ui/Button";
import AppActions from "../actions/actions.js";
import AppStore from "../stores/store.js";
import { Switch, Route } from "react-router";
import Login from "./login.js";
import UserInformation from "./userInformation.js";
import OrderSummary from "./OrderSummary.js";
import { checkoutSteps } from "../appsettings.js";
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
  },
  stepper: {
    backgroundColor: "#f9f9f9"
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
    // AppActions.triggerState();
  }

  componentWillUnmount() {
    // let self = this;
    //this.unsubscribe();
  }

  render() {
    let { isMobile } = this.context,
      { themeColors, classes, activeStep } = this.props;
    return (
      <div style={{ height: "100%" }}>
        <div className="" style={{ marginTop: 55 }}>
          <Stepper
            className={classes.stepper}
            activeStep={activeStep}
            alternativeLabel
          >
            {checkoutSteps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Switch>
            <Route exact path="/checkout/login" component={Login} />
            <Route
              exact
              path="/checkout/address"
              render={props => <UserInformation {...this.props} />}
            />
            <Route
              exact
              path="/checkout/ordersummary"
              render={props => <OrderSummary {...this.props} />}
            />
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
