var express = require("express");

var Router = express.Router();

var categoryController = require("../controllers/categoryController");
var itemController = require("../controllers/itemController");

Router.get("/", categoryController.index);
Router.get("/items", itemController.itemIndex);

module.exports = Router;
