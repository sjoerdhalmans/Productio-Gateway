var express = require('express');
var router = express.Router()
var jwtAuthz = require('express-jwt-authz');
const redis = require("redis");

var options = {
    customScopeKey: 'permissions'
};

// Configures redis client
let
    /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
    client = redis.createClient({host: 'redis'});

router.get('/secureping', jwtAuthz(['read:feeds'], options), (req, res) => {
    res.send(client.publish('ping_me', 'test', redis.print));
})

module.exports = router