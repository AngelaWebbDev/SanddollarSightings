const Product = require('../models/product.model')

module.exports = {

    //create new product
    addProduct: (req, res) => {
        Product.create(req.body)
                .then(newProduct => res.status(200).json(newProduct))
                .catch(err => res.status(500).json('addProduct error: ', err))
    },

    getAllProducts: (req, res) => {
        Product.find({})
            .then(products => {
                console.log(products); //for troubleshooting
                res.json(products);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })
    },

    getOneById: (req, res) => {
        Product.findOne({_id: req.params.id})
                .then(product => {
                    console.log(product);
                    res.json(product);
                })
                .catch(err => {
                    console.log(err)
                    res.json(err)
                })
    }
}