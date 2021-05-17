const { default: axios } = require('axios');
var express = require('express');
var router = express.Router()
var jwtAuthz = require('express-jwt-authz');
const redis = require("redis");

var options = {
    customScopeKey: 'permissions'
};

const baseurl = 'http://localhost:8085'

// Configures redis client
let
    /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
    client = redis.createClient({host: '127.0.0.1'});

router.post('/updatepassword', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('updatePassword', JSON.stringify(req.body), redis.print));
})

router.patch('/updateuser', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('updateUser', JSON.stringify(req.body), redis.print));
})

router.post('/assignroles', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('assignRoles', JSON.stringify(req.body), redis.print));
})

router.delete('/removeroles', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('removeRoles', JSON.stringify(req.body), redis.print));
})

router.get('/getusers', jwtAuthz(['read:feed'], options), async (req, res) => {
    console.log(req.user)
    var response

    await axios.get(baseurl + '/getall').then(res => {
        response = res.data;
    })
    res.send(response);
})

router.get('/getuserroles/:id', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/userroles/' + req.params.id).then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getallroles', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/roles').then(res => {
        response = res.data;
    })

    res.send(response);
})


module.exports = router