const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
  console.log("server is running on port 3000");
});
