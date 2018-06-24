//prod: "https://wbcsded4k0.bitpod.io"
//test: "https://peoplesure_testapp-lv1ws.test.p10.io"
module.exports = {
  productsLimit: 3,
  adminDataLimit: 5,
  siteURL: "http://localhost:8080",
  stripeConfig: {
    apiKey: "",
    tokenURL: ""
  },
  braintree: {
    apiKey: ""
  },
  paypal: {
    apiKey: ""
  },
  checkoutSteps: [
    "Login",
    "Delivery Address",
    "Order Summary",
    "Payment Options"
  ],
  providerLinks: {
    google: {
      label: "www.google.com",
      link: "https://www.google.com"
    },
    facebook: {
      label: "www.facebook.com",
      link: "https://www.facebook.com"
    }
  },
  userDb: "ecart",
  clientConfig: {
    baseUrl: "/auth/",
    endpoints: [],
    noDefaultEndpoint: false,
    storage: "local",
    providers: ["facebook", "google"],
    checkExpired: "stateChange",
    refreshThreshold: 0.5
  },
  OAuth: {
    Google: {
      name: "google"
    },
    Facebook: {
      name: "facebook"
    }
  },
  Emboss:
    "rgba(255, 255, 255, 0.0980392) -1px -1px 1px, rgba(0, 0, 0, 0.498039) 1px 1px 1px",
  skipSignOutRoutes: []
};
