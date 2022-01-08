const mongoose = require('mongoose');
const Joi = require('joi');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

const validateProduct = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().unique(),
        desc: Joi.string().required(),
        img: Joi.string().required(),
        categories: Joi.array(),
        size: Joi.string(),
        color: Joi.string(),
        price: Joi.string().required(),
    })
    return schema.validate(data);
}

exports.Product = Product;
exports.validateProduct = validateProduct;