var Categories = require("../models/categories");
var Items = require("../models/items");

exports.itemIndex = function (req, res, next) {
  Items.find().exec(function (err, items_list) {
    if (err) {
      return next(err);
    }
    res.render("items_list", { title: "Items", items: items_list });
  });
};
