const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcrypt');
const JWT_SECRET = 'sohilmemon';
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//CREATE USER USING POST REQUEST ON /API/AUTH/CREATEUSER
router.post(
  "/createuser",
  async (req, res) => {
    const errors = validationResult(req);
    //if errors available return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({email:req.body.email});
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      const data ={
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      res.status(500).send("some error occured");
    }
  }
);
//AUTHENTICATE USER USING POST REQUEST ON /API/AUTH/LOGIN
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Enter valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if errors available return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({ error: "Use correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res
          .status(400)
          .json({ error: "Use correct credentials" });
      }
      const data ={
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authToken});
    } catch (error) {
      res.status(500).send("some error occured");
    }
  }
);
//get user details using /api/auth/getuser
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
      
    } catch (error) {
      res.status(500).send("iteranl server error");
    }
  }
);

module.exports = router;
