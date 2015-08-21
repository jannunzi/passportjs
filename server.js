var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wbdb');

app.use(express.static(__dirname + '/public'));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var User = require("./user/user.model.js")();

app.post("/rest/user", function(req, res)
{
  var user = req.body
  user.roles = ["student"];
  User.findOne({username: user.username}, function(err, existingUser)
  {
    if(existingUser != null)
    {
      res.json(null);
      return;
    }
    else
    {
      User.create(user, function(err, result)
      {
        res.json(result);
      });
    }
  });
});

app.post("/rest/login", function(req, res)
{
  var user = req.body;
  User.findOne({username: user.username, password: user.password}, function(err, foundUser)
  {
    res.json(foundUser);
  });
});

app.put("/rest/update", function(req, res)
{
  User.findById(req.body._id, function(err, foundUser)
  {
    foundUser.update(req.body, function(err, count)
    {
      res.send(count);
    });
  });
});

app.listen(3000);