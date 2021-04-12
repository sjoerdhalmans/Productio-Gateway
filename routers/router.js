var express = require('express');
var router = express.Router()
var hashtagService = require('./hashtagService')
var feedService = require('./feedService')
var pingService = require('./pingService')
var hrService = require('./hrService')
var logisticsService = require('./logisticsService')
router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(feedService)
router.use(hashtagService)
router.use(pingService)
router.use(hrService)
router.use(logisticsService)

module.exports = router