var path = require("path"),
  {
    serverLink,
    dbProtocol,
    dbHost,
    adminAuth,
    serverLink
  } = require("../appsettings.js");
module.exports = {
  testMode: {
    noEmail: !process.env.SENDGRID_USERNAME,
    debugEmail: !process.env.SENDGRID_USERNAME
  },
  security: {
    defaultRoles: ["user"],
    disableLinkAccounts: false,
    maxFailedLogins: 3,
    lockoutTime: 600,
    sessionLife: 86400,
    tokenLife: 86400,
    userActivityLogSize: 10,
    loginOnRegistration: false,
    loginOnPasswordReset: false
  },
  local: {
    sendConfirmEmail: false,
    requireEmailConfirm: false,
    loginOnRegistration: true,
    confirmEmailRedirectURL: "/confirm-email"
  },
  dbServer: {
    publicURL: serverLink,
    protocol: dbProtocol,
    host: dbHost,
    user: adminAuth.user,
    password: adminAuth.pass,
    cloudant: false,
    userDB: "ecart-cand",
    couchAuthDB: "_users"
  },
  session: {
    adapter: "redis",
    redis: {
      port: process.env.REDIS_SERVICE_PORT,
      host: process.env.REDIS_SERVICE_HOST
    }
  },
  mailer: {
    fromEmail: process.env.FROM_EMAIL || "noreply@example.com",
    transport: require("nodemailer-sendgrid-transport"),
    options: {
      auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
      }
    }
  },
  userDBs: {
    defaultDBs: {
      private: ["ecart"]
    },
    defaultSecurityRoles: {
      admins: ["admin"],
      members: ["admin"]
    },
    model: {
      survey: {
        designDocs: ["designs.js", "views.js"]
      }
    },
    designDocDir: path.join(__dirname, "./designs/private")
  },
  providers: {
    facebook: {
      credentials: {
        clientID: process.env.FACEBOOK_CLIENTID || "1509318149187622",
        clientSecret:
          process.env.FACEBOOK_CLIENTSECRET ||
          "7612c6edfa9794fc312f6f363d74ca76",
        profileURL: "https://graph.facebook.com/v2.4/me",
        profileFields: [
          "id",
          "name",
          "displayName",
          "emails",
          "age_range",
          "link",
          "gender",
          "locale",
          "timezone",
          "updated_time",
          "verified",
          "picture",
          "cover"
        ]
      },
      options: {
        scope: ["email", "public_profile"],
        display: "popup"
      }
    },
    google: {
      credentials: {
        clientID:
          process.env.GOOGLE_CLIENTID ||
          "361923803461-smnla6l9c0uai3sju0asorhq16apbtb3.apps.googleusercontent.com",
        clientSecret:
          process.env.GOOGLE_CLIENTSECRET || "D9IErsPvxfZLDYrJUEfYcutI"
      },
      options: {
        scope: ["profile", "email"]
      }
    }
  }
};
