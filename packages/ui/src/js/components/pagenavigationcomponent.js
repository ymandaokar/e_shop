import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import ArrowBack from "material-ui-icons/ArrowBack";
import ArrowForward from "material-ui-icons/ArrowForward";

const styles = {
  button: {
    padding: "6px 16px"
  }
};

class PageNavigationComponent extends React.Component {
  getIconButton(icon, label, onClick, style) {
    let { isMobile } = this.context;
    return (
      <IconButton
        iconClassName="material-icons icon_medium"
        style={style}
        tooltipPosition="bottom-center"
        tooltip={!isMobile && label}
        iconStyle={{
          color: "bluegrey",
          textShadow: Emboss
        }}
        touch={true}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    );
  }
  renderMenuItems() {
    const menuItems = [];
    for (let i = 0; i < this.props.totalPage; i++) {
      menuItems.push(
        <MenuItem value={i} key={i} style={{}}>{`${i + 1}`}</MenuItem>
      );
    }
    return menuItems;
  }
  getPageSelect() {
    let { classes, themeColors } = this.props;
    return (
      <div style={{ display: "inline-flex" }}>
        <div style={{ display: "inline-flex", paddingTop: 10 }}>
          {"Jump to page"}
        </div>
        <div
          style={{
            display: "inline-flex",
            marginTop: -2,
            marginLeft: 10,
            marginRight: 10
          }}
        >
          <Select
            style={{ marginTop: 5 }}
            value={this.props.currentPage}
            onChange={this.props.onJumpTo}
          >
            {this.renderMenuItems()}
          </Select>
        </div>
        <div
          style={{ display: "inline-flex", paddingTop: 10, marginRight: 15 }}
        >
          {"of"}
        </div>
        <div style={{ display: "inline-flex", paddingTop: 10 }}>
          {this.props.totalPage}
        </div>
      </div>
    );
  }
  getMobileToolbar() {
    let { classes, themeColors } = this.props;
    return (
      !!this.props.totalPage &&
      this.props.totalPage > 1 && (
        <div style={{ marginTop: 15 }}>
          <div className="row">
            {this.props.currentPage != 0 && (
              <div className="col-xs start-xs" style={{ marginLeft: 7 }}>
                <Button
                  className="mobViewButton"
                  style={{
                    backgroundColor: themeColors.primary1Color,
                    color: themeColors.textColor
                  }}
                  onClick={this.props.onPrevClick}
                  variant="raised"
                >
                  <ArrowBack />
                  {"Previous"}
                </Button>
              </div>
            )}
            {this.props.currentPage != this.props.totalPage - 1 && (
              <div className="col-xs end-xs" style={{ marginRight: 6 }}>
                <Button
                  className="mobViewButton"
                  style={{
                    backgroundColor: themeColors.primary1Color,
                    color: themeColors.textColor
                  }}
                  onClick={this.props.onNextClick}
                  variant="raised"
                >
                  {"Next"}
                  <ArrowForward />
                </Button>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-xs center-xs">{this.getPageSelect()}</div>
          </div>
        </div>
      )
    );
  }
  getToolbar() {
    let { classes, themeColors } = this.props;
    return (
      !!this.props.totalPage &&
      this.props.totalPage > 1 && (
        <div style={{ marginTop: 15 }}>
          <div className="row">
            {this.props.currentPage != 0 && (
              <div style={{ marginLeft: 7 }}>
                <Button
                  className={classes.button}
                  style={{
                    backgroundColor: themeColors.primary1Color,
                    color: themeColors.textColor
                  }}
                  onClick={this.props.onPrevClick}
                  variant="raised"
                >
                  <ArrowBack />
                  {"Previous"}
                </Button>
              </div>
            )}
            <div className="col-xs center-xs">{this.getPageSelect()}</div>
            {this.props.currentPage != this.props.totalPage - 1 && (
              <div style={{ marginRight: 6 }}>
                <Button
                  className={classes.button}
                  style={{
                    backgroundColor: themeColors.primary1Color,
                    color: themeColors.textColor
                  }}
                  onClick={this.props.onNextClick}
                  variant="raised"
                >
                  {"Next"}
                  <ArrowForward />
                </Button>
              </div>
            )}
          </div>
        </div>
      )
    );
  }
  render() {
    let { isMobile } = this.context;
    return <div>{isMobile ? this.getMobileToolbar() : this.getToolbar()}</div>;
  }
}
PageNavigationComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

PageNavigationComponent.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

module.exports = withStyles(styles)(PageNavigationComponent);
