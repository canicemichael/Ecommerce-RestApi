const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/User');
const router = require('express').Router();

//UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    //first tin we need to findout where the token belongs to, client or Admin
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    );

    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
})

//DELETE a user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('The user with the given ID has been deleted');
})

//GET a particular USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res)=>{
    const user = await User.findById(req.params.id);
    
    const { password, ...others} = user._doc;

    res.status(200).json(others);
})

//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    const users = query 
        ? await User.find().sort({ _id: -1}).limit(5)
        : await User.find({});
    
    res.status(500).json(users);
})

//GET USER STATS (explain what stats mean)
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
        { $match: { createdAt: {$gte: lastYear} } },
        {
            $project: {
                month: { $month: '$createdAt' }
            }
        },
        {
            $group: {
                _id: '$month',
                total: { $sum: 1 }
            }
        }
    ])
    res.status(200).json(data);
})

module.exports = router;