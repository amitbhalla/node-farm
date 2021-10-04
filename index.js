const http = require("http");

const server = http.createServer(
    (req, res) => {
        res.end("Hello from the server!")
    }
);

server.listen(3000, "0.0.0.0",
    () => { console.log("Listening to requests from 0.0.0.0 on port 3000"); }
);