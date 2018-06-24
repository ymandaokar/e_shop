import Reflux from "reflux-core";

const CategoryActions = Reflux.createActions([
  "loadCategories",
  "next",
  "prev",
  "jumpTo",
  "setCurrentCategory"
]);

export default CategoryActions;
