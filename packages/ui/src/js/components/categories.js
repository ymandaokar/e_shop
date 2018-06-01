import React, { Component } from "react";
import classNames from "classnames";
import { Manager, Target, Popper } from "react-popper";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import Collapse from "material-ui/transitions/Collapse";
import Grow from "material-ui/transitions/Grow";
import Paper from "material-ui/Paper";
import Portal from "material-ui/Portal";
import MenuItem from "material-ui/Menu/MenuItem";
import MenuList from "material-ui/Menu/MenuList";
import history from "../helpers/history";
import Down from "material-ui-icons/KeyboardArrowDown";
import Up from "material-ui-icons/KeyboardArrowUp";
const styles = {
  root: {
    flexGrow: 1,
    height: "100%"
  },
  flex: {
    flex: 1
  }
};
class categories extends Component {
  constructor() {
    super();
    this.state = { category: "" };
    this.handleClose = this.handleClose.bind(this);
  }
  handleCategoryClick(id, redirect) {
    if (redirect) {
      history.push({ pathname: `/products/search/${id}` });
    } else {
      this.setState({ category: id });
    }
  }
  handleClose() {
    this.setState({ category: "" });
  }
  render() {
    let { categories, isMobile, classes } = this.props;
    return (
      <div className="row center-xs" style={{ background: "#fcf9f9b5" }}>
        <div
          className={"col-xs-12 maxWidth"}
          style={
            isMobile
              ? {
                  overflow: "hidden",
                  overflowY: "auto"
                }
              : {}
          }
        >
          <div className="homeCatParent">
            {categories &&
              !!categories.size && (
                <div className="">
                  {categories.map(category => {
                    return (
                      <div className="homeCategory" key={category.id}>
                        <Manager>
                          <Target>
                            <button
                              className="btn-link homeCatButton"
                              style={{ display: "flex" }}
                              onClick={this.handleCategoryClick.bind(
                                this,
                                category.id,
                                !category.children.length
                              )}
                            >
                              {category.Name}
                              {!!category.children.length &&
                                (category.id == this.state.category ? (
                                  <Up
                                    style={{ marginTop: -3, marginLeft: 5 }}
                                  />
                                ) : (
                                  <Down
                                    style={{ marginTop: -3, marginLeft: 5 }}
                                  />
                                ))}
                            </button>
                          </Target>
                          {!!category.children.length && (
                            <Popper
                              placement="bottom-end"
                              eventsEnabled={category.id == this.state.category}
                              className={classNames({
                                [classes.popperClose]: !(
                                  category.id == this.state.category
                                )
                              })}
                            >
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <Grow
                                  in={category.id == this.state.category}
                                  id="menu-list-grow"
                                  style={{ transformOrigin: "0 0 0" }}
                                >
                                  <Paper>
                                    <MenuList role="menu" style={{ margin: 6 }}>
                                      {category.children.map(child => {
                                        return (
                                          <MenuItem
                                            key={child.id}
                                            onClick={this.handleCategoryClick.bind(
                                              this,
                                              child.id,
                                              true
                                            )}
                                            className="homeCatButton"
                                            style={{ fontSize: "80%" }}
                                          >
                                            {child.Name}
                                          </MenuItem>
                                        );
                                      })}
                                    </MenuList>
                                  </Paper>
                                </Grow>
                              </ClickAwayListener>
                            </Popper>
                          )}
                        </Manager>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(categories);
