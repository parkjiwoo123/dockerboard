const express = require("express");
const fs = require("fs");
const ejs = require("ejs");

const client = require("../mysql/mysql_connector");

const router = express.Router();

// Generate Mock data
const mockData = [
  { subject: "Mock Subject", writer: "Mock Writer", content: "Mock Content" }
];

router.get("/write", function(req, res) {
  fs.readFile("view/write.html", "utf-8", function(error, data) {
    res.type("text/html");
    res.send(data);
  });
});

router.post("/write", function(req, res) {
  // POST 데이터를 얻어옴.
  const subject = req.body.subject;
  const writer = req.body.writer;
  const content = req.body.content;

  const file = req.files.file;
  console.log(file);

  let originalFilename = file.originalFilename;
  let filename = file.path;

  if ( originalFilename != "" ) {
    let fileSplit = filename.split("\\")
    filename = fileSplit[ fileSplit.length-1 ];
  }
  else {
    fs.unlink(filename);
    originalFilename = "";
    filename = "";
  }

  client.query(`insert into board (
    subject, writer, content, originalFilename, filename
  ) values (?, ?, ?, ?, ? ) `, [
    subject, writer, content, originalFilename, filename
  ], function() {
    // "/board" 로 이동.
    res.redirect("/board");
  });

});

router.get("/delete/:id", function(req, res) {
  const id = req.params.id;

  client.query("delete from board where id = ?", [id], function() {
    // "/board" 페이지로 이동
    res.redirect("/board");
  });

});

router.get("/:id", function(req, res) {

  let id = req.params.id;

  client.query("select * from board where id = ?", [id], function(error, results) {

    fs.readFile("view/detail.html", "utf-8", function(error, data) {
      res.type("text/html");
      res.send(ejs.render(data, results[0]));
    });

  });

});

router.get("/", function(req, res) {

  client.query("select * from board", [], function(error, results) {

    fs.readFile("view/list.html", "utf-8", function(error, data) {
      res.type("text/html");
      res.send(ejs.render(data, {
        "list": results
      }));
    });

  });

});

exports.router = router;
