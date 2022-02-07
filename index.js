var express = require("express");
var mongoose = require("mongoose");
const buyingHandler = require("./buyingHandler/buyingHandler");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
require("dotenv").config();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

  
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.amzsa.mongodb.net/${process.env.DB_NAME}`;

mongoose
  .connect(url)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));
  
  app.use("/buying", buyingHandler);


app.get("/", (req, res) =>{
    res.send("ema-john all okay")
});

app.listen(process.env.PORT || 5000);
