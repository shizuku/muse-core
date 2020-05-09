const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    });
    fs.readFile('index.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("response");
        res.end(JSON.stringify(JSON.parse(data.toString())));
    });
}).listen(8888);