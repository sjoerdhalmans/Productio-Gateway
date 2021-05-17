const { default: axios } = require('axios');
var express = require('express');
var router = express.Router()
var jwtAuthz = require('express-jwt-authz');
const redis = require("redis");

var options = {
    customScopeKey: 'permissions'
};

const baseurl = 'http://localhost:3500'

let
    /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
    client = redis.createClient({ host: '127.0.0.1' });

router.post('/createrequisition', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('createRequisition', JSON.stringify(req.body), redis.print));
})

router.delete('/deleterequisition', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('deleteRequisition', JSON.stringify(req.body), redis.print));
})

router.post('/addinvitem', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('addInvItem', JSON.stringify(req.body), redis.print));
})

router.get('/getstoredmaterials', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/getStoredMaterials').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getallrequisitions', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/getAllRequisitions').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getallstoreditems', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/getAllStoredItems').then(res => {
        response = res.data;
    })

    res.send(response);
})

module.exports = router