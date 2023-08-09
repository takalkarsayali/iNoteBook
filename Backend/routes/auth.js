const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleWare/fetchUser');

const JWT_SECRET = "HappyAuthentication";

//Route 1 - Create a User using : POST "/api/auth/createUser" No login required
router.post('/createUser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid Email Id').isEmail(),
    body('password','Password should be at least minimum 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
  
  try {
    //Return a bad request and error if the entered field is not valid
      const errors = validationResult(req);
      let success = false;
      if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
      }
      //Check weather the user with the same email already exists
      let user = await  User.findOne({email : req.body.email})
      if(user){
        return res.status(400).json({success, error : "User with this email Id already exits"});
      }
      const salt = await bcrypt.genSalt(10);
      const secPwd = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPwd,
        })
        const data = {
          user : {
            id : user.id,
          }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        
        // res.json(user);
        success = true;
        res.send({success, authToken});
    } 
    catch (error) {
        console.error(error);
        res.status(500).send("Opps something went wrong internally!!");
    }
})

//Route 2- Validate a User using : POST "/api/auth/login" No login required
router.post('/login',[
  body('email','Enter a valid Email Id').isEmail(),
  body('password','Password can not be blank').exists(),
],async (req,res)=>{
  //Return a bad request and error if the entered field is not valid
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const{email,password}  =  req.body;
  try {
    //Return a bad request and error if the entered field is not valid
    let user = await  User.findOne({email});
      if(!user){
        return res.status(400).json({error : "Kindly login with valid credentials"});
      }

      const comparePassword = await bcrypt.compare(password,user.password);
      if(!comparePassword){
        return res.status(400).json({error : "Kindly login with valid credentials"});
      }

      const data = {
        user : {
          id : user.id,
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      const success = true;
      res.send({success , authToken});
  } 
  catch (error) {
        console.error(error);
        res.status(500).send("Opps something went wrong internally!!");
  }
})

//Route 3- Get logged in user details using : POST "/api/auth/getUser" login required
router.post('/getUser',fetchUser,async (req,res)=>{
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } 
catch (error) {
    console.error(error);
    res.status(500).send("Opps something went wrong internally!!");
  }
})

module.exports = router;