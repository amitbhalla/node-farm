const http = require("http");
const url = require("url");

const server = http.createServer(
    (req, res) => {
        console.log(req.url);
        const pathName = req.url;
        if (pathName === "/" || pathName === "/overview") {
            res.end("This is the overview page!");
        }
        else if (pathName === "/product") {
            res.end("This is the product page!");
        }
        else {
            res.writeHead(404, {
                "Content-Type": "text/html",
            });
            res.end("<h1>404 - Page not found.</h1>");
        }
    }
);

server.listen(
    3000,
    "0.0.0.0",
    () => {
        console.log("Listening to requests from 0.0.0.0 on port 3000");
    }
);
