const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin:  { type:Boolean, default:false}
    }, 
    { collection: 'users' }
);

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model

