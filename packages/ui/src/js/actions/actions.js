import Reflux from "reflux-core";

const Actions = Reflux.createActions([
  "loadProducts",
  "loadProduct",
  "setCardtInfo",
  "processPayment",
  "finish",
  "next",
  "prev",
  "jumpTo",
  "search",
  "reset"
]);

export default Actions;
