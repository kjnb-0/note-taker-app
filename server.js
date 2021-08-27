//dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");
// app should have db.json file on the backend used to store and retrieve notes using the fs module.

//sets up express server and initial port for listeners
var app = express();
var PORT = process.env.PORT || 3000;