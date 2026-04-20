import http from 'http';
import path from 'path';
import fs from 'fs';

const startServer = (port = 3000) => {
  const DIST_DIR = './dist';

  const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
  };

  const SERVER = http.createServer((request, response) => {
    let filePath = request.url === '/' ? '/index.html' : request.url;

    const fullPath = path.normalize(path.join(process.cwd(), DIST_DIR, filePath));

    const distFullPath = path.normalize(path.join(process.cwd(), DIST_DIR));
    if (!fullPath.startsWith(distFullPath)) {
      response.writeHead(403, { 'Content-Type': 'text/plain' });
      response.end('Erreur 403 : Accès interdit !');
      return;
    }

    fs.readFile(fullPath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          response.writeHead(404, { 'Content-Type': 'text/plain' });
          response.end('Erreur 404 : Page introuvable !');
        } else {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Erreur 500 : Erreur interne du serveur.');
        }
        return;
      }

      const ext = path.extname(fullPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content);
    });
  });

  SERVER.listen(port, () => {
    console.log(`🌍 Serveur démarré sur http://localhost:${port}`);
    console.log(`💡 Appuyez sur Ctrl+C pour arrêter.`);
  });
};

export { startServer };
