const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const bcrypt = require('bcrypt');
const { Cart, validateCart } = require('../models/Cart');
const router = require('express').Router();

//CREATE CART
router.post('/', verifyToken, async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        res.status(200).json(updatedCart);
    } catch (err) {
        res.send(`something failed + ${err}`);
    }
})

//DELETE CART
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('cart has been deleted');
    } catch(err){
        res.status(500).json(err)
    }
})

//GET USER PRODUCT
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res)=>{
    try {
        // const cart = await Cart.findById(req.params.id);
        const cart = await Cart.findOne({ userId: req.params.userId});
        
        // const { password, ...others} = user._doc;

        res.status(200).json(cart);
    } catch (err){
        res.status(500).json(err);
    }
})

// //GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await Cart.findOne({});
        res.status(200).json(carts);
    } catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;