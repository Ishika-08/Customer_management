const express = require('express');
const router = express.Router();
const checkHrefController = require('../../controllers/CheckOldLinks/CheckHrefController');

router.get('/', checkHrefController.checkHref);

module.exports = router;
