//Dependencies

var express = require("express");
var bodyParser = require("bosy-parser");
var logger = require("morgan");
var mongoose = require("monogoose");
var request = require("request");
var cheerio - require("cheerio");


//require  our models for note and article
var note = require("./models/note.js");
var article = require("./models/article.js");


//Define port
var PORT = process.env.PORT || 3000;

//Initialize express
var app = express();

//Adding morgan (logging requests) and body parser (form submission)
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended:false
}));

//serve static content
app.use(express.static("public"));

// Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Import routes
var routes = require("./controllers/scrape.js");



//Mongoose configuration --- Check thiss connection --
var db = mongoose.connection;
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/3000");


// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



//Listener
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});