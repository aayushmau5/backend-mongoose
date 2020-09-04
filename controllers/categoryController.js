const Categories = require("../models/categories");
const Items = require("../models/items");
const async = require("async");

exports.index = function (req, res, next) {
  async.parallel(
    {
      category_count: function (callback) {
        Categories.countDocuments({}, callback);
      },
      item_count: function (callback) {
        Items.countDocuments({}, callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Car Parts",
        categoryCount: results.category_count,
        itemCount: results.item_count,
      });
    }
  );
};

exports.categoryList = function (req, res, next) {
  Categories.find().exec(function (err, categories) {
    if (err) {
      return next(err);
    }
    res.render("category_list", {
      title: "Parts Categories",
      categories: categories,
    });
  });
};

exports.categoryItems = function (req, res, next) {
  Items.find({ category: req.params.id }).exec(function (err, items_list) {
    if (err) {
      return next(err);
    }
    res.render("items_list", { title: "Items", items: items_list });
  });
};
