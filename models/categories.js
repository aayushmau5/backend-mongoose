var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
});

CategoriesSchema.virtual("url").get(function () {
  return "/" + this._id;
});

module.exports = mongoose.model("Categories", CategoriesSchema);
