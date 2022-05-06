const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const { Product, validateProduct } = require('../models/Product');
const router = require('express').Router();

//CREATE PRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
})

//UPDATE PRODUCT
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    );

    res.status(200).json(updatedProduct);
})

//DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, async (req, res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('product has been deleted');
})

//GET A PARTICULAR PRODUCT
router.get('/find/:id', async (req, res)=>{
    const product = await Product.findById(req.params.id);
    
    // const { password, ...others} = user._doc;

    res.status(200).json(product);
})

//GET ALL PRODUCTS
router.get('/', async (req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;

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
})

module.exports = router;