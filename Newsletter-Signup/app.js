const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  console.log("fname = "+fname)
  console.log("lname = "+lname)
  console.log("email = "+email)

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  };
  const dc = "us12";
  const apikey = "4e2bfc829b5250aea75ea5e0c18fd542-us12";
  const id = "53c4480d34";
  const url = "https://us12.api.mailchimp.com/3.0/lists/53c4480d34";
  const JSONdata = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "yash1:4e2bfc829b5250aea75ea5e0c18fd542-us12"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }
    // console.log(response);
  });

  request.write(JSONdata);
  request.end();

});
app.post("/failure", function(req, res){

  // res.sendFile(__dirname + "/signup.html");
  res.redirect("/");
});
//api key
// 4e2bfc829b5250aea75ea5e0c18fd542-us12

//uniqui id - 53c4480d34
app.listen(process.env.PORT || 3000, function(){
  console.log("server running on port 3000");
});
