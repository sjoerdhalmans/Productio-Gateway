var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
var jwtAuthz = require('express-jwt-authz');

const BASE_URL = 'http://localhost:8000'
const api = apiAdapter(BASE_URL)

// Changes where the authenticator looks for scopes
var options = {
  customScopeKey: 'permissions'
};

router.get('/feeds', jwtAuthz(['read:feed'], options), (req, res) => {
  console.log(req)
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
  res.send('well')
})

router.get('/feeds/:hashtag', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.post('/feeds', (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router