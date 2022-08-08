const express = require("express");
const db = require("./model/mongo_connection");
const route = require("./router/routers");
const bodyParser = require("body-parser");
const morgan = require("morgan");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', route);  

app.listen(8000, () => {
    console.log("server is running......");
}); 
