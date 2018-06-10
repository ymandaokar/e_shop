global.PATH = __dirname;
let fs = require("fs"),
  stream = require("stream"),
  SuperLogin = require("./helpers/superlogin/lib/index.js"),
  Promise = require("bluebird"),
  ObjectID = require("bson-objectid"),
  readFile = Promise.promisify(require("fs").readFile),
  request = require("request"),
  bodyParser = require("body-parser"),
  getNewDB = require("./helpers/getnewdb.js"),
  isAdmin = require("./helpers/isadmin.js"),
  checkAdmin = require("./helpers/checkadmin.js"),
  superloginConfig = require("./superlogin/superlogin.config.js"),
  FacebookStrategy = require("passport-facebook").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  PouchDB = require("pouchdb"),
  multer = require("multer"),
  {
    mediaAPIEndpoint,
    dbProtocol,
    dbHost,
    adminAuth,
    appLink,
    tempImagesPath,
    dbServer,
    adminRole,
    serverLink,
    commonDB
  } = require("./appsettings.js"),
  easyimg = require("easyimage"),
  upload = multer(tempImagesPath),
  proxyCheck = require("./proxywhitelist.js"),
  express = require("express"),
  compression = require("compression"),
  url = require("url"),
  jsonfile = require("jsonfile"),
  {
    ServerLogger,
    ClientLogger,
    UserEventLogger,
    ServerErrorLogger
  } = require("./utility/logger.js"),
  handleShutdown = require("./handleshutdown.js"),
  handleExceptions = require("./handleexceptions.js"),
  processSSL = require("./processssl.js"),
  initialzeAdminDB = require("./helpers/initializeadmindb.js"),
  getError = require("./helpers/getformattederror.js");
PouchDB.plugin(require("pouchdb-find"));

let app,
  serverDbs = {};

function initializeSuperLogin(app) {
  ServerLogger.info("Initializing Superlogin...");
  // Bind /db to couch DB backend
  let DATABASE_URL = `${dbProtocol}${dbHost}`;

  ServerLogger.info("CouchDB URL is " + DATABASE_URL);

  // middleware itself, preceding any parsers
  app.use(function(req, res, next) {
    req.socket.on("error", function(err) {
      ServerErrorLogger.error(
        `\`On socket event exception occured while serving request for proxy path ${
          req.path
        }\`\n\`\`\`Error: ${getError(err)}\`\`\``
      );
    });
    res.socket.on("error", function(err) {
      ServerErrorLogger.error(
        `\`On socket event exception occured while serving request for proxy path ${
          req.path
        }\`\n\`\`\`Error: ${getError(err)}\`\`\``
      );
    });
    let proxy_path = req.path.match(/^\/db\/(.*)$/);
    if (proxy_path) {
      if (proxyCheck(`/${proxy_path[1]}`)) {
        let db_url = `${DATABASE_URL}/${proxy_path[1]}`;
        ServerLogger.info(`db_url: ${db_url}`);
        req
          .pipe(
            request({
              qs: req.query,
              uri: db_url
            }).on("error", err => {
              ServerErrorLogger.error(
                `\`Exception occured while serving request for proxy path:\`*${
                  req.path
                }*\n\`\`\`Error: ${getError(err)}\`\`\``
              );
            })
          )
          .pipe(res);
      } else {
        proxy_path[1] &&
          ServerErrorLogger.error(
            `db proxy has rejected the path: *${
              req.path
            }* as it was not in the whitelist.`
          );
        res.sendStatus(404);
      }
    } else {
      next();
    }
  });

  //Add a comment to this line
  ServerLogger.info("PrivateDB backend bound to /db");
  let userDB = new PouchDB(dbServer.userDB),
    couchAuthDB = new PouchDB(dbServer.couchAuthDB);

  return userDB
    .info()
    .then(info => {
      return couchAuthDB.info();
    })
    .then(info => {
      let superlogin = new SuperLogin(
        superloginConfig,
        null,
        userDB,
        couchAuthDB
      );
      superlogin.onCreate(checkAdmin);
      if (
        superlogin.config.getItem("providers.facebook.credentials.clientID")
      ) {
        ServerLogger.info("Found Facebook credentials.");
        superlogin.registerOAuth2("facebook", FacebookStrategy);
        ServerLogger.info("Facebook strategy loaded.");
      }
      if (superlogin.config.getItem("providers.google.credentials.clientID")) {
        ServerLogger.info("Found Google credentials.");
        superlogin.registerOAuth2("google", GoogleStrategy);
        ServerLogger.info("Google strategy loaded.");
      }

      ServerLogger.info("Superlogin initialized.");

      // Clear expired keys twice a day.
      setInterval(function() {
        superlogin
          .removeExpiredKeys()
          .then(() => {
            ServerLogger.info(
              "[" +
                new Date().toLocaleString() +
                "] Removed expired Superlogin keys."
            );
          })
          .catch(e =>
            ServerErrorLogger.error(
              `\`removeExpiredKeys\`\n\`\`\`${getError(e)}\`\`\``
            )
          );
      }, 10000 * 60 * 12);

      return superlogin;
    });
}

