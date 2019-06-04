const debug = require('debug')('sc.DroneApiTestA.RequestLocalContextFactory');

debug('Building RequestLocalContext');

const RequestLocalContext = require('@sharecare/request-local-context');

module.exports = new RequestLocalContext();
