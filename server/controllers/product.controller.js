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
                res.status(200).json(products);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    getOneById: (req, res) => {
        Product.findOne({_id: req.params.id})
                .then(product => {
                    res.status(200).json(product);
                })
                .catch(err => {
                    res.status(500).json(err)
                })
    },

    updateProduct: (req, res) => {
        Product.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(updatedProduct => res.status(200).json(updatedProduct))
        .catch(err => {console.log('updateProduct err: ', err);
                        res.status(500).json(err)})
    },

    deleteProduct: (req, res) =>{
        Product.deleteOne({ _id: req.params.id })
        .then(confirmMsg => res.status(200).json(confirmMsg))
        .catch(err => {console.log('deleteOne err: ', err);
                        res.status(500).json(err)})
    }
}