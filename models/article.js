//dependancies
var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//article model
var articleSchema = new Schema({

  title: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true
  },

  notes: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

var article = mongoose.model('article', articleSchema);


//export
module.exports = article;