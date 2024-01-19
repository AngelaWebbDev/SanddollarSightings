const ProductController = require('../controllers/product.controller')

module.exports = (app) => {
    //**Read** read all products
    app.get('/api/allProducts', ProductController.getAllProducts);
    
    //**Read** read one product by _id
    app.get('/api/oneProductById/:id', ProductController.getOneById)
    
    //**Create** add new product
    app.post('/api/newproduct',ProductController.addProduct);

    //**Update** update a product (by id)
    app.put('/api/edit/:id', ProductController.updateProduct)

    //**Delete** delete a product (by id)
    app.delete('/api/oneProductById/:id', ProductController.deleteProduct)
}