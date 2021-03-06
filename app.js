//////////////////////////////////  PACKAGES  //////////////////////////////////
const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const mongoose = require('mongoose');

const app = express();
////////////////////////////////////////////////////////////////////////////////


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


///////////////////////////////////  MONGODB  //////////////////////////////////
const db = "wikiDB";
// Local
const url = "mongodb://localhost:27017/" + db;
// Atlas
// const usr = "admin-jay";
// const pwd = "Test123";
// const url = "mongodb+srv://" + usr + ":" + pwd + "@cluster0.lphdq.mongodb.net/" + db;

// Establish connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema
const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Article title required."]
  },
  content: {
    type: String,
    required: [true, "Article content required."]
  }
});

// Create model
const Article = mongoose.model("article", articlesSchema);
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////  HOME  ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////  ARTICLES  //////////////////////////////////
app.route('/articles')
  .get(function(req, res) {
    Article.find({}, function(err, articles) {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    const article = new Article({
      title: req.query.title,
      content: req.query.content
    })

    article.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });
////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////  ARTICLE/?  //////////////////////////////////
app.route('/articles/:articleTitle')
.get(function(req, res) {
  Article.findOne({ title: req.params.articleTitle }, function(err, article) {
    if (!err) {
      res.send(article);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function(req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.query.title, content: req.query.content },
      { overwrite: true },
      function(err, article) {
      if (!err) {
        res.send("Successfully updated the article.");
      } else {
        res.send(err);
      }
    });
})

.patch(function(req, res) {
  Article.updateOne(
    { title: req.params.articleTitle },
    { $set: req.query },
    function(err, article) {
      if (!err) {
        res.send("Successfully updated the article.");
      } else {
        res.send(err);
      }
    });
})

.delete(function(req, res) {
  Article.deleteOne({ title: req.params.articleTitle }, function(err) {
    if (!err) {
      res.send("Successfully deleted the article.");
    } else {
      res.send(err);
    }
  });
});
////////////////////////////////////////////////////////////////////////////////


app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
