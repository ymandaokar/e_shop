import React, { Component } from "react";
import PageNavigationComponent from "./pagenavigationcomponent.js";
import CategoryStore from "../stores/categorystore.js";
import CategoryActions from "../actions/categoryactions.js";
import MenuItem from "material-ui/Menu/MenuItem";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import ListItemIcon from "material-ui/List/ListItemIcon";
import ListItemText from "material-ui/List/ListItemText";
import MenuList from "material-ui/Menu/MenuList";
import Edit from "material-ui-icons/Edit";
import Delete from "material-ui-icons/Delete";
import Add from "material-ui-icons/AddCircle";
import IconButton from "material-ui/IconButton";
import green from "material-ui/colors/green";
import red from "material-ui/colors/red";
import { Emboss } from "../appsettings.js";
import FullscreenDialog from "./FullscreenDialog.js";
import CategoryForm from "./categoryform.js";

class CategoryTool extends Component {
  constructor() {
    super();
    this.state = { CategoryState: null, title: "", openDialog: false };
  }
  handleNext() {
    CategoryActions.next();
  }
  handlePrevious() {
    CategoryActions.prev();
  }
  handleJumpTo(evt) {
    CategoryActions.jumpTo(evt.target.value);
  }
  componentDidMount() {
    this.unsubscribe = CategoryStore.listen(state =>
      this.setState({ CategoryState: state })
    );
    CategoryActions.loadCategories();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  openDialog = (category = {}, title) => {
    CategoryActions.setCurrentCategory(category);
    this.setState({ openDialog: true, title });
  };
  handleClose = () => {
    this.setState({ openDialog: false });
  };
  handleSave = () => {
    this.handleClose();
  };
  render() {
    let categories =
        this.state.CategoryState && this.state.CategoryState.get("categories"),
      totalPage =
        this.state.CategoryState && this.state.CategoryState.get("totalPage"),
      currentPage =
        this.state.CategoryState && this.state.CategoryState.get("currentPage"),
      currentCategory =
        this.state.CategoryState &&
        this.state.CategoryState.get("currentCategory"),
      categoryTypes =
        this.state.CategoryState &&
        this.state.CategoryState.get("categoryTypes"),
      { themeColors } = this.props,
      { openDialog, title } = this.state;
    return (
      <div>
        <div className="adminData headerPane">
          <div
            className="adminHeader"
            style={{ color: themeColors.primary1Color }}
          >
            {"Categories"}
          </div>
          <IconButton
            style={{
              margin: "10px 32px 5px 5px",
              color: green[500],
              textShadow: Emboss
            }}
            variant="fab"
            aria-haspopup="true"
            onClick={this.openDialog.bind(this, {}, "Add category")}
          >
            <Add />
          </IconButton>
        </div>
        {(categories && (
          <div className="adminData">
            <List>
              {categories
                .map(category => {
                  return (
                    <MenuItem key={category._id}>
                      <ListItemText
                        primary={category.name}
                        secondary={category.code}
                      />
                      <ListItemIcon>
                        <IconButton
                          variant="fab"
                          aria-haspopup="true"
                          color="inherit"
                          onClick={this.openDialog.bind(
                            this,
                            category,
                            "Update category"
                          )}
                        >
                          <Edit />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton
                          variant="fab"
                          aria-haspopup="true"
                          style={{ color: red[800], textShadow: Emboss }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemIcon>
                    </MenuItem>
                  );
                })
                .toArray()}
            </List>
          </div>
        )) || (
          <div style={{ textAlign: "center", fontSize: "120%", padding: 10 }}>
            {"No category added yet!"}
          </div>
        )}
        {totalPage > 1 && (
          <div className="adminData pageNav">
            <PageNavigationComponent
              themeColors={themeColors}
              totalPage={totalPage}
              currentPage={currentPage}
              onNextClick={this.handleNext}
              onPrevClick={this.handlePrevious}
              onJumpTo={this.handleJumpTo}
            />
          </div>
        )}
        <FullscreenDialog
          childComponent={
            <CategoryForm
              themeColors={themeColors}
              category={currentCategory}
              categoryTypes={categoryTypes}
            />
          }
          open={openDialog}
          title={title}
          onSave={this.handleSave}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default CategoryTool;
