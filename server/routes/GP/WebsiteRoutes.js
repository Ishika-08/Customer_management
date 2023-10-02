const express = require('express');
const router = express.Router();
const websiteController = require('../../controllers/GP/websiteController');

// Search for a domain name in all website tables
router.get('/:domain', websiteController.findWebsiteByDomain);

//to get topics for a website from ExtraContents table
router.get("/findWebsite/:site", websiteController.getTopics)

module.exports = router;
