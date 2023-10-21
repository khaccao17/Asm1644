var express = require('express');
const UserModel = require('../models/UserModel');
const RegisterModel = require('../models/RegisterModel');
var router = express.Router();
const bcrypt=require('bcrypt');
// const { Schema } = require('mongoose');

router.get('/', (req, res) => {
  res.render('index');
})
router.get('/register', (req, res) =>{
  res.render('toy/register')
})
router.post('/register', async (req, res) => {
  var {username, password, email, phone} = req.body;
  try {
    const register = await RegisterModel.create({ username, password, email, phone });
    console.log('Registration successful:', register);
    res.status(201).json(register);
  } catch (error) {
    console.error('Error while registering:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
})
router.post('/', async (req, res) => {
  //lấy thông tin từ form login
  var username = req.body.username;
  var password = req.body.password;
  //lấy dữ liệu user từ db
  //const users = await UserModel.create({ username, password });
  const check = await UserModel.findOne({username});
  //vào trang admin) hoặc login fail (về lại trang login)
  if (username == "admin" && password == "admin"){
    res.redirect('ordinary/admin')
  }
  else{
    try{
    if(!check){
      res.redirect('/')
    }
    const isPasswordValid=await bcrypt.compare(password,check.password);
    if(isPasswordValid){
      const nameusername = username;
      res.redirect('/toy')
    }else{
      res.redirect('/')
    }
  }catch(err){
    console.error(err);
  }
  }
  
})


module.exports = router;