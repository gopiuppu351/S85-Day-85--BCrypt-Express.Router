const express = require("express");
const router = express.Router();

router.get("/movieNames", (req, res)=>{
    res.json(["Salaar","Raayan","pushpa2"])
});

module.exports = router;