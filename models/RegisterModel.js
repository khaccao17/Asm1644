var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var RegisterSchema = mongoose.Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true
         },
         password: {
            type: String,
            required: true
         },
         email: {
            type: String,
            unique: true,
            required: true
         },
         phone: {
            type: String,
            required: true
         }
    }
)
RegisterSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
 })

var RegisterModel = mongoose.model('register', RegisterSchema, 'user')
module.exports = RegisterModel;