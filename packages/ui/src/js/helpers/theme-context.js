import React from "react";
export const themes = {
  green: {
    primary1Color: "#689f38", //  header,buttons
    primary2Color: "#fc7710", //  procceed to checkout button
    primary3Color: "#005580", //  heading titles
    accent1Color: "#95bc74", //  search button
    accent2Color: "#95bc7461", //  Cards pane
    accent3Color: "",
    textColor: "#ffffff",
    alternateTextColor: "",
    canvasColor: "",
    borderColor: "",
    disabledColor: "",
    pickerHeaderColor: "",
    clockCircleColor: "",
    shadowColor: ""
  },
  gray: {
    primary1Color: "#455a64", //  header,buttons
    primary2Color: "#fc7710", //  procceed to checkout button
    primary3Color: "#005580", //  heading titles
    accent1Color: "#455a647d", //  search button
    accent2Color: "#455a6447", //  Cards pane
    accent3Color: "",
    textColor: "#ffffff",
    alternateTextColor: "",
    canvasColor: "",
    borderColor: "",
    disabledColor: "",
    pickerHeaderColor: "",
    clockCircleColor: "",
    shadowColor: ""
  },
  purple: {
    primary1Color: "purple", //  header,buttons
    primary2Color: "rgb(245, 0, 87)", //  procceed to checkout button
    primary3Color: "#005580", //  heading titles
    accent1Color: "#455a647d", //  search button
    accent2Color: "#455a6447", //  Cards pane
    accent3Color: "",
    textColor: "#ffffff",
    alternateTextColor: "",
    canvasColor: "",
    borderColor: "",
    disabledColor: "",
    pickerHeaderColor: "",
    clockCircleColor: "",
    shadowColor: ""
  }
};

export const ThemeContext = React.createContext(
  themes.gray // default value
);
