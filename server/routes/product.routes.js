const ProductController = require('../controllers/product.controller')

module.exports = (app) => {
    //**Read** read all products
    app.get('/api/allProducts', ProductController.getAllProducts);
    
    //**Create** add new product
    app.post('/api/newproduct',ProductController.addProduct);
}