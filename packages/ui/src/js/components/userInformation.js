import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppStore from "../stores/store.js";
import AppActions from "../actions/actions.js";
import { trim } from "lodash-es";
import { Collapse } from "react-collapse";
import { ThemeContext, themes } from "../helpers/theme-context";
import Radium from "radium";
import TextField from "material-ui/TextField";
const styles = theme => ({
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
  }
});
class UserInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: null,
      isOpened: false,
      showMore: true
    };
    this.validateUserInfo = this.validateUserInfo.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
    AppActions.triggerState();
  }
  getAppBarWithTitle(title) {
    let { themeColors } = this.props;
    return (
      <div className={"start-xs"}>
        <h4
          className={"sectionTitleCap"}
          style={{ color: themeColors.primary3Color }}
        >
          {title}
        </h4>
      </div>
    );
  }
  validateUserInfo() {
    let { user, userInfo, shippingAddress } = this.props;
    if (user && shippingAddress) {
      AppActions.processInvoice();
      return;
    }
    if (!userInfo.fullName) {
      this.fullName && this.fullName.focus();
      return;
    }
    if (!user) {
      if (!userInfo.email) {
        this.email && this.email.focus();
        return;
      } else {
        if (!this.validateEmail(userInfo.email)) {
          this.setState({ emailError: "enter valid email" });
          this.email && this.email.focus();
          return;
        }
      }
    }
    if (!userInfo.mobileNo) {
      this.mobileNo && this.mobileNo.focus();
      return;
    }
    if (!userInfo.placeFirst) {
      this.placeFirst && this.placeFirst.focus();
      return;
    }
    if (!userInfo.city) {
      this.city && this.city.focus();
      return;
    }
    if (!userInfo.state) {
      this.state && this.state.focus();
      return;
    }
    if (!userInfo.country) {
      this.country && this.country.focus();
      return;
    }
    if (!userInfo.pinCode) {
      this.pinCode && this.pinCode.focus();
      return;
    }
    this.setState({ emailError: "" });
    AppActions.processInvoice();
  }
  handleFormChange(key, event) {
    let { value } = event.target;
    if (key == "email" && value) {
      let validEmail = this.validateEmail(value);
      validEmail
        ? this.setState({ emailError: "" })
        : this.setState({ emailError: "enter valid email" });
    }
    AppActions.handleUserInfoChange(key, event.target.value);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
  }
  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  getFooterButtons() {
    let { themeColors } = this.props;
    return (
      <div className={"dialogFooter row end-xs"}>
        <div className={"footerDiv"}>
          <div className={"leftButton"}>
            <button
              onClick={this.redirect}
              className={"btn btn-primary"}
              style={{
                background: themeColors.primary1Color,
                color: themeColors.textColor,
                borderColor: themeColors.primary1Color
              }}
            >
              {"BACK"}
            </button>
          </div>
          <div className={"rightButton"}>
            <button
              onClick={this.validateUserInfo}
              className={"btn btn-primary"}
              style={{
                background: themeColors.primary1Color,
                color: themeColors.textColor,
                borderColor: themeColors.primary1Color
              }}
            >
              {"DELIVER HERE"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  redirect() {
    let { history } = this.props;
    AppActions.resetActiveStep();
    history.replace({ pathname: `/products` });
  }
  handleAddNewAddress() {
    AppActions.setShippingAddress(null);
    this.setState({ isOpened: !this.state.isOpened });
  }
  handleAddressChange(currentAddress) {
    this.setState({ isOpened: false });
    AppActions.setShippingAddress(currentAddress);
  }
  handleShowMore() {
    this.setState({ showMore: false });
  }
  render() {
    let {
        isMobile,
        fetchingUser,
        user,
        themeColors,
        classes,
        shippingAddress,
        userShipmentAddresses,
        userInfo
      } = this.props,
      shipmentAddresses = [];
    if (fetchingUser) {
      return <div className="dialogContents" />;
    }
    if (shippingAddress) {
      let { FullName, AddressLine, City, State, PostalCode } = shippingAddress;
      let userDetails = {
          AddressLine,
          City,
          State,
          PostalCode
        },
        finalAddressLine = "";
      for (const key in userDetails) {
        if (userDetails[key]) {
          finalAddressLine = `${finalAddressLine}, ${userDetails[key]}`;
        }
      }
      shippingAddress = trim(finalAddressLine, ",");
    }
    if (userShipmentAddresses) {
      shipmentAddresses = userShipmentAddresses;
    }
    //console.log("shipmentAddresses", shipmentAddresses);
    let tempshipmentAddresses =
      shipmentAddresses.length > 2 && this.state.showMore
        ? shipmentAddresses.slice(0, 2)
        : shipmentAddresses;
    //console.debug("userInfo", userInfo);
    return (
      <div className="row center-xs">
        <div className="col-xs-10 start-xs">
          <div className={!isMobile ? "shippingPane" : ""}>
            {!!user &&
              (!!tempshipmentAddresses.length ? (
                <div className="">
                  <div
                    className={
                      !isMobile
                        ? "subTitleShipping row middle-xs  uppercase font90Pr"
                        : "row middle-xs marTop20  uppercase font90Pr"
                    }
                    style={
                      !isMobile
                        ? { marginTop: 4, color: themeColors.primary3Color }
                        : { color: themeColors.primary3Color }
                    }
                  >
                    <span>{"Pick a Delivery address"}</span>
                  </div>
                  <div className="marTop10">
                    {tempshipmentAddresses.map((currentAddress, index) => {
                      let {
                        FullName,
                        Phone,
                        AddressLine,
                        City,
                        State,
                        PostalCode
                      } = currentAddress;
                      let userDetails = {
                          AddressLine,
                          City,
                          State,
                          PostalCode
                        },
                        finalAddressLine = "";
                      for (const key in userDetails) {
                        if (userDetails[key]) {
                          finalAddressLine = `${finalAddressLine}, ${
                            userDetails[key]
                          }`;
                        }
                      }
                      finalAddressLine = trim(finalAddressLine, ",");
                      return finalAddressLine == shippingAddress ? (
                        <div
                          className="radioButton radioButton1 leftAlignIE"
                          key={index}
                          onClick={this.handleAddressChange.bind(
                            this,
                            currentAddress
                          )}
                        >
                          <input type="radio" name="optradio" checked />
                          <label className="radio-label">
                            <div className="custPriDetails">
                              <span className="custName">{FullName}</span>
                              <span className="custNo">{Phone}</span>
                            </div>
                            <div className="custAddress">
                              {finalAddressLine}
                            </div>
                            <div className="smallDivider" />
                          </label>
                        </div>
                      ) : (
                        <div
                          className="radioButton radioButton1 leftAlignIE"
                          key={index}
                          onClick={this.handleAddressChange.bind(
                            this,
                            currentAddress
                          )}
                        >
                          <input type="radio" name="optradio" />
                          <label className="radio-label">
                            <div className="custPriDetails">
                              <span className="custName">{FullName}</span>
                              <span className="custNo">{Phone}</span>
                            </div>
                            <div className="custAddress">
                              {finalAddressLine}
                            </div>
                            <div className="smallDivider" />
                          </label>
                        </div>
                      );
                    })}
                    {this.state.showMore &&
                      shipmentAddresses.length > 2 && (
                        <div
                          className="showMore"
                          onClick={this.handleShowMore.bind(this)}
                        >
                          <div
                            className="showMoreDiv"
                            style={{ color: themeColors.primary3Color }}
                          >{`show ${shipmentAddresses.length -
                            2} more addresses`}</div>
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div />
              ))}
            <div className="">
              {user &&
                !!shipmentAddresses.length &&
                (this.state.isOpened ? (
                  <div
                    className="radioButton marTop15 leftAlignIE"
                    onClick={this.handleAddNewAddress.bind(this)}
                    style={{ color: themeColors.primary3Color }}
                  >
                    <input type="radio" name="optradio" checked />
                    <label className="radio-label">{"Add a new address"}</label>
                  </div>
                ) : (
                  <div
                    onClick={this.handleAddNewAddress.bind(this)}
                    className={
                      !isMobile
                        ? "subTitleShipping row middle-xs marTop10 marBot10  uppercase font90Pr pointer"
                        : "row middle-xs marTop20 marBot10  uppercase font90Pr pointer"
                    }
                    style={{ color: themeColors.primary3Color }}
                  >
                    <span>
                      <i className="material-icons">add</i>
                    </span>
                    <span style={{ marginLeft: 15 }}>
                      {"Add a new address"}
                    </span>
                  </div>
                ))}
              {user &&
                !shipmentAddresses.length && (
                  <div
                    className="radioButton marTop15 leftAlignIE"
                    onClick={this.handleAddNewAddress.bind(this)}
                    style={{ color: themeColors.primary3Color }}
                  >
                    <input type="radio" name="optradio" checked />
                    <label className="radio-label">{"Add a new address"}</label>
                  </div>
                )}
              <Collapse
                isOpened={
                  !user
                    ? true
                    : !shipmentAddresses.length
                      ? true
                      : this.state.isOpened
                }
                className="leftAlignIE"
              >
                <div className="">
                  <div className="">
                    <div className="form-group">
                      <div className={isMobile ? "" : "row"}>
                        <div className={isMobile ? "" : "col-xs-12"}>
                          <div className="box">
                            <div className="mapHeader">
                              {"Full Name"}
                              <span className="reqMark">*</span>
                            </div>
                            <TextField
                              placeholder={"Full name"}
                              fullWidth
                              id="bootstrap-input"
                              value={userInfo.fullName || ""}
                              onChange={this.handleFormChange.bind(
                                this,
                                "fullName"
                              )}
                              inputRef={ref => (this.fullName = ref)}
                              InputProps={{
                                type: "text",
                                disableUnderline: true,
                                style: {
                                  ":focus": {
                                    borderColor: themeColors.primary1Color,
                                    boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                      themeColors.accent1Color
                                    }`
                                  }
                                },
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
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        isMobile ? "marBot10" : "row marTop10 marBot10"
                      }
                    >
                      {!user && (
                        <div
                          className={isMobile ? "" : "col-xs-6"}
                          style={{ position: "relative" }}
                        >
                          <div className="box">
                            <div className="mapHeader">
                              {"Email"}
                              <span className="reqMark">*</span>
                            </div>
                            <TextField
                              placeholder={"Email"}
                              fullWidth
                              id="bootstrap-input"
                              value={userInfo.email || ""}
                              onChange={this.handleFormChange.bind(
                                this,
                                "email"
                              )}
                              inputRef={ref => (this.email = ref)}
                              InputProps={{
                                disableUnderline: true,
                                type: "email",
                                style: {
                                  ":focus": {
                                    borderColor: themeColors.primary1Color,
                                    boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                      themeColors.accent1Color
                                    }`
                                  }
                                },
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
                          {this.state.emailError && (
                            <div className="errorMail">
                              {this.state.emailError}
                            </div>
                          )}
                        </div>
                      )}
                      <div className={isMobile ? "marTop20" : "col-xs-6"}>
                        <div className="box">
                          <div className="mapHeader">
                            {"Mobile Number"}
                            <span className="reqMark">*</span>
                          </div>
                          <TextField
                            placeholder={"Mobile number"}
                            fullWidth
                            id="bootstrap-input"
                            value={userInfo.mobileNo || ""}
                            onChange={this.handleFormChange.bind(
                              this,
                              "mobileNo"
                            )}
                            inputRef={ref => (this.mobileNo = ref)}
                            InputProps={{
                              disableUnderline: true,
                              type: "number",
                              style: {
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              },
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className={""}>
                  <div className="">
                    <div className="form-group">
                      <div className={isMobile ? "" : "row marTop10"}>
                        <div className={isMobile ? "marTop20" : "col-xs-12"}>
                          <div className="box">
                            <div className="mapHeader">
                              {"Address line"}
                              <span className="reqMark">*</span>
                            </div>
                            <TextField
                              placeholder={"Address line"}
                              fullWidth
                              id="bootstrap-input"
                              value={userInfo.placeFirst || ""}
                              onChange={this.handleFormChange.bind(
                                this,
                                "placeFirst"
                              )}
                              inputRef={ref => (this.placeFirst = ref)}
                              InputProps={{
                                disableUnderline: true,
                                type: "text",
                                style: {
                                  ":focus": {
                                    borderColor: themeColors.primary1Color,
                                    boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                      themeColors.accent1Color
                                    }`
                                  }
                                },
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
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        isMobile ? "marBot10" : "row marTop10 marBot10"
                      }
                    >
                      <div className={isMobile ? "marTop20" : "col-xs-6"}>
                        <div className="box">
                          <div className="mapHeader">
                            {"City/Town"}
                            <span className="reqMark">*</span>
                          </div>
                          <TextField
                            placeholder={"City/Town"}
                            fullWidth
                            id="bootstrap-input"
                            value={userInfo.city || ""}
                            onChange={this.handleFormChange.bind(this, "city")}
                            inputRef={ref => (this.city = ref)}
                            InputProps={{
                              disableUnderline: true,
                              type: "text",
                              style: {
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              },
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
                      </div>
                      <div className={isMobile ? "marTop20" : "col-xs-6"}>
                        <div className="box">
                          <div className="mapHeader">
                            {"State"}
                            <span className="reqMark">*</span>
                          </div>
                          <TextField
                            placeholder={"State"}
                            fullWidth
                            id="bootstrap-input"
                            value={userInfo.state || ""}
                            onChange={this.handleFormChange.bind(this, "state")}
                            inputRef={ref => (this.state = ref)}
                            InputProps={{
                              disableUnderline: true,
                              type: "text",
                              style: {
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              },
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
                      </div>
                    </div>
                    <div
                      className={
                        isMobile ? "marBot10" : "row marTop10 marBot10"
                      }
                    >
                      <div className={isMobile ? "marTop20" : "col-xs-6"}>
                        <div className="box">
                          <div className="mapHeader">
                            {"Country"}
                            <span className="reqMark">*</span>
                          </div>
                          <TextField
                            placeholder={"Country"}
                            fullWidth
                            id="bootstrap-input"
                            value={userInfo.country || ""}
                            onChange={this.handleFormChange.bind(
                              this,
                              "country"
                            )}
                            inputRef={ref => (this.country = ref)}
                            InputProps={{
                              disableUnderline: true,
                              type: "text",
                              style: {
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              },
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
                      </div>
                      <div className={isMobile ? "marTop20" : "col-xs-6"}>
                        <div className="box">
                          <div className="mapHeader">
                            {"Zip Code"}
                            <span className="reqMark">*</span>
                          </div>
                          <TextField
                            placeholder={"Zip Code"}
                            fullWidth
                            id="bootstrap-input"
                            value={userInfo.pinCode || ""}
                            onChange={this.handleFormChange.bind(
                              this,
                              "pinCode"
                            )}
                            inputRef={ref => (this.pinCode = ref)}
                            InputProps={{
                              disableUnderline: true,
                              type: "number",
                              style: {
                                ":focus": {
                                  borderColor: themeColors.primary1Color,
                                  boxShadow: `inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px ${
                                    themeColors.accent1Color
                                  }`
                                }
                              },
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
                      </div>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
        <div className="col-xs-10 start-xs">{this.getFooterButtons()}</div>
      </div>
    );
  }
}
UserInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

UserInformation.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};
export default withStyles(styles)(Radium(UserInformation));
