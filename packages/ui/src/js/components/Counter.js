import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.productQuantity };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(e) {
    let { maxAllowQuantity } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.props.updateQuantity(
      (maxAllowQuantity &&
        Math.min(maxAllowQuantity, parseInt(this.props.productQuantity) + 1)) ||
        parseInt(this.props.productQuantity) + 1
    );
  }

  decrement(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.productQuantity <= 1) {
      return this.props.productQuantity;
    } else {
      this.props.updateQuantity(parseInt(this.props.productQuantity) - 1);
    }
  }
  handlePropagation(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  feed(e) {
    let { value } = this.refs.feedQty;
    if (!value) {
      value = 1;
    }
    if (
      value >= 1 &&
      (!this.props.maxAllowQuantity || value <= this.props.maxAllowQuantity)
    ) {
      this.setState(
        {
          value
        },
        function() {
          this.props.updateQuantity(this.state.value);
        }
      );
    }
  }

  resetQuantity() {
    this.setState({
      value: 1
    });
  }
  render() {
    let { fromQuickView, disabled } = this.props;
    if (disabled) {
      return (
        <div
          className="stepper-input"
          style={{
            margin: fromQuickView && "unset",
            maxWidth: fromQuickView && 200
          }}
        >
          <a
            href="#"
            onClick={this.handlePropagation}
            className={!fromQuickView ? "decrement-disb" : "fromQuickView-disb"}
          >
            –
          </a>
          <input
            ref="feedQty"
            type="number"
            className="quantity"
            value={this.props.productQuantity}
            style={{
              height: fromQuickView && 35,
              fontSize: fromQuickView && 15
            }}
            disabled="disabled"
          />
          <a
            href="#"
            onClick={this.handlePropagation}
            className={!fromQuickView ? "increment-disb" : "fromQuickView-disb"}
          >
            +
          </a>
        </div>
      );
    }
    return (
      <div
        className="stepper-input"
        style={{
          margin: fromQuickView && "unset",
          maxWidth: fromQuickView && 200
        }}
      >
        <a
          href="#"
          className={!fromQuickView ? "decrement" : "fromQuickView"}
          onClick={this.decrement}
        >
          –
        </a>
        <input
          ref="feedQty"
          type="number"
          className="quantity"
          value={this.props.productQuantity}
          onChange={this.feed.bind(this)}
          style={{ height: fromQuickView && 35, fontSize: fromQuickView && 15 }}
        />
        <a
          href="#"
          className={!fromQuickView ? "increment" : "fromQuickView"}
          onClick={this.increment}
        >
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
