const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route   GET api/users
//@desc    Register user
//@access  Public
router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try{
      //See if user exists
      let user = await User.findOne({ email });

      if(user){
        return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
      }
      //Get users gravatar
      const avatar = gravatar.url(email,{
        s: '200', //size
        r: 'pg',  //rating
        d: 'mm'   //default,give a default photo
      })

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //save to the database
      await user.save();

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