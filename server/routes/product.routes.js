const ProductController = require('../controllers/product.controller')

module.exports = (app) => {
    //**Create** add new product
    app.post('/api/newproduct',ProductController.addProduct)
}