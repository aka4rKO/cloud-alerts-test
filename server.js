const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/log') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      let message = '';

      if (body) {
        try {
          const parsed = JSON.parse(body);
          message = typeof parsed.message === 'string' ? parsed.message : '';
        } catch {
          sendJson(res, 400, { error: 'Invalid JSON body' });
          return;
        }
      }

      if (!message) {
        sendJson(res, 400, { error: 'message is required' });
        return;
      }

      console.log(`[LOG] ${message}`);
      sendJson(res, 200, { status: 'logged' });
    });

    return;
  }

  if (req.method === 'GET' && url.pathname === '/greet') {
    const name = (url.searchParams.get('name') || '').trim();

    if (!name) {
      sendJson(res, 400, { error: 'name query parameter is required' });
      return;
    }

    sendJson(res, 200, { greeting: `Hello, ${name}!` });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
