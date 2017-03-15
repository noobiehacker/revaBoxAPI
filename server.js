var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.status(200).send('ok');
});

app.get('/category', function (req, res) {
  client = createBoxClient()
  client.folders.getItems('0', null, function(err, data) {
    result = {
      "category" : [
        {
          "name": "Engineering",
          "id": "17549929803"
        },
        {
          "name": "Finance",
          "id": "17467611887"
        },
        {
          "name": "HR",
          "id": "17470515671"
        }
      ]
    }
    res.status(200).send(result);
  });
});

app.get('/subCategory', function (req, res) {
  category = req.query.category
  client = createBoxClient()
  client.folders.getItems(category, null, function(err, data) {
    result = {
      "subCategory" : [
        {
          "id": "17999076284",
          "name": "Invoices"
        },
        {
          "id": "18008543219",
          "name": "POD"
        }
      ]
    }
    res.status(200).send(result);
  });
});

app.get('/group', function (req, res) {
  client = createBoxClient()
  client.groups.getAll({limit:100},function(err, data) {
    res.status(200).send(data);
  });
});

app.get('/file', function (req, res) {
  client = createBoxClient()
  client.folders.getItems('0', null, function(err, data) {
    res.status(200).send(data);
  });
});

app.get('/collection', function (req, res) {
  client = createBoxClient()
  client.collections.getAll(function(err, data) {
    res.status(200).send(data);
  });
});

app.get('/user', function (req, res) {
  client = createBoxClient()
  client.enterprise.getUsers(null, function(err, data) {
    res.status(200).send(data);
  });
});

var server = app.listen(5000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;

function createBoxClient() {
  var BoxSDK = require('box-node-sdk');

  var sdk = new BoxSDK({
    clientID: '6rassr1x5u0zic78ra1r7n83grn0v5yd',
    clientSecret: '4Y9RpnpW2YVFpPwYytI0wLIEQWO9r6y5'
  });

  // Create a basic API client
  var box = sdk.getBasicClient('uQm6Py330Xdi55SojhHZQdxDYKS28KKc');

  return box
}
