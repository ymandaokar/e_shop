import EventEmitter from "events";
import { forIn, merge } from "lodash";
import PouchDB from "pouchdb-core";
import pouchMirror from "./pouchmirror.js";
import seed from "pouchdb-seed-design";
import indexes from "../designs/indexes.js";
import settleAll from "../settleall.js";
import Logger from "../logger.js";
import Promise from "bluebird";
import HTTPAdapter from "pouchdb-adapter-http";
import MapReduceAdapter from "pouchdb-mapreduce";
import ReplicationAdapter from "pouchdb-replication";
import PouchDBFind from "pouchdb-find";
import IDBAdapter from "pouchdb-adapter-idb";
import WebSqlAdapter from "pouchdb-adapter-websql";
PouchDB.plugin(HTTPAdapter)
  .plugin(MapReduceAdapter)
  .plugin(ReplicationAdapter)
  .plugin(PouchDBFind)
  .plugin(IDBAdapter)
  .plugin(WebSqlAdapter);

if (REMOVE_LOGS) {
  PouchDB.debug.disable();
}

let Assertions = {
  AssertContextValid: function(valid) {
    if (!valid) {
      throw TypeError("This context has already been destroyed.");
    }
  },
  AssertDBInitialized: function(initialized) {
    if (!initialized) {
      throw TypeError("Database is not initialized yet!");
    }
  }
};
export default class UserContext extends EventEmitter {
  constructor(userProfile) {
    super();
    this._userId = userProfile._id;
    this._userProfile = userProfile;
    this._initialized = false;
    this._db = null;
  }
  addEventListener(db) {
    return db
      .on("delta-sync-completed", () => {
        this.syncCompleted();
        this.emit("delta-sync-completed");
      })
      .on("delta-sync-started", () => {
        Logger.debug("Delta sync started.");
      })
      .on("delta-sync-changes-detected", change => {
        this.changesFound(change);
        Logger.debug("delta-sync-changes-detected.");
      })
      .on("delta-sync-failed", () => {
        this.emit("delta-sync-failed");
      })
      .on("initial-sync-changes-detected", () => {
        Logger.debug("initial-sync-changes-detected.");
      })
      .on("initial-sync-started", () => {
        Logger.debug("initial-sync-started.");
      })
      .on("initial-sync-failed", () => {
        this.emit("initial-sync-failed");
      })
      .on("initial-sync-completed", () => {
        this.emit("initial-sync-completed");
      });
  }
  _initialize() {
    //PouchDB.debug.enable('*');
    let localDB = new PouchDB(this._userProfile._id);
    if (this._userProfile.isGuest) {
      this._db = localDB;
    } else {
      this._db = new pouchMirror(
        localDB,
        new PouchDB(this._userProfile.userDbUrl)
      );
      this.addEventListener(this._db);
    }
    let promises = [];
    forIn(indexes, (value, key) => {
      promises.push(Promise.try(() => this._db.createIndex(value)));
    });
    return settleAll(promises).then(result => {
      this._initialized = true;
      this._isValid = true;
      Logger.debug("Index created", result);
      return this;
    });
  }
  off(eventName, callback) {
    Assertions.AssertDBInitialized(this._initialized);
    this.removeListener(eventName, callback);
  }
  get ID() {
    Assertions.AssertDBInitialized(this._initialized);
    Assertions.AssertContextValid(this.isValid());
    return this._userId;
  }
  get DB() {
    Assertions.AssertContextValid(this.isValid());
    return this._db;
  }
  find(query) {
    Assertions.AssertDBInitialized(this._initialized);
    Assertions.AssertContextValid(this.isValid());
    //PouchDB.debug.enable('*');
    return this._db.find(query);
  }
  save(docType, docs) {
    Assertions.AssertDBInitialized(this._initialized);
    Assertions.AssertContextValid(this.isValid());
    let object = merge(docs, { docType: docType });
    //PouchDB.debug.enable('*');
    return this._db.put(object);
  }
  saveDocs(docs) {
    Assertions.AssertDBInitialized(this._initialized);
    Assertions.AssertContextValid(this.isValid());
    return this._db.bulkDocs(docs);
  }
  destroy() {
    Assertions.AssertDBInitialized(this._initialized);
    Assertions.AssertContextValid(this.isValid());
    this.emit("destroy");
    this.removeAllListeners();
    this._isValid = false;
    return this._db.destroy();
  }
  isValid() {
    return this._isValid;
  }
}
