var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

/**function tryGetStatus(id) {
    var request = require("request");
    var url = "http://192.168.86.111/api/ce3fdkAFNsSPVulaUl9eAtdjhEkRfJ9Knwi17wTz/lights/"+id;
    console.log(url);
    request({
    uri: url,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    //console.log(body);
    return body;
    });
} **/

app.get('/', function (req, res) {
    res.render('pages/hello');
   //res.send('welcome to my hue app');
});

app.get('/alllights', function(req, res) {
    var urlOri = "http://192.168.86.111/api/ce3fdkAFNsSPVulaUl9eAtdjhEkRfJ9Knwi17wTz/lights/";
    var url = urlOri;
    //var url = +id;
    console.log(url);  

     var options = {
        uri: url,
        json: true
    }
    var rp = require('request-promise');
    rp(options)
    .then(function(body) {
        console.log(body);
        res.json(body);
    })
    .catch(function(err){
        console.log(err);
    });
});

app.get('/lights/:id', function(req, res) {
    var id = req.params.id;
    var urlOri = "http://192.168.86.111/api/ce3fdkAFNsSPVulaUl9eAtdjhEkRfJ9Knwi17wTz/lights/";
    var url = urlOri + id;
    //var url = +id;
    console.log(url);  

     var options = {
        uri: url,
        json: true
    }
    var rp = require('request-promise');
    rp(options)
    .then(function(body) {
        console.log(body);
        res.json(body);
    })
    .catch(function(err){
        console.log(err);
    });
});

app.post('/', function (req, res) {
    res.render('pages/hello');
    //res.send('POST request to the homepage');
});

// URL: curl -H "Content-Type: application/json" -X POST -d '{"on":false}' http://localhost:9000/state/4

app.post('/state/:id', function(req, res) {
    console.log(req.body);      // your JSON
    var body = req.body;
    var id = req.params.id;
    var urlOri = "http://192.168.86.111/api/ce3fdkAFNsSPVulaUl9eAtdjhEkRfJ9Knwi17wTz/lights/";
    var url = urlOri + id + "/state/";
    //var url = +id;
    console.log(url);  

     var options = {
        method: 'PUT',
        uri: url,
        json: body
    }
    var rp = require('request-promise');
    rp(options)
    .then(function(body) {
        console.log(body);
        res.json(body);
    })
    .catch(function(err){
        console.log(err);
        res.send("bad operation.");
    });

    //res.json(req.body);    // echo the result back


});

app.listen(9000);
console.log("starting express server on port 9000...");