const express = require('express');
const router = express.Router();
const contentController = require('../../controllers/GP/ContentController');

// Add data to the mentioned table
router.post('/add/:table', contentController.addDataToTable);

// Get data from contents table by ID
router.get('/update/:id', contentController.getDataById);
router.get("/search/:searchEmail/", contentController.getDataByEmail)

// Update data in contents table by ID
router.put('/update/:id', contentController.updateDataById);

// Delete entries from specified tables
router.delete('/delete/:tableName', contentController.deleteEntries);


module.exports = router;
