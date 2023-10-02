const express = require('express');
const router = express.Router();
const trackController = require('../../controllers/Pitch/TrackController');

router.get('/copyEmails/:fieldName', trackController.copyEmails);
router.get('/delete', trackController.deleteEntries);

module.exports = router;
