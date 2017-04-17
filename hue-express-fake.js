var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

var router = express.Router();

router.route('/')
    .post(function(req, res) {
        console.log(req.json);
        res.render('pages/hello');
    })
    .get(function(req, res) {
        res.render('pages/hello');
});

router.route("/about")
    .get(function(req, res) {
        res.render('pages/about');
    });

router.route('/alllights')
    .get(function(req, res) {
    var body = [
        {
            "id" : 4,
            "state": "on",
            "bri": 254,
            "type": "Dimmable Light"
        }, 
        {
           "id" : 5,
            "state": "on",
            "bri": 100,
            "type": "Dimmable Light"
        }
    ]
    res.render('pages/alllights', {lights: body});
});


router.route('/lights/:id')
    .post(function(req, res) {
        // need ->  
        //console.log(req.body);
        
        var id = req.params.id;
        var body = req.body;
        console.log(body);
        res.render('pages/singlelight', { lightinfo: body });

        })
        .get(function(req, res) {
        var id = req.params.id;
        var body = {
            "id" : id,
            "state": "on",
            "bri": 254,
            "type": "Dimmable Light"
        }
        res.render('pages/singlelight', { lightinfo: body });
    
});

/** 

app.get('/alllights', function(req, res) {
    var body = {
        "lights" : {
            "4": {
                "id" : "4",
                "state": "on"
            }, 
            "5" : {
                "id" : "5",
                "state": "on"
            }
        }
    }
    res.json(body);
});

app.get('/lights/:id', function(req, res) {
    var id = req.params.id;
    var body = {
        "id" : id,
        "state": "on"
    }
    res.json(body);
    
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

**/

app.use("/", router);

app.listen(9000);
console.log("starting express server on port 9000...");