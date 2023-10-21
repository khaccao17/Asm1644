const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true
      }
   }
)
UserSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
 })

const UserModel = mongoose.model('user', UserSchema, 'user');
module.exports = UserModel;