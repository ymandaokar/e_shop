import React, { PureComponent as Component } from "react";
import { ThemeContext, themes } from "../helpers/theme-context";
const footerConfig = [
  {
    category: "About",
    footerLinks: [
      {
        title: "About Us",
        link: "#"
      },
      {
        title: "FAQ",
        link: "#"
      },
      {
        title: "News & Media",
        link: "#"
      }
    ]
  },
  {
    category: "Account",
    footerLinks: [
      {
        title: "My Account",
        link: ""
      },
      {
        title: "Order History",
        link: "#"
      },
      {
        title: "Wish List",
        link: "#"
      }
    ]
  },
  {
    category: "Help",
    footerLinks: [
      {
        title: "Contact Us",
        link: "#"
      },
      {
        title: "Returns",
        link: "#"
      },
      {
        title: "Site Map",
        link: "#"
      }
    ]
  }
];

class Footer extends Component {
  renderSubLinks(footerLinks, themeColors) {
    return footerLinks.map((currentLink, index) => {
      return (
        <div className="marBot5" key={index}>
          <a
            className="footerLink"
            href={currentLink.link}
            style={{ color: themeColors.textColor }}
          >
            {currentLink.title}
          </a>
        </div>
      );
    });
  }
  getPaymentPoster(themeColors) {
    return (
      <div className="">
        <div className="dividerFooter"> </div>
        <div className="" style={{ color: themeColors.textColor }}>
          Copyright @Obscure
        </div>
      </div>
    );
  }
  render() {
    let { isMobile, addpadding, themeColors } = this.props;
    return (
      <footer style={{ background: themeColors.primary1Color }}>
        <div className="footer-links">
          <div className="row center-xs">
            <div className={isMobile ? "row col-xs-12" : "row col-xs-10"}>
              {footerConfig.map((currentCategory, index) => {
                return (
                  <div className="col-xs" key={index}>
                    <div className="row center-xs">
                      <div className="start-xs">
                        <div
                          className="footerCat uppercase marBot10"
                          style={{ color: themeColors.textColor }}
                        >
                          {currentCategory.category}{" "}
                        </div>
                        {this.renderSubLinks(
                          currentCategory.footerLinks,
                          themeColors
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <p>&copy; 2017 <strong>Veggy</strong> - Organic Green Store</p> */}
        <div className="">{this.getPaymentPoster(themeColors)}</div>
      </footer>
    );
  }
}

export default Footer;
