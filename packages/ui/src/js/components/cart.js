import React, { Component } from "react";
import { Manager, Target, Popper } from "react-popper";
import { withStyles } from "material-ui/styles";
import ClickAwayListener from "material-ui/utils/ClickAwayListener";
import ShoppingCart from "material-ui-icons/ShoppingCart";
import IconButton from "material-ui/IconButton";
import EmptyCart from "./empty-states/EmptyCart.js";
import classNames from "classnames";
import Grow from "material-ui/transitions/Grow";
import Paper from "material-ui/Paper";
import Badge from "material-ui/Badge";
import CartScrollBar from "./CartScrollBar";
import AppActions from "../actions/actions.js";
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
  margin: {
    margin: theme.spacing.unit * 2
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
});

class Cart extends Component {
  constructor() {
    super();
    this.state = { open: false };
    this.toggleCart = this.toggleCart.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  toggleCart() {
    let { open } = this.state;
    this.setState({ open: !open });
  }
  handleClose(evt, fn) {
    this.setState({ open: false }, fn);
  }
  handleProccedClick() {
    this.handleClose(null, AppActions.checkoutProcess);
  }
  getCartItems() {
    let { cartItems, currency, isMobile } = this.props;
    return cartItems
      .map((product, id) => {
        return (
          <div className="" key={product._id}>
            <div className="">
              <li className="cart-item" key={product.name}>
                <img className="product-image" src={product.image} />
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">{`${currency} ${
                    product.price
                  }`}</p>
                </div>
                <div className="product-total">
                  <p className="quantity">
                    {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
                  </p>
                  <p className="amount">{`${currency} ${product.quantity *
                    product.price}`}</p>
                </div>
                <a
                  className="product-remove"
                  onClick={AppActions.removeFromCart.bind(this, product._id)}
                >
                  ×
                </a>
              </li>
              <div style={{ textAlign: "center" }}>
                <div className="divider90" />
              </div>
            </div>
          </div>
        );
      })
      .toArray();
  }
  render() {
    let { open } = this.state,
      { classes, themeColors, cartItems } = this.props,
      disabled = !(cartItems && cartItems.size);
    return (
      <Manager>
        <Target>
          <IconButton
            aria-haspopup="true"
            color="inherit"
            onClick={this.toggleCart}
          >
            {!disabled ? (
              <Badge
                className={classes.margin}
                badgeContent={cartItems.size}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            ) : (
              <ShoppingCart />
            )}
          </IconButton>
        </Target>
        {open && (
          <Popper
            placement="bottom-center"
            eventsEnabled={open}
            className={classNames({
              [classes.popperClose]: !open
            })}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Grow
                in={open}
                id="menu-list-grow"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper style={{ margin: 6 }}>
                  <div className="cart-product">
                    {disabled ? <EmptyCart /> : this.getCartItems()}
                  </div>
                  <div className="action-block">
                    <button
                      onClick={
                        disabled ? () => {} : this.handleProccedClick.bind(this)
                      }
                      type="button"
                      className={disabled ? "disabled" : ""}
                      style={{
                        backgroundColor: themeColors.primary2Color,
                        color: themeColors.textColor
                      }}
                    >
                      {"PROCEED TO CHECKOUT"}
                    </button>
                  </div>
                </Paper>
              </Grow>
            </ClickAwayListener>
          </Popper>
        )}
      </Manager>
    );
  }
}

export default withStyles(styles)(Cart);
