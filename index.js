const http = require('node:http');
const fs = require('node:fs/promises');
require("dotenv").config();

console.log(process.env.NODE_ENV)

async function getHTML(filename) {
    return fs.readFile(`./${filename}.html`, 'utf8')
        .then(data => {
            return data;
        })
        .catch(e => {
            console.error(e)
            return ''
        })
}

async function getWebpageFromPath (path) {
    if (path == '') {
        path = 'index'
    }
    return await getHTML(path);
}   

async function processRequest(req, res) {
    const path = new URL(req.url, 'http://localhost:8080/')
                    .pathname
                    .slice(1);
    
    let html = await getWebpageFromPath(path)
    if (html === '') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        html = await getHTML('404')
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
    }
    res.end(html);
}

async function startServer() {
    const server = http.createServer(processRequest);

    server.listen(8080, 'localhost', () => {
        console.log('opened server on 8080')
    })
};



startServer();