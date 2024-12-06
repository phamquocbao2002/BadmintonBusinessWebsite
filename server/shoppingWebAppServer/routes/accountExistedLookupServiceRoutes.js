const express = require('express');
const { accountExistedLookupService } = require('../controllers/accountExistedLookupService');
const router = express.Router();

router.get('/accountExistedLookup', accountExistedLookupService);

module.exports = router;
