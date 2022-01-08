const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const { Cart, validateCart } = require('../models/Cart');
const router = require('express').Router();

//CREATE CART
router.post('/', verifyToken, async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newCart = new Cart(req.body);

    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
})

//UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    );

    res.status(200).json(updatedCart);
})

//DELETE CART
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('cart has been deleted');
})

//GET USER PRODUCT
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res)=>{
    // const cart = await Cart.findById(req.params.id);
    const cart = await Cart.findOne({ userId: req.params.userId});
    
    // const { password, ...others} = user._doc;

    res.status(200).json(cart);
})

// //GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const carts = await Cart.findOne({});
    res.status(200).json(carts);
})


module.exports = router;