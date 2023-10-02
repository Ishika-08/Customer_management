const express = require('express');
const router = express.Router();
const databaseController = require('../../controllers/GP/DatabaseController');

// Search for email in the Database table
router.get('/:email', databaseController.searchEmail);

// Define other database-related routes here

module.exports = router;
