var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const chalk = require("chalk");
const cors = require('cors');
const apiRouter = require("./routes/api");
const initailData = require("./initailData/initailData");


var app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
}));

app.use(cors());

app.use(logger((tokens, req, res) => {
    return [
        new Date().toISOString().replace("T", " "),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
initailData();
app.use("/api", apiRouter)

app.use((req, res, next) => {
    res.status(404).json({ err: "page not found" })
})

module.exports = app;
