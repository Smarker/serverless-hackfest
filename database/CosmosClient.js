'use strict';

const config = require("./config");
const httpStatusCodes = { NOTFOUND: 404 };
const databaseUrl = `dbs/${config.database.id}`;
const documentClient = require("documentdb").DocumentClient;
const client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

function getOrCreateDatabase() {
  return new Promise((resolve, reject) => {
    if (!databaseUrl || databaseUrl.length === 0) return reject('Cosmos database url not defined.');

    if (!client) return reject('No client defined.');
    try {
      client.readDatabase(databaseUrl, (err, result) => {
        if (err) {
          if (err.code == httpStatusCodes.NOTFOUND) {
            client.createDatabase(config.database, (err, created) => {
              if (err) reject(err)
              else resolve(created);
            });
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    } catch (exception) {
      console.log(exception);
      reject(exception);
    }
  });
}

function getOrCreateCollection(collectionUrl) {
  return new Promise((resolve, reject) => {
    if (!collectionUrl || collectionUrl.length === 0) return reject('Cosmos collection url not defined.');    
    if (!databaseUrl || databaseUrl.length === 0) return reject('Cosmos database url not defined.');
    
    if (!client) return reject('No client defined.');
    try {
      client.readCollection(collectionUrl, (err, result) => {
        if (err) {
          if (err.code == httpStatusCodes.NOTFOUND) {
            client.createCollection(databaseUrl, collectionUrl, { offerThroughput: 400 }, (err, created) => {
              if (err) reject(err)
              else resolve(created);
            });
          } else {
            reject(err);
          }
        } else {
          resolve(result);
        }
      });
    } catch (exception) {
      console.log(exception);
      reject(exception);
    }
  });
}

module.exports = {
  getOrCreateDatabase,
  getOrCreateCollection
}