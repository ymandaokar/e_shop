import Reflux from "reflux-core";

const Actions = Reflux.createActions([
  "loadCategorizedProducts",
  "loadSearchedProducts",
  "loadProducts",
  "loadProduct",
  "loadData",
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
