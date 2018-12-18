var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

const { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
const ClientId = "710823979466-f27mem5i9bmt8q8383fevgnbd5rign01.apps.googleusercontent.com";
const ClientSecret = "CyH8pE4s1yj9gaAxHTETp_U3";
const RedirectionUrl = "http://localhost:4200/oauthCallback";

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

var USER_COLLECTION = "users";
var SOURCE_COLLECTION = "sources";

// app.get('/', function(req, res) {
//     res.send("Hello world!");
// });

app.get("/", function(req, res) {
    var url = getAuthUrl();
    res.send(url);
    //res.send('&lt;h1&gt;Authentication using google oAuth&lt;/h1&gt;&lt;a href="+url+"&gt;Login&lt;/a&gt;')
});
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/OneStopReadsV2", function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

app.post("/api/register", function(req, res) {
    var newUser = req.body;
    //newUser.createDate = new Date();
    console.log(req.body);

    if (!req.body) {
        handleError(res, "Invalid user input", "Must provide a email.", 400);
    } else {
        db.collection(USER_COLLECTION).insertOne(newUser, function(err, doc) {
            if (err) {
                console.log("Failed to create new user.");
            } else {
                console.log(doc.ops[0]);
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});



function getOAuthClient() {
    return new OAuth2(ClientId, ClientSecret, RedirectionUrl);
}

function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    // generate a url that asks permissions for Google+ and Google Calendar scopes
    var scopes = [
        'https://www.googleapis.com/auth/plus.me'
    ];

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes // If you only need one scope you can pass it as string
    });

    return url;
}

app.post("/api/login", function(req, res) {
    console.log(req.body.email);

    // var y = db.collection("users").find({ email: 'nikithauc@gmail.com', password: "hh" }).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     //db.close();
    // });;

    let y = 9;
    var x = db.collection("users").countDocuments({ email: req.body.email, psw: req.body.password }).then(function(count) {
        console.log(count);
        y = count;
        res.status(200).send(y.toString());
        //res.status(200).send(count);;

    });
    //db.close();

    console.log('hduh ' + y + ' dsfds' + x);
    // res.send('success' + y);
});

// Source endpoints.
sourceApiPrefix = '/api/source';

app.get(`${sourceApiPrefix}/get`, function(req, res) {
    db.collection(SOURCE_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get sources.");
        } else {
            res.status(201).json(docs);
        }
    });
});

app.get(`${sourceApiPrefix}/get/:id`, function(req, res) {
    db.collection(SOURCE_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get source.");
        } else {
            res.status(201).json(docs);
        }
    });
});

app.post(`${sourceApiPrefix}/add`, function(req, res) {
    var source = req.body;
    source.dateLastModified = new Date();

    if (!req.body) {
        handleError(res, "Invalid user input", "Must provide a name and a url.", 400);
    } else {
        db.collection(SOURCE_COLLECTION).insertOne(source, function(err, doc) {
            if (err) {
                console.log("Failed to create new source.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });
    }
});

app.post(`${sourceApiPrefix}/update`, function(req, res) {
    var source = req.body;
    id = source._id;
    delete source._id;
    source.dateLastModified = new Date();

    if (!req.body) {
        handleError(res, "Invalid user input", "Must provide a name and a url.", 400);
    } else {
        db.collection(SOURCE_COLLECTION).updateOne({ _id: new ObjectID(id) }, { $set: source }, { upsert: true, new: true },
            function(err, doc) {
                if (err) {
                    handleError(res, err.message, "Failed to add or update source.");
                } else {
                    source._id = id;
                    res.status(201).json(source);
                }
            }
        );
    }
});

app.delete(`${sourceApiPrefix}/delete/:id`, function(req, res) {
    db.collection(SOURCE_COLLECTION).deleteOne({ _id: new ObjectID(req.params.id) }, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete source.");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

app.listen(3000);