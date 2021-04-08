const path = require("path");
const multer = require("multer");
const express = require("express");
const router = express.Router();

const fileExtensions = {
    "image/jpeg": ".jpg",
    "audio/mpec": ".mp3",
    "png": ".png"
}

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../static"))
    },
    filename: (req, file, cb) => {
        const fileName = file.fieldname + "-" + Date.now() + fileExtensions[file.mimetype];
        req.savedFile = fileName;
        cb(null, fileName)
    }
})

const upload = multer( {storage: diskStorage});
// module.exports = upload;

router.post("/", upload.single("file"), (req, res) => {
    console.log("file upload")
    res.json( {filePath: "/static/" + req.savedFile });
})

module.exports = router