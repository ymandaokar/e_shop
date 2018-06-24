import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Drawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import MenuItem from "material-ui/Menu/MenuItem";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import MenuList from "material-ui/Menu/MenuList";
import { Switch, Route } from "react-router";
// import Category from "material-ui-icons/Category";
import VerticalSplit from "material-ui-icons/ViewModule";
import ShoppingCart from "material-ui-icons/ShoppingBasket";
import Receipt from "material-ui-icons/Receipt";
import CategoryTool from "./CategoryTool.js";
import ProductTool from "./ProductTool.js";
import OrderTool from "./OrderTool.js";
const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  "appBar-right": {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    zIndex: 0
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 18
  }
});
class Admin extends Component {
  constructor() {
    super();
    this.state = { anchor: "left" };
  }
  routeToCategories() {
    let history = this.props.history;
    history.push({ pathname: `/admin/categories` });
  }
  routeToProducts() {
    let history = this.props.history;
    history.push({ pathname: `/admin/products` });
  }
  routeToOrders() {
    let history = this.props.history;
    history.push({ pathname: `/admin/orders` });
  }
  render() {
    let { isAdmin, classes } = this.props,
      { anchor } = this.state;
    if (!isAdmin) {
      return (
        <div className="accessError">
          Sorry, You are not authorized to access this page.
        </div>
      );
    }
    return (
      <div className="row">
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor={anchor}
        >
          <List>
            <MenuItem onClick={this.routeToCategories.bind(this)}>
              <ListItemIcon>
                <VerticalSplit />
              </ListItemIcon>
              <ListItemText>{"Categories"}</ListItemText>
            </MenuItem>
            <MenuItem onClick={this.routeToProducts.bind(this)}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText>{"Products"}</ListItemText>
            </MenuItem>
          </List>
          <Divider />
          <List>
            <MenuItem onClick={this.routeToOrders.bind(this)}>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText>{"Orders"}</ListItemText>
            </MenuItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route
              exact
              path="/admin/categories"
              render={props => <CategoryTool {...this.props} />}
            />
            <Route
              exact
              path="/admin/products"
              render={props => <ProductTool {...this.props} />}
            />
            <Route
              exact
              path="/admin/orders"
              render={props => <OrderTool {...this.props} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
Admin.propTypes = {
  classes: PropTypes.object.isRequired
};

Admin.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default withStyles(styles)(Admin);
