const mongoose = require('mongoose');
const Joi = require('joi');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

const validateOrder = (data) => {
    const schema = Joi.object({
        userId: Joi.string().min(5).max(50).required(),
        products: Joi.array().items(
            Joi.object({
                productId: Joi.string(),
                quantity: Joi.number()
            })
        ),
        amount: Joi.number().required(),
        address: Joi.object().required(),
        status: Joi.string()
    })
    return schema.validate(data);
}

exports.Order = Order;
exports.validateOrder = validateOrder;