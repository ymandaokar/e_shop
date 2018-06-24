import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import CategoryActions from "../actions/categoryactions.js";
import Radium from "radium";
import FormHelperText from "material-ui/Form/FormHelperText";
import FormControl from "material-ui/Form/FormControl";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
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
  bootstrapSelect: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: 4,
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
    },
    width: "100%"
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
  iOSSwitchBase: {
    "&$iOSChecked": {
      color: theme.palette.common.white,
      "& + $iOSBar": {
        backgroundColor: "#52d869"
      }
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: "translateX(15px)",
    "& + $iOSBar": {
      opacity: 1,
      border: "none"
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "solid 1px",
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
});

class CategoryForm extends Component {
  handleCategoryFormChange(key, evt) {
    let { value } = evt.target;
    CategoryActions.handleFormChange(key, value);
  }
  handleChange(evt) {
    CategoryActions.handleFormChange("parentCategoryId", evt.target.value);
  }
  handleToggle(evt) {
    CategoryActions.handleFormChange("isActive", event.target.checked);
  }
  render() {
    let {
      classes,
      themeColors,
      category,
      isMobile,
      categoryTypes
    } = this.props;
    return (
      <div>
        <div className="row formRow">
          <div className="col-xs">
            <div className="mapHeader">
              {"Name"}
              <span className="reqMark">*</span>
            </div>
            <TextField
              placeholder={"Name"}
              fullWidth
              id="bootstrap-input"
              value={category.name || ""}
              onChange={this.handleCategoryFormChange.bind(this, "name")}
              inputRef={ref => (this.name = ref)}
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
          <div className="col-xs">
            <div className="mapHeader">
              {"Code"}
              <span className="reqMark">*</span>
            </div>
            <TextField
              placeholder={"Code"}
              fullWidth
              id="bootstrap-input"
              value={category.code || ""}
              onChange={this.handleCategoryFormChange.bind(this, "code")}
              inputRef={ref => (this.code = ref)}
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
        <div className="row formRow">
          <div className="col-xs">
            <div className="mapHeader">{"Description"}</div>
            <TextField
              placeholder={"Description"}
              fullWidth
              id="bootstrap-input"
              value={category.description || ""}
              onChange={this.handleCategoryFormChange.bind(this, "description")}
              inputRef={ref => (this.description = ref)}
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
        <div className="row formRow">
          <div className="col-xs">
            <div className="mapHeader">{"Display order"}</div>
            <TextField
              placeholder={"Display order"}
              fullWidth
              id="bootstrap-input"
              value={category.displayOrder || ""}
              onChange={this.handleCategoryFormChange.bind(
                this,
                "displayOrder"
              )}
              inputRef={ref => (this.displayOrder = ref)}
              InputProps={{
                type: "number",
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
          <div className="col-xs">
            <div className="mapHeader">{"Parent category"}</div>
            <Select
              native
              value={category.parentCategoryId}
              className={!isMobile ? classes.bootstrapSelect : ""}
              onChange={this.handleChange.bind(this)}
              InputProps={{
                disableUnderline: true
              }}
            >
              <option key={"blank"} value={""}>
                {"---SELECT---"}
              </option>
              {categoryTypes.map(categoryType => (
                <option
                  className={classes.bootstrapFormLabel}
                  key={categoryType._id}
                  value={categoryType._id}
                >
                  {categoryType.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-xs">
            <div className="mapHeader">{"Is active"}</div>
            <Switch
              classes={{
                switchBase: classes.iOSSwitchBase,
                bar: classes.iOSBar,
                icon: classes.iOSIcon,
                iconChecked: classes.iOSIconChecked,
                checked: classes.iOSChecked
              }}
              disableRipple
              checked={category.isActive}
              onChange={this.handleToggle.bind(this)}
              value={category.isActive}
            />
          </div>
        </div>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  classes: PropTypes.object.isRequired
};

CategoryForm.childContextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};
export default withStyles(styles)(Radium(CategoryForm));
