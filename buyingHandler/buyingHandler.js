const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const buyingSchema = require("../schema/buyingSchema");
const Product = new mongoose.model("Product", buyingSchema);
const Order = new mongoose.model("Order", buyingSchema);

//post method
router.post("/", (req, res) => {
    console.log(req.body);
    const newProduct = new Product(req.body);
    newProduct.save((err) =>{
        if(err){
            res.status(500).json({
                error: "there is server side error"
            })
        } else{
            res.status(200).json({
                message: "buying complate"
            })
            console.log("co")
        }
    })
})

router.post('/all', (req, res) => {
  console.log(req.body)
     Product.insertMany(req.body, (err) => {
       if (err) {
         res.status(500).json({
           error: "there was a server side error",
         });
       } else {
         res.status(200).json({
           message: "todo was inserted successfully1",
         });
       }
     })
});
router.post('/productsByKeys', (req, res) => {
  const keys = req.body;
     Product.find({key: {$in: keys}}, (err, data) => {
       if (err) {
         res.status(500).json({
           error: "there was a server side error",
         });
       } else {
         res.status(200).json({
           result: data,
           message: "todo was inserted successfully1",
         });
       }
     })
});
router.get('/', (req, res) =>{
  Product.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "todo was inserted successfully",
      });
    }
  }).clone();
})
router.get('/:key', (req, res) =>{
  Product.find({key: req.params.key}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "todo was inserted successfully",
      });
    }
  }).clone();
})

router.post("/order", (req, res) => {
  console.log(req.body);
  const newOrder = new Order(req.body);
  newOrder.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there is server side error",
      });
    } else {
      res.status(200).json({
        message: "buying complate",
      });
      console.log("co");
    }
  });
});

module.exports = router;
