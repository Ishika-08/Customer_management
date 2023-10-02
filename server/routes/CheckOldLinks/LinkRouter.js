const express = require('express');
const router = express.Router();
const LinkController = require('../../controllers/CheckOldLinks/LinkController');

router.get('/get-links', LinkController.getFaultyLinks);

module.exports = router;
