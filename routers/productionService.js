const { default: axios } = require('axios');
var express = require('express');
var router = express.Router()
var jwtAuthz = require('express-jwt-authz');
const redis = require("redis");

var options = {
    customScopeKey: 'permissions'
};

const baseurl = 'http://localhost:9955'

let

    client = redis.createClient({ host: '127.0.0.1' });

router.get('/getitems', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllItems').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getblueprints', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllBlueprints').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.get('/getproductionlines', jwtAuthz(['read:feed'], options), async (req, res) => {
    var response

    await axios.get(baseurl + '/api/getAllProductionLines').then(res => {
        response = res.data;
    })

    res.send(response);
})

router.post('/createitem', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('createItem', JSON.stringify(req.body), redis.print));
})

router.post('/createblueprint', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('createBlueprint', JSON.stringify(req.body), redis.print));
})

router.post('/createproductionline', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('createProductionLine', JSON.stringify(req.body), redis.print));
})

router.put('/updateproductionline', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('updateProductionLine', JSON.stringify(req.body), redis.print));
})

router.delete('/deleteproductionline/:id', jwtAuthz(['read:feed'], options), (req, res) => {
    res.send(client.publish('deleteProductionLine', req.params.id, redis.print));
})

module.exports = router
