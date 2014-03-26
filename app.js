'use strict';

var request = require('request');
var restify = require('restify');
var _ = require('lodash');
var chalk = require('chalk');

// var fs = require
var server = restify.createServer({
    name: 'adoptDenver',
    version: '0.0.1'
});

var desc, _id;

var endpoint = 'http://www.petharbor.com/petoftheday.asp?shelterlist=%27DNVR%27&imgwid=160&imght=120&imgname=POD&bgcolor=FFFFFF&fgcolor=000000&type=dog&border=0&availableonly=1&SEQ=0&SHOWSTAT=1&fontface=arial&fontsize=2&noclientinfo=0&bigtitle=1&source=results';

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

// CORS
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());

// Load the library
var nStore = require('nstore');
// Create a store
var pets = nStore.new('data/pets.db', function(err) {
    if(err) throw err; 
});

server.get('/api', function(req, res, next) {
    makeRequest(req, res, next);
});

server.get('/api/:id', function(req, res, next) {
    console.log(req.params.id);
    res.send(req.params.id);
});


function makeRequest(req, res, next) {
    request(endpoint, function(err, req, body) {
        if (err) return next(err);

        try {
            var idParams = /ID=([^&]+)/gi.exec(body)
        } catch (e) {
            throw e;
        };

        _id = idParams[1];

        var endpointTwo = 'http://www.petharbor.com/detail.asp?ID=' +
            _id + '&LOCATION=DNVR&searchtype=rnd&shelterlist=%27DNVR%27&where=dummy&kiosk=1';

        request(endpointTwo, function(err, req, body) {
            if (err) return next(err);
            try {
                var nameParams = /<font\ class="Title">*([^&]+)/gi.exec(body);
            } catch (e) {
                throw e;
            }
            if (_.isNull(nameParams)) {
                console.log('printing nameParams : ' + nameParams);
                next(new restify.InvalidArgumentError('error in parsing first response, got null from nameParams'));
                res.end();
            }
            var name = nameParams[1];
            var stringRegExp = _id + "<BR><BR><\/font>(.*?)<BR><br>";
            var _regex = new RegExp(stringRegExp, "g");
            var responseBody = _regex.exec(body);

            try {
                if (_.isNull(responseBody)) {
                    console.log('printing : ' + responseBody);
                    next(new restify.InvalidArgumentError('error in parsing second response, got null from responseBody'));
                } else {
                    var desc = responseBody[1];
                }
            } catch (e) {
                throw e;
            }

            desc = desc
                .replace(/<BR><BR>/, " ")
                .replace(/<BR><BR>/, " ")
                .replace(/<br><br>/, " ");

            // payload for request
            var animaldata = {
                name: name,
                pic: "http://www.petharbor.com/get_image.asp?RES=detail&ID=" + _id + "&LOCATION=DNVR",
                id: _id,
                link: "http://www.petharbor.com/pet.asp?uaid=DNVR." + _id,
                desc: desc
            };

            pets.save(_id, {
                name: name,
                desc: desc
            }, function(err) {
                if (err) {
                    throw err;
                }
            });

            res.send(animaldata);
            return next();
        });
    });
}

server.get(/.*/, restify.serveStatic({
    // server.get(/^\/.*$/, restify.serveStatic({
    'directory': './public',
    'default': 'index.html'
}));

var port = process.env.PORT || 8080;
server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});
