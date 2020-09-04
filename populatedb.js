#! /usr/bin/env node

var userArgs = process.argv.slice(2);
var async = require("async");
var Categories = require("./models/categories");
var Items = require("./models/items");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var items = [];

function createCategories(name, description, cb) {
  categorydetail = { name: name, description: description };

  var category = new Categories(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category:" + category);
    categories.push(category);
    cb(null, category);
  });
}

function createItems(name, description, category, price, stock, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  };
  var item = new Items(itemdetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item:" + item);
    items.push(item);
    cb(null, item);
  });
}

function initCategory(cb) {
  async.series(
    [
      function (callback) {
        createCategories("Body Parts", "Auto Body Parts & Mirrors", callback);
      },
      function (callback) {
        createCategories("Lighting", "Headlights & Lighting", callback);
      },
      function (callback) {
        createCategories("Engine Parts", "Engine & Drivetrain", callback);
      },
      function (callback) {
        createCategories("Steering", "Brakes, Suspension & Steering", callback);
      },
      function (callback) {
        createCategories("Interiors", "Interior Accessories", callback);
      },
      function (callback) {
        createCategories("Exteriors", "Exterior Accessories", callback);
      },
      function (callback) {
        createCategories("Wheels", "Wheels Parts", callback);
      },
    ],
    cb
  );
}

function initItems(cb) {
  async.parallel(
    [
      function (callback) {
        createItems(
          "Bumper Cover",
          "Brand New Bumper Cover",
          categories[0],
          200,
          10,
          callback
        );
      },
      function (callback) {
        createItems(
          "Passanger Side Headlight",
          "Passenger Side Headlight with bulb - Turn Signal buld",
          categories[1],
          29,
          5,
          callback
        );
      },
      function (callback) {
        createItems(
          "Exhaust",
          "Brand New Bumper Cover",
          categories[2],
          200,
          10,
          callback
        );
      },
      function (callback) {
        createItems(
          "Bumper Cover",
          "Brand New Bumper Cover",
          categories[3],
          200,
          10,
          callback
        );
      },
      function (callback) {
        createItems(
          "Bumper Cover",
          "Brand New Bumper Cover",
          categories[4],
          200,
          10,
          callback
        );
      },
      function (callback) {
        createItems(
          "Bumper Cover",
          "Brand New Bumper Cover",
          categories[5],
          200,
          10,
          callback
        );
      },
      function (callback) {
        createItems(
          "Bumper Cover",
          "Brand New Bumper Cover",
          categories[6],
          200,
          10,
          callback
        );
      },
    ],
    cb
  );
}

async.series([initCategory, initItems], function (err, results) {
  if (err) {
    console.log("FINAL ERR:" + err);
  } else {
    console.log("CREATE ENTRIES");
  }
  mongoose.connection.close();
});
