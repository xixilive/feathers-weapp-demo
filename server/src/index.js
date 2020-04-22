/* eslint-disable no-console */
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  console.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
