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


app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));