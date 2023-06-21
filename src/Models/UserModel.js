const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    nome: String,
    email: String,
    password: String,
    confirmpassword: String
  
});

const UserModel = mongoose.model('usuario', UserSchema);

module.exports = UserModel;
