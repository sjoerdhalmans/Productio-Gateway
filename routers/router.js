var express = require('express');
var router = express.Router()
var hashtagService = require('./hashtagService')
var feedService = require('./feedService')
var pingService = require('./pingService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(feedService)
router.use(hashtagService)
router.use(pingService)

module.exports = router