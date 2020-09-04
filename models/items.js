var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemsSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  category: { type: Schema.Types.ObjectId, ref: "Categories", required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
});

ItemsSchema.virtual("url").get(function () {
  return "/items/" + this._id;
});

module.exports = mongoose.model("Items", ItemsSchema);
