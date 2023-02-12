const express = require('express');
const router = express.Router();




router.get('/user',(req,res)=>{
    res.json({msg:'hello man'})
})


module.exports = router