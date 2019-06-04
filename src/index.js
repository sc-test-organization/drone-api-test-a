const config = require('config');
const log = require('bunyan').createLogger({name : 'drone-api-test-a'});

process.title = config.get('bind.name');

const cluster = require('cluster');

let numThreads = Number(config.get('bind.threads'));
if (numThreads > 1 && cluster.isMaster) {
  while (numThreads--) cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    log.warn({pid : worker.process.pid}, 'worker %s died');
    cluster.fork();
  });
} else {
  process.on('uncaughtException', (err) => {
    log.error({err, stack: err.stack});
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    log.error({err, stack: err.stack});
    process.exit(1);
  });

  require('./app');
}
