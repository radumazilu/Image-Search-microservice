var express = require("express");
var path = require("path");
var http = require("http");
var url = require("url");
var routes = require("./app/routes/routes.js");
var api = require("./app/api/image-search.js");
var app = express();
require("dotenv").config({
    silent: true
});

app.set("views", path.join(__dirname + '/views'));
app.set("view engine", "jade");

// -- Mongoose configuration --
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongouri = "mongodb://localhost:27017/image-search" || process.env.MONGOLAB_URI

var history = new Schema({
  term: String,
  date: String
})

var History = mongoose.model('History', history);
mongoose.connect(mongouri);
// -- End Mongoose configuration --

api(app, History);
routes(app);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log('Node.js listening to PORT ' + PORT);
})
