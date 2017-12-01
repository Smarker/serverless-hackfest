'use strict';

const config = {};
config.endpoint = process.env.COSMOS_DB_ENDPOINT;
config.primaryKey = process.env.COSMOS_PK;
config.database = {"id": "MonitoredSites"};
config.siteCollection = {"id": "SiteCollection"};

module.exports = config;