var express = require("express");
var router = express.Router();
const uploadController = require("../controllers/uploadControler");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/upload", uploadController.index);
module.exports = router;
