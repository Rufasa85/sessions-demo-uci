const express = require('express');
const router = express.Router();
const {User,Game} = require('../models');
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try {
      const data = await Game.findAll();
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const data = await Game.findByPk(req.params.id,{
        include:[User]
      });
      if (data == null) {
        return res.status(404).json({ msg: "no such Game exists!" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const data = await Game.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });


  
  router.delete("/:id", async (req, res) => {
    try {
      const data = await Game.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (data === 0) {
        return res.status(404).json({ msg: "no such Game exists!" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const data = await Game.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks:true
      });
      if (data[0] === 0) {
        return res.status(404).json({ msg: "no such game exists!" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  module.exports = router;
  