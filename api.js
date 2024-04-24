//pievienot pakotnes
const express = require("express");
var cors = require("cors");
//aktivizēt Express
const app = express();
//lietot CORS
app.use(cors());
const port = 3000;
app.listen(port, function (req, res) {
  console.log(`Server is running at port ${port}`);
});