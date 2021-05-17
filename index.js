//Imports
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const router = require('./routers/router.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const axios = require("axios");
const redis = require("redis");

//defines application port and allows CORS
var port = process.env.PORT
console.log(process.env.PORT)
app.use(cors());

// configures the auth0 connection
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://deathrun.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://productiogateway',
  issuer: 'https://deathrun.auth0.com/',
  algorithms: ['RS256']
});

// Changes where the authenticator looks for scopes
var options = {
  customScopeKey: 'permissions'
};

app.use(jwtCheck);
app.use(router);

app.get('/', (req, res) => {
  res.send("Simple API Gateway")
})

//adds startup notification
console.log('gateway is operational at ' + port)

//starts app
app.listen(port);

module.exports = { jwt }