const userModel = require("../model/user");
const Product = require("../model/product");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
    const user = await userModel.findOne({ token: req.cookies.token })
    const product = await Product.find({ _id: { $in: user.product } });
    res.json(product);
}

module.exports.product = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const newProduct = new Product({
        name: name,
        price: price,
        description: description,
    });

    await newProduct.save();
    const productObject = await newProduct.save();
    const user = await userModel.findOne({ token: req.cookies.token });
    user.product.push(productObject._id);
    await user.save();
}

