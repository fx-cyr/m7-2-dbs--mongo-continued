const express = require("express");
const morgan = require("morgan");
const { router } = require("./routes");
const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

const server = app.listen(PORT, function () {
  console.info("🌍 Listening on port " + server.address().port);
});
