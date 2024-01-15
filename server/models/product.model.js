const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productTitle:{type:String,
                    // required:[true,'Product must have a title.'],
                    // minlength:[3, 'Product title must be at least 3 characters long.']
                },
    productPrice:{type:Number,
                    // required:[true,'Product must have a price.'],
                    // min:[0,'Price must be listed.']
                },
    productDescription:{type:String}
}, {timestamp:true})

module.exports = mongoose.model('Product', ProductSchema)