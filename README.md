# cloud-alerts-test

Simple Node.js HTTP service with two endpoints:

- `POST /log` logs a message to the server console
- `GET /greet?name=...` returns a greeting for the given name

## Run

```bash
node server.js
```

The server runs on port `3000` by default (or `PORT` environment variable).

## Examples

Log a message:

```bash
curl -X POST http://localhost:3000/log \
  -H 'Content-Type: application/json' \
  -d '{"message":"hello from client"}'
```

Get a greeting:

```bash
curl 'http://localhost:3000/greet?name=Alice'
```
