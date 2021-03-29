var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const router = require('./routers/feedService');
var bodyParser = require('body-parser');
var jwtAuthz = require('express-jwt-authz');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')

var port = 3000
app.use(cors());

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

var options = {
  customScopeKey: 'permissions'
};

app.use(jwtCheck);
app.use(router);

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

router.get('/tests',
  jwtAuthz(['read:feed'], options),
  function (req, res) { 
    console.log(req)
    res.send('well') });

console.log('gateway is operational at ' + port)

app.listen(port);

module.exports = { jwt }