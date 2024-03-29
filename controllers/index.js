const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use('/api/users',userRoutes)
const gameRoutes = require("./gameRoutes");
router.use("/api/games",gameRoutes)

module.exports = router;