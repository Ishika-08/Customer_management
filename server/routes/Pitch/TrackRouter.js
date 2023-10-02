const express = require('express');
const router = express.Router();
const trackController = require('../../controllers/Pitch/TrackController');

router.get('/copyEmails/:fieldName', trackController.copyEmails);
router.get('/delete', trackController.deleteEntries);
router.get('/get-links', trackController.getFaultyLinks);

module.exports = router;
