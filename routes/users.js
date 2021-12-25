const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = require('express').Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    //first tin we need to findout where the token belongs to, client or Admin
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (err) {
        res.send("something failed");
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('The user with the given ID has been deleted');
    } catch(err){
        res.status(500).json(err)
    }
})

//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        const { password, ...others} = user._doc;

        res.status(500).json(others);
    } catch (err){
        res.status(500).json(err);
    }
})

//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    try {
        const users = query 
            ? await User.find().sort({ _id: -1}).limit(5)
            : await User.find({});
        
        res.status(500).json(users);
    } catch (err){
        res.status(500).json(err);
    }
})

module.exports = router;