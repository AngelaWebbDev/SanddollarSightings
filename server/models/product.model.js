const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productTitle:{type:String,
                    required:[true,'Product must have a title.'],
                    minlength:[3, 'Product title must be at least 3 characters long.'],
                    maxlength:[50, 'Product title cannot be more than 50 characters long.']
                },
    productPrice:{type:Number,
                    required:[true,'Product must have a price.'],
                    min:[0.01,'Price must be more than 0.01']
                },
    productDescription:{type:String,
                        required:[true, 'Description is required.'],
                        minlength:[3,'Description must be 3 characters long.'],
                        maxlength:[100,'Description cannot be more than 100 characters long.']}
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema)