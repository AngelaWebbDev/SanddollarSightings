const Product = require('../models/product.model')

module.exports = {

    //create new product
    addProduct: (req, res) => {
        Product.create(req.body)
                .then(newProduct => res.status(200).json(newProduct))
                .catch(err => res.status(500).json(err))
    },

    getAllProducts: (req, res) => {
        Product.find({})
            .then(products => {
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
                    res.json(product);
                })
                .catch(err => {
                    res.json(err)
                })
    },

    updateProduct: (req, res) => {
        Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => {console.log('updateProduct err: ', err);
                        response.json(err)})
    },

    deleteProduct: (req, res) =>{
        Product.deleteOne({ _id: req.params.id })
        .then(confirmMsg => res.json(confirmMsg))
        .catch(err => {console.log('deleteOne err: ', err);
                        res.json(err)})
    }
}