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
    client = redis.createClient({
        port: 6379,               // replace with your port
        host: '127.0.0.1',        // replace with your hostanme or IP address
    });

router.post('/updatepassword', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('update_password', JSON.stringify(req.body), redis.print));
})

router.patch('/updateuser', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('update_user', JSON.stringify(req.body), redis.print));
})

router.post('/assignroles', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('assign_roles', JSON.stringify(req.body), redis.print));
})

router.delete('/removeroles', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('remove_roles', JSON.stringify(req.body), redis.print));
})


module.exports = router