'use strict';

const config = require("./config");
const httpStatusCodes = { NOTFOUND: 404 };
const databaseUrl = `dbs/${config.database.id}`;
const collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;
const documentClient = require("documentdb").DocumentClient;
const client = new documentClient(config.endpoint, {"masterKey": config.primaryKey});

function getDatabase() {
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

module.exports = {
  getDatabase
}