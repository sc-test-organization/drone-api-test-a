const debug = require('debug')('sc.DroneApiTestA.RequestFactory');

debug('Building Request');

const cacheManager        = require('./cache-manager');
const requestLocalContext = require('./request-local-context');

const request = require('@sharecare/request');

const requestConfig    = new request.Config();
requestConfig.cacheDNS = true;

module.exports = new request(cacheManager, requestLocalContext, requestConfig);
