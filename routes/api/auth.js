const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route   GET api/auth
//@desc    Test route
//@access  Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route   POST api/auth
//@desc    Authenticate user & get token
//@access  Public
router.post(
    '/', 
    [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Passwoed is required').exists()
],
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
      let user = await User.findOne({ email });

      if(!user){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
      }

      const isMatch = await bcrypt.compare(password, user.password); 

      if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
      }

      //Return jsonwebtoken

      //获取包含用户id的有效负载
      const playload={
        user:{
            id: user.id
        }
      }

      //签署令牌
      jwt.sign(
        playload,               //传入有效负载
        config.get('jwtSecret'), //传入secret
        { expiresIn : 360000},  //设置过期时间
        (err,token) =>{
            if(err) throw err;
            res.json({token});  //没有error，就将token传入客户端
        }
    );

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;