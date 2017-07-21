const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const multipart = require("connect-multiparty");

const router = express.Router();

const session = require("express-session");

router.use(morgan("combined"));

router.use( multipart({
  "uploadDir": __dirname + "/../uploadFiles"
}) );

router.use("/download", express.static(__dirname + "/../uploadFiles"));
router.use("/js", express.static(__dirname + "/../resources/js"));
router.use("/img", express.static(__dirname + "/../resources/img"));
router.use("/css", express.static(__dirname + "/../resources/css"));

// POST로 전송된 데이터 받아오는 미들웨어
// req.body.name 과 같이 POST 데이터를 얻어올 수 있습니다.
router.use(bodyparser.urlencoded({"extended": false}));

router.use(cookieParser());
router.use(session({
  secret: "node-express-board",
  resave: false,
  saveUninitialized: true
}));

module.exports = router;