//express
function startExpress() {
  app = express();
  let port = process.env.PORT || 8080;

  app.set("port", port);
  ServerLogger.info("hosting express server on port " + port + "...");

  ServerLogger.info("Binding /db to CouchDB");

  // turn on compression
  app.use(compression());

  // user event listener
  userEventDB = getNewDB("usereventslog").db;
  //userEventChangesListener(userEventDB);

  //superlogin intialization
  initialzeAdminDB()
    .then(() => {
      return initializeSuperLogin(app);
    })
    .then(superlogin => {
      app.use("/auth", superlogin.router);
      app.get(
        "/admin",
        superlogin.requireAuth,
        superlogin.requireRole(adminRole),
        (req, res) => {
          res.send("Welcome Admin");
        }
      );
      //superlogin events
      superlogin.on("login", (userDoc, provider) => {
        superlogin
          .addUserDB(userDoc.user_id, "e_cart")
          .then(dbName => {
            let urlObj = url.parse(userDoc.userDBs.survey),
              { db, url: dbUrl } = getNewDB(urlObj.pathname.split("/")[1]),
              userId = userDoc.user_id;
            serverDbs[userId] = {
              db,
              dbUrl,
              isAdmin: isAdmin(userDoc.roles)
            };
            UserEventLogger.login(`${userId}`, {
              docType: "user-events",
              dbUrl,
              provider,
              timestamp: new Date()
            });
            if (serverDbs[userId].db) {
              addIndexes(serverDbs[userId].db).then(result => {
                ServerLogger.info("Indexes created" + JSON.stringify(result));
              });
            }
          })
          .catch(err => {
            ServerErrorLogger.error(
              `\`startup.js:onLogin:addUserDb(${
                userDoc.user_id
              })\`\n\`\`\`${getError(err)}\`\`\``
            );
          });
      });

      //superlogin logout event
      superlogin.on("logout", userId => {
        if (serverDbs[userId]) {
          UserEventLogger.logout(`${userId}`, {
            docType: "user-events",
            dbUrl: serverDbs[userId].dbUrl,
            timestamp: new Date()
          });
        }
      });

      //superlogin error event
      superlogin.on("error", err => {
        ServerErrorLogger.error(
          `\`startup.js:superlogin:onError\`\n\`\`\`${getError(err)}\`\`\``
        );
      });

      //PouchDB error event
      PouchDB.on("error", err => {
        ServerErrorLogger.error(
          `\`startup.js:PouchDB:onError\`\n\`\`\`${getError(err)}\`\`\``
        );
        if (err.name == "unauthorized") {
          process.exit();
        }
      });

      //create user profile
      let Profile = require("./profile"),
        profile = new Profile(superlogin);
      //get custom profile and send back to client
      app.get("/user/profile", superlogin.requireAuth, (req, res, next) => {
        return profile
          .get(req.user._id)
          .then(obj => {
            let { surveyDBs } = obj;
            surveyDBs.forEach(dbName => {
              if (!serverDbs[obj.profile._id]) {
                let { db, url: dbUrl } = getNewDB(dbName),
                  userId = obj.profile._id;
                serverDbs[userId] = {
                  db,
                  dbUrl
                };
                ServerLogger.profile(
                  `\`${obj.profile._id}\`\n\`\`\`Database information of ${
                    obj.profile._id
                  } added to user db collection for ${dbName} db.\`\`\``
                );
              }
            });
            res.status(200).json(obj.profile);
          })
          .catch(err => {
            return next(err);
          });
      });

      app.post("/user/change-name", superlogin.requireAuth, function(
        req,
        res,
        next
      ) {
        if (!req.body.newName) {
          return next({
            error: "Field 'newName' is required",
            status: 400
          });
        }
        return profile.changeName(req.user._id, req.body.newName).then(
          function(userProfile) {
            res.status(200).json(userProfile);
          },
          function(err) {
            return next(err);
          }
        );
      });

      app.post("/user/destroy", superlogin.requireAuth, function(
        req,
        res,
        next
      ) {
        return superlogin.removeUser(req.user._id, true).then(
          function() {
            ServerLogger.info("User destroyed!");
            res.status(200).json({
              ok: true,
              success: "User: " + req.user._id + " destroyed."
            });
          },
          function(err) {
            return next(err);
          }
        );
      });

      //plugin body-parser
      app.use(bodyParser.json());

      //apis
      app.get("/categories", (req, res, next) => {
        getNewDB(commonDB)
          .db.find({
            selector: { docType: { $eq: "category" } }
          })
          .then(categories => {
            res.status(200).json(categories);
          })
          .catch(err => {
            next(err);
          });
      });

      app.get("/organization/configuration", (req, res, next) => {
        getNewDB(commonDB)
          .db.find({
            selector: { docType: { $eq: "adminConfig" } }
          })
          .then(result => {
            res.status(200).json(result.docs[0] || {});
          })
          .catch(err => {
            next(err);
          });
      });

      app.post("/productitems", (req, res, next) => {
        let { skip, limit, sort, selector, fields } = req.body;
        selector = selector
          ? { $and: [{ docType: { $eq: "product" } }, selector] }
          : { docType: { $eq: "product" } };
        getNewDB(commonDB)
          .db.find({
            selector,
            fields,
            skip,
            sort,
            limit
          })
          .then(products => {
            res.status(200).json(products);
          })
          .catch(err => {
            next(err);
          });
      });

      app.post("/invoice", (req, res, next) => {
        let { items } = req.body;
        getNewDB(commonDB)
          .db.allDocs({
            keys: Object.keys(items),
            include_docs: true
          })
          .then(result => {
            let invoice = {};
            invoice.subtotal = 0;
            invoice.items = [];
            result.rows.forEach(value => {
              let item = value.doc,
                actualcost = item.price * items[item._id],
                discountcost = item.discount
                  ? (actualcost * item.discount) / 100
                  : 0,
                cost = actualcost - discountcost;
              invoice.items.push({
                _id: item._id,
                name: item.name,
                discount: item.discount,
                discountcost,
                unitcost: item.price,
                quantity: items[item._id],
                actualcost,
                cost
              });
              invoice.subtotal += cost;
            });
            invoice.charges = {};
            if (invoice.subtotal) {
              invoice.charges["Delivery charge"] =
                (invoice.subtotal * 10) / 100;
            }
            invoice.net = invoice.subtotal;
            Object.keys(invoice.charges).forEach(id => {
              invoice.net += invoice.charges[id];
            });
            res.status(200).json(invoice);
          })
          .catch(err => {
            next(err);
          });
      });

      ServerLogger.info("Applying cache-headers...");

      processSSL(app);
      ServerLogger.info("express server started.");
    })
    .catch(err => {
      ServerErrorLogger.error(
        `\`startup.js:PouchDB\`\n\`\`\`${getError(err)}\`\`\``
      );
      process.exit();
    });
}

handleExceptions();
handleShutdown();

startExpress();
