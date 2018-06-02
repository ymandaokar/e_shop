import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppActions from "../actions/actions.js";
import AppStore from "../stores/store.js";
import ProductsLoader from "./loaders/Products.js";
import NoResult from "./empty-states/NoResults.js";
import ProductCard from "./productcard.js";

const styles = {
  card: {
    maxWidth: 400
  }
};

class CategorizedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let self = this;
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
    let { id } = this.props.match.params;
    AppActions.loadCategorizedProducts(id);
  }

  componentWillUnmount() {
    let self = this;
    this.unsubscribe();
  }

  render() {
    if (!this.state.AppState) {
      return <ProductsLoader />;
    }
    let { isMobile } = this.context,
      products = this.state.AppState.get("products");
    if (!products.size) {
      return <NoResult />;
    }
    return (
      <div style={{ display: "flex" }}>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    );
  }
}

CategorizedProducts.propTypes = {
  classes: PropTypes.object.isRequired
};

CategorizedProducts.contextTypes = {
  isMobile: PropTypes.bool,
  isShort: PropTypes.bool
};

export default withStyles(styles)(CategorizedProducts);
