
process.env.UV_THREADPOOL_SIZE = 1;   // default is 4 threads

const cluster = require('cluster');
const crypto = require('crypto');
const express = require('express');
const app = express();

if (cluster.isMaster) {
  // Cause index.js to be executed 'again' but in a child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // Im a child, Im going to act like a server and do nothing else
  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('That was fast!');
  });

  app.listen(3000, () => console.log('server is on...'));
}
