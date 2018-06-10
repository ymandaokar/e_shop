import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Checkbox from "material-ui/Checkbox";
import CheckBoxOutlineBlankIcon from "material-ui-icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "material-ui-icons/CheckBox";
import green from "material-ui/colors/green";
import cyan from "material-ui/colors/cyan";
import indigo from "material-ui/colors/indigo";
const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 46
  },
  flex: {
    flex: 1
  },
  control: {
    marginLeft: -9,
    marginRight: -7,
    marginTop: -1
  },
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: "110%"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    marginTop: 8,
    width: "100%",
    color: "white",
    backgroundColor: cyan[500],
    "&:hover": {
      backgroundColor: cyan[700]
    }
  },
  loginButton: {
    marginTop: 8,
    width: "100%",
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  input: {
    display: "none"
  },
  size: {
    height: 0,
    width: 30
  },
  sizeIcon: {
    fontSize: 20
  }
});
class Login extends Component {
  render() {
    let { classes } = this.props;
    return (
      <div className={`row center-xs`}>
        <div className={`col-xs-8`}>
          <div className={`box centerItem`}>
            <div className={`row loginPage`}>
              <div className={`col-xs-6 rightBar`}>
                <div className={`box`}>
                  <div className="textInput">
                    <TextField
                      label="Username"
                      id="bootstrap-input"
                      style={{ width: "100%" }}
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.bootstrapRoot,
                          input: classes.bootstrapInput
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel
                      }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      label="Password"
                      id="bootstrap-input"
                      style={{ width: "100%" }}
                      InputProps={{
                        type: "password",
                        disableUnderline: true,
                        classes: {
                          root: classes.bootstrapRoot,
                          input: classes.bootstrapInput
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel
                      }}
                    />
                  </div>
                  <div className="textInput">
                    <Button color="primary" className={classes.loginButton}>
                      Sign In
                    </Button>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="box">
                        <FormControlLabel
                          className={classes.control}
                          control={
                            <Checkbox
                              className={classes.size}
                              icon={
                                <CheckBoxOutlineBlankIcon
                                  className={classes.sizeIcon}
                                />
                              }
                              checkedIcon={
                                <CheckBoxIcon className={classes.sizeIcon} />
                              }
                              value="checkedI"
                            />
                          }
                          label="Remember me"
                        />
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <div
                        className="box"
                        style={{ fontSize: "90%", padding: 1 }}
                      >
                        <a href="#" style={{ color: indigo[500] }}>
                          forgot password
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-xs-6`}>
                <div className={`box`}>
                  <div className="socialLoginSection">
                    <a href="#" style={{ color: indigo[500] }}>
                      Don't have an account? Sign up!
                    </a>
                    <button class="loginBtn loginBtn--facebook">
                      Login with Facebook
                    </button>

                    <button class="loginBtn loginBtn--google">
                      Login with Google
                    </button>
                    <div className="">
                      <Button color="primary" className={classes.button}>
                        Continue as Guest
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

Login.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default withStyles(styles)(Login);
