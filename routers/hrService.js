const { default: axios } = require('axios');
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
    client = redis.createClient({host: "172.17.0.2"});

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

router.get('/getusers', jwtAuthz(['read:feed'], options), async (req, res) => {
    console.log(req.user)
    var response

    await axios.get('http://localhost:8085/getall').then(res => {
        response = res.data;
    })
    res.send(response);
})

router.get('/getuserroles/:id', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get('http://localhost:8085/userroles/' + req.params.id).then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getallroles', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get('http://localhost:8085/roles').then(res => {
        response = res.data;
    })

    res.send(response);
})


module.exports = router