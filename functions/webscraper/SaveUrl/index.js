'use strict';

const config = require("./config");
const cosmosClient = require("./CosmosClient");

module.exports = function (context, req) {
  cosmosClient.getDatabase()
  .then(() => { console.log(`Completed successfully`); })
  .catch((error) => { console.log(`Completed with error ${JSON.stringify(error)}`) });
  /*
  req sends:
  data = [
    {
      url: "zara/someItem",
      monitoredPhrases: ["$35.00"]
    },
    {
      url: "amazon/someItem",
      monitoredPhrases: ["out of stock"]
    }
    ...
  ]

  insert them into cosmos db
  */

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
