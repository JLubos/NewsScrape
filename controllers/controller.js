//Dependancies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var Note = require("../models/note.js");
var Article = require("../models/article.js");

var router = express.Router();
mongoose.Promise = Promise;


//render the homepage route
router.get("/", function(req,res){
	res.render("index");
});

//put the article in an object
router.get("/save", function(req,res){
	article.find({}, function(error, result){
		if(error){
			console.log(error);
		} else{
			var articleObj ={
				articles: result
			};
			//Call save handlrbars page
			res.render("save", articleObj);
		}

	});
});



//post request for scrape route
router.post("/scrape", function(req,res){

	//scrape
	request("http://www.nytimes.com/", function(error, response,html){
		var $ = cherio(html);
		var scrapedArticles = {};

		$("article h2").each(function(i, element){
			var result = {};
			result.title = $this.children("a").text();
			console.log(result.title);
			result.link = $(this).children("a").attr("href");
			scarpedArticles[i] = result;
		});

		var articleObj = {
			articles: scrapedArticles
		};
		//render the index page
		res.render("index", articleObj)
	});
});


//delete route
router.get("/delete/:id", function(req,res){
	article.findOneAndRemove({"_id": req.params.id}, function(err,result){
		if(err){
			console.log(err);
		} else{
			console.log("Deleted");
		}
		res.redirect("/save");
	});

});






router.get("/notes/:id", function(req,res){
	Note.findOneAndRemove({"_id": req.params.id}, function(err,result){
		if(err){
			console.log(err);
		} else{
			console.log("Deleted");
		}
		res.send(result);
	});
});




router.get("/articles/:id", function(req,res){
	article.findOne({"_id": req.params.id})
	.populate('notes')
	.exec(function(err,result){
		if (err){
			console.log("Cant find artcle and notes");
		} else{
			res.json(result);
		}
		
	});
});


router.post("/articles/:id", function(req,res){
	var newNote = new Note(req.body);
	newNote.save(function(error, result){
		if (err){
			console.log("Cannot find article.");
		} else{
			article.findOneAndUpdate({ "_id": req.params.id}, {$push: {notes: doc._id}}, {new: true, upset: true})
			.populate('notes')
			.exec(function(err,result){
				if(err){
					console.log("Cannot find article");
				} else{
					console.log(doc.notes);
					res.send(result);
				}
			});

		}
	});
});







module.exports = router;