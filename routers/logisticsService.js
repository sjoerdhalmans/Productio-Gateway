const { default: axios } = require('axios');
var express = require('express');
var router = express.Router()
var jwtAuthz = require('express-jwt-authz');
const redis = require("redis");

var options = {
    customScopeKey: 'permissions'
};

const baseurl = 'http://localhost:8086'

// Configures redis client
let
    client = redis.createClient({host: '127.0.0.1'});

router.get('/getreceipts', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllReceipts').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getmaterials', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllMaterials').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getorders', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllOrders').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.post('/createorder', jwtAuthz(['read:feed'], options), (req, res) => {
    console.log('test')
    res.send(client.publish('createOrder', JSON.stringify(req.body), redis.print));
})

router.post('/archiveorder', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('archiveOrder', JSON.stringify(req.body), redis.print));
})

router.put('/updateorder', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('updateOrder', JSON.stringify(req.body), redis.print));
})

router.delete('/deleteorder/:id', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('deleteOrder', req.params.id, redis.print));
})

module.exports = router