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
