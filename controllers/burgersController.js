var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burger.all(function(burgerData) {
    res.json({ burgers: burgerData });
  });
});

router.post("/burgers", function(req, res) {
  burger.create(req.body.burger_name, function(result) {
    console.log(result);
    res.json({ id: result.id });
  });
});

router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.json({ id: req.params.id });
    }
  });
});

router.delete("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
