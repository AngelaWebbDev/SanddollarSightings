const ProductController = require('../controllers/product.controller')

module.exports = (app) => {
    //**Read** read all products
    app.get('/api/allProducts', ProductController.getAllProducts);
    
    //**Read** read one product by _id
    app.get('/api/productDetail/:id', ProductController.getOneById)
    //**Create** add new product
    app.post('/api/newproduct',ProductController.addProduct);
}