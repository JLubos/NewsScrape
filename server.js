//Dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");


//require  our models for note and article
var note = require("./models/note.js");
var article = require("./models/article.js");
mongoose.Promise = Promise;



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
var routes = require("./controllers/controller.js");

app.use("/", routes);
mongoose.connect("mongodb://heroku_5mndk9ps:qafgvjmn5pcir0j5nup3e1adh9@ds121696.mlab.com:21696/heroku_5mndk9ps");


//Mongoose configuration --- Check thiss connection --
var db = mongoose.connection;

mongoose.connect("mongodb://localhost/3000");

//If theres an error
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



//Listener
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});