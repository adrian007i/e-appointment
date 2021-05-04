/**
 * admin.js
 * Routing for Administrators (statistics, set up, etc)
 */

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => { res.json({ msg: 'Test Passed' }); });



module.exports = router;