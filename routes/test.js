// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const testController = require("../controllers/testController");
let express = require("express");
let router = express.Router();

router.get("/api/test", testController.test);
module.exports = router;
