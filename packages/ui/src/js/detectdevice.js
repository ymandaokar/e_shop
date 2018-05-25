import React, { PureComponent as Component } from "react";
import ReactDOM from "react-dom";
import MediaQuery from "react-responsive";
import App from "./app.js";
class DetectDevice extends Component {
  getChildWithProps(isMobile, isShort) {
    return <App isMobile={isMobile} isShort={isShort} {...this.props} />;
  }
  render() {
    return (
      <div style={{ height: "100%" }}>
        <MediaQuery query="(min-device-width: 1224px)">
          <MediaQuery query="(min-width: 808px)">
            {this.getChildWithProps(false)}
          </MediaQuery>
          <MediaQuery query="(max-width: 807px) and (min-width: 471px)">
            {this.getChildWithProps(true)}
          </MediaQuery>
          <MediaQuery query="(max-width: 470px)">
            {this.getChildWithProps(true, true)}
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          <MediaQuery query="(min-width: 471px)">
            {this.getChildWithProps(true)}
          </MediaQuery>
          <MediaQuery query="(max-width: 470px)">
            {this.getChildWithProps(true, true)}
          </MediaQuery>
        </MediaQuery>
      </div>
    );
  }
}

export default DetectDevice;
