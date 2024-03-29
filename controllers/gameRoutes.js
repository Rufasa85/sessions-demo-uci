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
    if(!req.session.user){
      return res.status(403).json({msg:"login first!"})
    }
    try {
      const data = await Game.create({
        title:req.body.title,
        platform:req.body.platform,
        review:req.body.review,
        score:req.body.score,
        UserId:req.session.user.id
      });
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });


  
  router.delete("/:id", async (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"login first!"})
    }
    try {
      // const gameToDel = await Game.findByPk(req.params.id);
      // if(gameToDel.UserId!==req.session.id){
      //   return res.status(403).json({msg:"not your review!"})
      // }
      const data = await Game.destroy({
        where: {
          id: req.params.id,
          UserId:req.session.user.id
        },
      });
      if (data === 0) {
        return res.status(404).json({ msg: "no such Game exists or its not yours" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      if(!req.session.user){
        return res.status(401).json({msg:"login first!"})
      }
      const data = await Game.update({
        title:req.body.title,
        platform:req.body.platform,
        review:req.body.review,
        score:req.body.score
      }, {
        where: {
          id: req.params.id,
          UserId:req.session.user.id
        },
        individualHooks:true
      });
      if (data[0] === 0) {
        return res.status(404).json({ msg: "no such game exists or its not yours" });
      }
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "error occurred", err });
    }
  });
  
  module.exports = router;
  