const { createServer } = require('http');
const { createApp, fromNodeMiddleware, toNodeListener } = require('h3');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const h3App = createApp();

  h3App.use(
    fromNodeMiddleware(async (req, res) => {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    }),
  );

  const server = createServer(toNodeListener(h3App));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
