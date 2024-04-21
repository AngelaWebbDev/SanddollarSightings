const mongoose = require('mongoose')

const Sightingschema = mongoose.Schema({
    sdtype:{type:String,
                    required:[true,'If unknown, enter "unknown."'],
                    minlength:[3, 'Type must be at least 3 characters long.'],
                    maxlength:[25, 'Type cannot be more than 25 characters long.']
                },
    location:{type:String,
                required:[true,'Location is required.'],
                minlength:[3, 'Location must be at least 3 characters long.'],
                maxlength:[75, 'Location cannot be more than 75 characters long.']},
    sightingdate:{type:String,
                required:[true,'Date is required. Estimates ok.'],
                minlength:[4,'Minimum 4 characters for date.'],
                maxlength:[25,'Max 25 characters for date.']},
    quantity:{type:Number,
                    required:[true,'Number sighted is required.'],
                    min:[1,'Number sighted must be more than 0.']
                },
    comments:{type:String,
                maxlength:[200,'Notes must be 200 characters or less.']}
}, {timestamps:true})

module.exports = mongoose.model('Sighting', Sightingschema)