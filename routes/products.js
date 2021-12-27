const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const bcrypt = require('bcrypt');
const Product = require('../models/Product');
const router = require('express').Router();

//CREATE PRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE PRODUCT
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );

        const { password, ...others } = updatedProduct._doc;
        res.status(200).json(others);
    } catch (err) {
        res.send(`something failed + ${err}`);
    }
})

//DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('product has been deleted');
    } catch(err){
        res.status(500).json(err)
    }
})

//GET PRODUCT
router.get('/find/:id', async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        
        // const { password, ...others} = user._doc;

        res.status(200).json(product);
    } catch (err){
        res.status(500).json(err);
    }
})

//GET ALL PRODUCTS
router.get('/', async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;

        if (qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        } else if (qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;