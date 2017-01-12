const http = require('http');

const hostname = 'localhost';
const port = 3001;
const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Hello Worlds');
});

server.listen(port, hostname, function(){
    console.log(`Server is running at http://${hostname}:${port}`);
});