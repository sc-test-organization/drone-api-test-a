const debug = require('debug')('sc.DroneApiTest!.CacheManagerFactory');

debug('Building CacheManager');

const CacheManager = require('@sharecare/cache-manager');

module.exports = new CacheManager();
