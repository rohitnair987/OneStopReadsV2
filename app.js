var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var USER_COLLECTION = "users";

app.get('/', function(req, res){
   res.send("Hello world!");
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/OneStopReadsV2", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

 // Save database object from the callback for reuse.
 db = client.db();
 console.log("Database connection ready");

});
app.post("/api/register", function(req, res) {
  var newUser = req.body;
  //newUser.createDate = new Date();
  console.log(req.body);

  if (!req.body) {
    handleError(res, "Invalid user input", "Must provide a email.", 400);
  } else {
    db.collection(USER_COLLECTION).insertOne(newUser, function(err, doc) {
      if (err) {
       console.log("Failed to create new contact.");
      } else {
      	console.log(doc.ops[0]);
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.listen(3000);