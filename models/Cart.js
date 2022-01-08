const mongoose = require('mongoose');
const Joi = require('joi');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
}, { timestamps: true });


const validateCart = (data) => {
    const schema = Joi.object({
        userId: Joi.string().min(5).max(50).required(),
        products: Joi.array().items(
            Joi.object({
                productId: Joi.string(),
                quantity: Joi.number()
            })
        )
    })
    return schema.validate(data);
}

const Cart = mongoose.model('Cart', CartSchema);

exports.Cart = Cart;
exports.validateCart = validateCart;