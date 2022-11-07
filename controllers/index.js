const router = require('express').Router();
const apiRoutes = require('./api');
const staticRoutes = require('./staticRoutes');

router.use('/api', apiRoutes);
router.use('/', staticRoutes);

module.exports = router;