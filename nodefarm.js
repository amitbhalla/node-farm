import { createServer } from "http";
import { readFileSync } from "fs";
import replaceTemplate from "./replaceTemplate.js";

const tempOverview = readFileSync("./templates/template-overview.html", "utf-8");
const tempCard = readFileSync("./templates/template-card.html", "utf-8");
const tempProduct = readFileSync("./templates/template-product.html", "utf-8");

const data = readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = createServer(
    (req, res) => {
        const baseURL = `http://${req.headers.host}`;
        console.log(baseURL);
        const requestURL = new URL(req.url, baseURL);
        console.log(requestURL);
        const pathname = requestURL.pathname;
        console.log(pathname);
        const query = requestURL.searchParams.get('id');
        console.log(query);

        // Overview page
        if (pathname === "/" || pathname === "/overview" || pathname === "/overview/") {
            const cardsHtml = dataObj.map(product => replaceTemplate(tempCard, product)).join("");
            const overviewOutput = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(overviewOutput);

            // Product page
        } else if (pathname === "/product" || pathname === "/product/") {
            const product = dataObj[query];
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
    () => { console.log("Listening to port 3000 on 0.0.0.0 ..."); },
);
