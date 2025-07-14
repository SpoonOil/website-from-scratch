const http = require('node:http');
const fs = require('node:fs/promises');
require("dotenv").config();
const express = require('express');
const app = express();

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

app.get('/', async (req, res) => {
    const html = await getHTML('index')

    res.send(html)
})

app.get('/about', async (req, res) => {
    const html = await getHTML('about')

    res.send(html)
})

app.get('/contact-me', async (req, res) => {
    const html = await getHTML('contact-me')

    res.send(html)
})

app.listen(8080, () => {
    console.log('now listening with express')
})
