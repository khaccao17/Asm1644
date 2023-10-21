var mongoose = require('mongoose')
var ControlSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name can not be empty']
         },
         price: {
            type: Number,
            required: [true, 'Price can not be empty']
         },
         description: {
            type: String,
            required: [true, "Description can not be empty"]
         },
         image: String
    }
)
var ControlModel = mongoose.model('control', ControlSchema, 'control')
module.exports = ControlModel;