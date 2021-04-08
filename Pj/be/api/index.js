const express = require("express");
const authRouter = require("./auth");
const uploadRouter = require("./upload");
const dishRouter = require("./dish")
const router = express.Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/dish", dishRouter);
module.exports = router;