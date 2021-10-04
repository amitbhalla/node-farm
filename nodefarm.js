const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path/posix");

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);


const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    return output;
};


const server = http.createServer(
    (req, res) => {
        const { query, pathname } = url.parse(req.url, true);

        // Overview page
        if (pathname === "/" || pathname === "/overview" || pathname === "/overview/") {
            const cardsHtml = dataObj.map(product => replaceTemplate(tempCard, product)).join("");
            const overviewOutput = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(overviewOutput);

            // Product page
        } else if (pathname === "/product" || pathname === "/product/") {
            const product = dataObj[query.id];
            const output = replaceTemplate(tempProduct, product);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(output);

            // api page
        } else if (pathname === "/api") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);

            // 404 page
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h3>404 - Page not found!</h3>");
        }
    },
);

server.listen(
    3000, "0.0.0.0",
    () => {
        console.log("Listening to port 3000 on 0.0.0.0 ...");
    },
);
