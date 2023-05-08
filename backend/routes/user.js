const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    obj={
        name:'memon'
    }
    res.json([obj]);
})
module.exports=router