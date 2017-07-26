const express = require("express");

// Create Server
const app = express();

app.use(require("./routes/middlewares.js"));

app.use("/board", require("./routes/board.route").router);
app.use("/user", require("./routes/user.route").router);

app.use(function(req, res) {
  res.type("text/html");
  res.sendStatus(404);
});

app.listen(3000, function() {
  console.log("automated push test");
  console.log("Server running at http://localhost:3000");
});
