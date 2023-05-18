const express = require("express")
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')



module.exports = (app) => {
    app.use(express.json())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())

};
