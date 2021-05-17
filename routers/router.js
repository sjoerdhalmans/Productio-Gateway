var express = require('express');
var router = express.Router()
var hrService = require('./hrService')
var logisticsService = require('./logisticsService')
var requisitionsService = require('./requisitionsService')
var productionService = require('./productionService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(hrService)
router.use(logisticsService)
router.use(requisitionsService)
router.use(productionService)

module.exports = router