import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper from "material-ui/Stepper/Stepper";
import Step from "material-ui/Stepper/Step";
import StepLabel from "material-ui/Stepper/StepLabel";
import StepContent from "material-ui/Stepper/StepContent";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import AppActions from "../actions/actions.js";
import AppStore from "../stores/store.js";
import { Switch, Route } from "react-router";
import Login from "./login.js";
import UserInformation from "./userInformation.js";
import OrderSummary from "./OrderSummary.js";
import { checkoutSteps } from "../appsettings.js";
import SwipeableViews from "react-swipeable-views";
const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 46
  },
  mobileRoot: {
    maxWidth: 400,
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: "darkgrey"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  stepper: {
    backgroundColor: "#f9f9f9"
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  mobileStepper: {
    backgroundColor: "#f9f9f9",
    padding: 5
  },
  stepperContaint: {
    padding: 0
  }
});

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { isMobile, theme } = this.context,
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
            <Route
              exact
              path="/checkout/login"
              render={props => <Login {...this.props} />}
            />
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
