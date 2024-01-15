const Product = require('../models/product.model')

module.exports = {

    //create new product
    addProduct: (req, res) => {
        Product.create(req.body)
                .then(newProduct => res.status(200).json(newProduct))
                .catch(err => res.status(500).json('addProduct error: ', err))
    }
}