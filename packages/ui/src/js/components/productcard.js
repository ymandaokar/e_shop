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
import FavoriteIcon from "material-ui-icons/Favorite";
import ShareIcon from "material-ui-icons/Share";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import MoreVertIcon from "material-ui-icons/MoreVert";
import AddShoppingCart from "material-ui-icons/AddShoppingCart";
import { truncate } from "lodash-es";
import history from "../helpers/history";

const styles = {
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  }
};

class ProductCard extends Component {
  handleProductClick(id) {
    history.push({ pathname: `/products/${id}` });
  }
  render() {
    let { product, classes, currency } = this.props;
    return (
      <div style={{ margin: 10, width: 350 }}>
        <Card
          className={classes.card}
          onClick={this.handleProductClick.bind(this, product.id)}
        >
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
          <CardMedia
            className={classes.media}
            image={product.images[0]}
            title={product.name}
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to shopping cart">
              <AddShoppingCart />
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
