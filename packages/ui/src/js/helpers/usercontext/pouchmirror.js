import EventEmitter from "events";
import Logger from "../logger.js";

var pouchMirrorLocalFirst = function(localDB, remoteDB) {
  var self = this;
  this.isSynchronized = false;

  this.remoteDB = remoteDB;
  this.localDB = localDB;
  // Use RemoteDB till the initial sync is finished.
  this.DB = this.remoteDB;

  // Tracks the destroy pending promise when
  // destroy detects an ongoing sync.
  this.pendingDestroy = null;

  // This method listens to changes in the LocalDB and calls
  // replication within 3 sec if changes detected.
  // It also reschedules replication if another change
  // is detected within this time-frame.
  function listenChanges(db) {
    self.changes = db
      .changes({
        since: "now",
        live: true,
        conflicts: true
      })
      .on("change", function(change) {
        Logger.debug("changes", change);
        if (self.replicationHandle) {
          clearTimeout(self.replicationHandle);
          self.replicationHandle = null;
          Logger.debug("previous sync call is aborted.");
        }
        self.replicationHandle = setTimeout(
          replicateDataToRemote.bind(self),
          300
        );
      })
      .on("complete", function(info) {
        Logger.debug("Changes are done.");
      })
      .on("error", function(err) {
        Logger.error(err);
      });
  }

  // This API synchronizes changes between local and remote.
  function replicateDataToRemote() {
    if (self.DB == self.localDB) {
      self.emit("delta-sync-started");
      self.DB.sync(remoteDB)
        .on("change", function(change) {
          self.emit("delta-sync-changes-detected", change);
          Logger.debug("changes", change);
        })
        .on("denied", function(err) {
          self.emit("delta-sync-failed", err);
          Logger.error(err);
        })
        .on("complete", function(info) {
          self.replicationHandle = null;
          Logger.debug("Changes are synchronized");
          self.emit("delta-sync-completed", info);
          if (self.pendingDestroy) {
            Logger.debug("Pending destroy detected, invoking it.");
            self.destroy().then(() => {
              self.pendingDestroy();
              self.pendingDestroy = null;
            });
          }
        })
        .on("error", function(err) {
          self.emit("delta-sync-failed", err);
          Logger.error(err);
        });
    }
  }

  // Start the initial synchronization between Local and Remote.
  self.emit("initial-sync-started");
  this.localDB
    .sync(remoteDB)
    .on("change", function(change) {
      self.emit("initial-sync-changes-detected", change);
      Logger.debug("Initial sync > changes detected", change);
    })
    .on("denied", function(err) {
      //self.DB = self.localDB;
      self.emit("initial-sync-failed", err);
      Logger.error(err);
    })
    .on("complete", function(info) {
      Logger.debug("Initial sync completed.");
      self.DB = self.localDB;
      self.emit("initial-sync-completed", info);
      listenChanges(self.DB);
    })
    .on("error", function(err) {
      self.DB = self.localDB;
      self.emit("initial-sync-failed", err);
      Logger.error(err);
    });

  this.remoteDB
    .changes({
      since: "now",
      live: true,
      include_docs: true
    })
    .on("change", function(change) {
      Logger.debug("delta-remote-changes-detected: ", change);
      let { doc } = change;
      if (doc.docType === "surveyresponse" || doc.docType === "publishedsurvey")
        replicateDataToRemote();
    })
    .on("error", function(err) {
      Logger.error("delta-remote-error-detected: " + err);
      self.emit("delta-remote-error-detected", err);
    });
};

export default pouchMirrorLocalFirst;

pouchMirrorLocalFirst.prototype = Object.create(EventEmitter.prototype);

pouchMirrorLocalFirst.prototype.createIndex = function(obj) {
  return this.localDB.createIndex(obj);
};

pouchMirrorLocalFirst.prototype.destroy = function(obj) {
  if (this.replicationHandle) {
    Logger.debug("Destroy > Detected pending sync. Pooled the destroy.");

    return new Promise((resolve, reject) => {
      // This resolve will be invoked in replicateDataToRemote.
      this.pendingDestroy = resolve;
    });
  }
  this.cancelChanges();
  return this.localDB.destroy(obj);
};

pouchMirrorLocalFirst.prototype.find = function(obj) {
  return this.DB.find(obj);
};

pouchMirrorLocalFirst.prototype.getIndexes = function() {
  return this.DB.getIndexes();
};

pouchMirrorLocalFirst.prototype.deleteIndex = function(obj) {
  return this.DB.deleteIndex.apply(obj);
};

pouchMirrorLocalFirst.prototype.get = function() {
  return this.DB.get.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.allDocs = function() {
  return this.DB.allDocs.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.put = function() {
  return this.DB.put.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.post = function() {
  return this.DB.post.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.bulkDocs = function() {
  return this.DB.bulkDocs.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.remove = function() {
  return this.DB.remove.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.changes = function() {
  return this.DB.changes.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.replicate = function() {
  return this.DB.replicate.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.sync = function() {
  return this.DB.sync.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.putAttachment = function() {
  return this.DB.putAttachment.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.getAttachment = function() {
  return this.DB.getAttachment.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.removeAttachment = function() {
  return this.DB.removeAttachment.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.query = function() {
  return this.DB.query.apply(this.DB, arguments);
};

pouchMirrorLocalFirst.prototype.info = function() {};

pouchMirrorLocalFirst.prototype.cancelChanges = function() {
  if (this.changes.cancel) this.changes.cancel();
};
