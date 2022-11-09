const router = require("express").Router();
const apiRoutes = require("./api");
const staticRoutes = require("./staticRoutes");

// Static pages are at this level, API routes are one level down
router.use("/api", apiRoutes);
router.use("/", staticRoutes);

module.exports = router;
