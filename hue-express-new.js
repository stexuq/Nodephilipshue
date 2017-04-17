var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlOri = "http://192.168.1.6/api/cJ23p6wZNUarNRb5Y6SsY5aCyDhVRaIjtg2qC5Xh/lights/";

app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// set up a default router
var router = express.Router();

router.route('/')
    .post(function(req, res) {
        //console.log(req.json);
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

        var url = urlOri;
        //var url = +id;
        //console.log(url);  

        var options = {
            uri: url,
            json: true
        }
        var rp = require('request-promise');
        rp(options)
        .then(function(body) {
            //console.log(body);
            var info = [];
            for (var key in body) {
                var single = body[key]["state"];
                single["id"] = key;
                info.push(single);
            }
            //console.log(info);
            res.render('pages/alllights', {lights: info});
        })
        .catch(function(err){
            console.log(err);
        });
});


router.route('/lights/:id')
    .post(function(req, res) {
        // need ->  
        //console.log(req.body);
        
        var id = req.params.id;
        var data = req.body.data;
        //console.log(data);

        state = data["on"];
        //console.log(state);
        bright = data["bri"];
        //console.log(bright);

        var url = urlOri + id + "/state/";
        //console.log(url);  

        var options = {
            method: 'PUT',
            uri: url,
            json: data
        }
        var rp = require('request-promise');
        rp(options)
        .then(function(body) {
            //console.log("-----------");
            //console.log(body);
            //res.json(body);
            //res.render('pages/singlelight', { lightinfo: body });
            //res.redirect('/'+id);
        })
        .catch(function(err){
            console.log(err);
            res.send("bad operation.");
        });

        //res.json(req.body);    // echo the result back
        

    })
    .get(function(req, res) {
        var id = req.params.id;
        var url = urlOri + id;
        //console.log(url);  

        var options = {
            uri: url,
            json: true
        }
        var rp = require('request-promise');
        rp(options)
        .then(function(body) {
           
            var single = body["state"];
            var reachable = single["reachable"];
            var onstate = single["on"];
            if (reachable && onstate) {
                single["class"] = "success";
            } else if (reachable) {
                single["class"] = "warning";
            } else {
                single["class"] = "danger";
            }
            single["id"] = id;
            //  console.log(single);
            res.render('pages/singlelight', { lightinfo: single });
        })
        .catch(function(err){
            console.log(err);
        });
    
    });


app.use("/", router);

app.listen(9100);
console.log("starting express server on port 9100...");