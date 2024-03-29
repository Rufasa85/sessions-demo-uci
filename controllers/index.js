const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use('/api/users',userRoutes)
const gameRoutes = require("./gameRoutes");
router.use("/api/games",gameRoutes)

router.get("/sessiondata",(req,res)=>{
    res.json(req.session);
})

router.get("/addname/:name",(req,res)=>{
    req.session.name = req.params.name
    res.json(req.session);
})

router.get("/protecc",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"login first to join the secret club"})
    }
    res.send(`welcome to the club, ${req.session.user.email}`)
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out")
})

module.exports = router;