const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const { Order, validateOrder } = require('../models/Order');
const router = require('express').Router();

//CREATE ORDER
router.post('/', verifyToken, async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
})

//UPDATE ORDER
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    );

    res.status(200).json(updatedOrder);
})

//DELETE ORDER
router.delete('/:id', verifyTokenAndAdmin, async (req, res)=>{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('cart has been deleted');
})

//GET USER ORDERS
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res)=>{
    // const orders = await Order.findById(req.params.id);
    const orders = await Order.find({ userId: req.params.userId});
    
    res.status(200).json(orders);
});

//GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const orders = await Order.findOne({});
    res.status(200).json(orders);
})

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
        { $match: { createdAt: {$gte: previousMonth} } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount"
            }
        },
        {
            $group: { 
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ])
    res.status(200).json(income);
})

module.exports = router;