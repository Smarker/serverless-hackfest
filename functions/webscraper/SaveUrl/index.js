'use strict';

const config = require("../../../database/config.js");
const cosmosClient = require("../../../database/CosmosClient.js");
const databaseUrl = `dbs/${config.database.id}`;
const siteCollectionUrl = `${databaseUrl}/colls/${config.siteCollection.id}`;

module.exports = function (context, req) {
  cosmosClient.getOrCreateDatabase()
  .then(database => { 
    console.log(database);
    return cosmosClient.getOrCreateCollection(siteCollectionUrl) 
  })
  .then(sites => { console.log(`Completed successfully`, sites); })
  .catch(error => { console.log(`Completed with error ${JSON.stringify(error)}`) });

  //example
  context.log('JavaScript HTTP trigger function processed a request.');
  if (req.query.name || (req.body && req.body.name)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: "Hello " + (req.query.name || req.body.name)
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
  context.done();
};
