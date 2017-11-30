'use strict';

const config = {};
config.endpoint = process.env.COSMOS_DB_ENDPOINT;
config.primaryKey = process.env.COSMOS_PK;
config.database = {"id": "MonitoredSites"};
config.collection = {"id": "SiteCollection"};

module.exports = config;

/* user collection
userid
site collection id (sites that user is watching)
*/

/* site collection
site collection id
url string
phrases to watch associated with url [string]
body string
relevant changes [string]
last updated timestamp
*/