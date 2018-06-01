import React, { Component } from "react";

class categories extends Component {
  handleCategoryClick(id) {}
  render() {
    let { categories, isMobile } = this.props;
    return (
      <div className="row center-xs" style={{ background: "#fcf9f9b5" }}>
        <div
          className={"col-xs-12 maxWidth"}
          style={
            isMobile
              ? {
                  overflow: "hidden",
                  overflowY: "auto"
                }
              : {}
          }
        >
          <div className="homeCatParent">
            {categories &&
              !!categories.size && (
                <div className="">
                  {categories.map(category => {
                    return (
                      <div className="homeCategory" key={category.id}>
                        <button
                          className="btn-link homeCatButton"
                          onClick={this.handleCategoryClick.bind(
                            this,
                            category.id
                          )}
                        >
                          {category.Name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default categories;
