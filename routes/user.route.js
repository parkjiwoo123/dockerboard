const express = require("express");
const router = express.Router();

const fs = require("fs");
const ejs = require("ejs");

router.get("/login", (req, res) => {

  if ( req.session.USER ) {
      res.redirect("/board");
      return;
  }

  fs.readFile("view/user/login.html", "utf-8", (error, data) => {
    res.type("text/html");
    res.send(ejs.render(data, req.cookies));
  });
});

router.post("/login", (req, res) => {

  const id = req.body.id;
  const pwd = req.body.pwd;
  const saveId = req.body.saveId;

  //const data = req.body;

  if ( saveId == "Y" ) {
    res.cookie("save_id", saveId);
    res.cookie("user_id", id);
  }

  if ( id == "admin" && pwd == "admin" ) {
    const user = {};
    user.id = id;
    user.password = id;

    req.session.USER = user;
  }

  res.redirect("/board");

});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user/login");
});




exports.router = router;
