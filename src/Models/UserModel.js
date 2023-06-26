const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    nome: String,
    nomeCompleto: String,
    email: String,
    password: String,
    cpf_cnpj: String,
    telefone: String,
    chavePix: String,
    cep: String,
    imagemUsuario: String,
    rua: String,
    numero: String,
    cidade: String,
    bairro: String,
    estado: String,
    complemento: String,

    
});

const UserModel = mongoose.model('usuario', UserSchema);

module.exports = UserModel;
