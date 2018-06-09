import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Avatar from "material-ui/Avatar";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardActions from "material-ui/Card/CardActions";
import CardContent from "material-ui/Card/CardContent";
import CardMedia from "material-ui/Card/CardMedia";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import red from "material-ui/colors/red";
import cyan from "material-ui/colors/cyan";
import FavoriteIcon from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import MoreVertIcon from "material-ui-icons/MoreVert";
import AddShoppingCart from "material-ui-icons/AddShoppingCart";
import HourglassEmpty from "material-ui-icons/HourglassEmpty";
import { truncate } from "lodash-es";
import history from "../helpers/history";
import AppActions from "../actions/actions.js";
import ButtonBase from "material-ui/ButtonBase";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer"
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  image: {
    position: "relative",
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  content: {
    padding: 0
  }
});

class ProductCard extends Component {
  constructor() {
    super();
    this.state = { currentQuantity: 1, adding: false };
  }
  handleProductClick(id) {
    history.push({ pathname: `/products/${id}` });
  }
  addToCart(product) {
    AppActions.addToCart(product, parseInt(this.state.currentQuantity));
    this.setState(
      {
        adding: true,
        currentQuantity: 1
      },
      function() {
        setTimeout(() => {
          this.setState({
            adding: false
          });
        }, 2000);
      }
    );
  }
  render() {
    let { product, classes, currency } = this.props,
      { isMobile } = this.context,
      { adding } = this.state;
    return (
      <div style={{ margin: 10, width: 350 }}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {product.name[0]}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={truncate(product.name, {
              length: 15
            })}
            subheader={`${currency} ${product.price}`}
          />
          {isMobile ? (
            <CardMedia
              onClick={this.handleProductClick.bind(this, product._id)}
              className={classes.media}
              image={product.images[0]}
              title={product.name}
            />
          ) : (
            <CardContent
              className={classes.content}
              onClick={this.handleProductClick.bind(this, product._id)}
            >
              <ButtonBase
                focusRipple
                key={product._id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: "100%"
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${product.images[0]})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subheading"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {"Quick View"}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            </CardContent>
          )}
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              aria-label="Add to shopping cart"
              onClick={!adding && this.addToCart.bind(this, product)}
            >
              {adding ? (
                <HourglassEmpty style={{ color: cyan[600] }} />
              ) : (
                <AddShoppingCart />
              )}
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired
};

ProductCard.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default withStyles(styles)(ProductCard);
