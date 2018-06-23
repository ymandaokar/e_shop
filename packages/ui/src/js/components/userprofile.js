import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Manager, Target, Popper } from "react-popper";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Avatar from "material-ui/Avatar";
import AccountCircle from "material-ui-icons/AccountCircle";
import IconButton from "material-ui/IconButton";
import Icon from "material-ui/Icon";
import SvgIcon from "material-ui/SvgIcon";
import Paper from "material-ui/Paper";
import MenuItem from "material-ui/Menu/MenuItem";
import Menu from "material-ui/Menu/Menu";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import red from "material-ui/colors/red";
import Button from "material-ui/Button";
import lightBlue from "material-ui/colors/lightBlue";
import blue from "material-ui/colors/blue";
import AuthActions from "../actions/authactions.js";
import AuthStore from "../stores/authstore.js";
import { Emboss } from "../appsettings.js";
import Logout from "material-ui-icons/PowerSettingsNew";
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  flex: {
    flex: 1,
    cursor: "pointer"
  },
  wrapper: {
    position: "relative"
  },
  fabProgress: {
    color: "white",
    position: "absolute",
    top: 4,
    left: 4,
    zIndex: 1
  },
  icon: {
    margin: 5,
    height: 32,
    width: 32
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  userAvatar: {}
});
class UserProfile extends Component {
  constructor() {
    super();
    this.state = { anchorEl: null };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleLogout() {
    this.handleClose();
    AuthActions.logout();
  }
  handleLogin(provider) {
    this.handleClose();
    AuthActions.login(provider);
  }
  handleChildLogOut() {
    this.props.onLogOut();
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  getUserIcon(auth) {
    let { authState, AuthStates, error, userProfile } = auth,
      { classes } = this.props,
      { isMobile } = this.context,
      { anchorEl } = this.state;
    if (authState == AuthStates.SIGNED_IN) {
      let { name, thumbnail } = userProfile;
      return (
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? "signed-in" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <Avatar src={thumbnail} size={40} className={classes.userAvatar} />
        </IconButton>
      );
    }

    if (authState == AuthStates.SIGNED_OUT) {
      return (
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? "signed-out" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      );
    }

    if (authState == AuthStates.ERROR) {
      return (
        <IconButton
          aria-haspopup="true"
          iconStyle={{ color: red[500], textShadow: Emboss }}
        >
          error_outline
        </IconButton>
      );
    }

    // The other states are sining-in ang signing-out.
    // Display in-progress icon for this period.
    return (
      <div className={classes.wrapper}>
        <IconButton variant="fab" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <CircularProgress size={40} className={classes.fabProgress} />
      </div>
    );
  }
  getAuthMenu(auth) {
    let { authState, AuthStates, provider, AuthProviders } = auth,
      { anchorEl } = this.state,
      { classes, themeColors } = this.props;
    if (authState == AuthStates.SIGNED_IN) {
      // Render logout for signed-in user.
      let icon = <Icon className="icon-logout" color={blue[500]} />;
      return (
        <div>
          {this.getUserIcon(auth)}
          <Menu
            id="signed-in"
            style={{ marginTop: 46 }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <MenuItem onClick={this.handleLogout.bind(this)}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>{"Sign-out"}</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      );
    }

    if (authState == AuthStates.SIGNED_OUT) {
      // Render login options from supported providers
      // for signed-out user.
      let providersItems = [];
      for (let provider of AuthProviders) {
        let { name, title, logo } = provider,
          IconSvg = props => <SvgIcon {...props}>{logo}</SvgIcon>;
        providersItems.push(
          <MenuItem key={name} onClick={this.handleLogin.bind(this, name)}>
            <IconSvg
              style={{ color: themeColors.primary1Color }}
              // color="primary"
              className={classes.icon}
              viewBox="0 0 32 32"
            />
            <ListItemText>{title}</ListItemText>
          </MenuItem>
        );
      }

      return (
        <div>
          {this.getUserIcon(auth)}
          <Menu
            id="signed-out"
            style={{ marginTop: 46 }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            {providersItems}
          </Menu>
        </div>
      );
    }

    return this.getUserIcon(auth);
  }
  render() {
    let { auth } = this.props;
    if (!auth) {
      return <div />;
    }
    let node = this.getAuthMenu(auth);
    let { signoutCaption, cancelCaption } = this.props;
    return node;
    // return (
    //   <Paper
    //     zDepth={1}
    //     style={{
    //       height: 40,
    //       width: 40,
    //       display: "inline-block"
    //     }}
    //     circle={true}
    //   >
    //     {node}
    //   </Paper>
    // );
  }
}
UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

UserProfile.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default withStyles(styles)(UserProfile);
