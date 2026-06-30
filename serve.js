const http = require('http');
const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname);
const server = http.createServer((req, res) => {
  let filePath = path.join(base, req.url);
  if (req.url === '/' || filePath.endsWith('/')) filePath = path.join(base, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const mime = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
      };
      res.writeHead(200, {'Content-Type': mime[ext] || 'application/octet-stream'});
      res.end(data);
    }
  });
});

const port = 8080;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
