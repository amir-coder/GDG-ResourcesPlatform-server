const mongoose = require('mongoose');

//Ca ces le schema
const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, 
    //Ca ces la collection (table dans mySQL) dans laquelle le schema va être
    { collection: 'users' }
);

//Le model du user donc on enregistre le userschema dans mongoose
const model = mongoose.model('UserSchema', UserSchema);

module.exports = model

