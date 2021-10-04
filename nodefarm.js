const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const server = http.createServer(
    (req, res) => {
        console.log(req.url);
        const reqURL = req.url;

        if (reqURL === '/' || reqURL === '/overview') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`Welcome to the ${reqURL} page`);
        } else if (reqURL === '/product') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`Welcome to the ${reqURL} page`);
        } else if (reqURL === '/api') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h3>404 - Page not found!</h3>');
        }
    },
);

server.listen(
    3000, '0.0.0.0',
    () => {
        console.log('Listening to port 3000 on 0.0.0.0 ...');
    },
);
