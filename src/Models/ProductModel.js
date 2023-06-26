const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    id: ObjectId,
    id_dono: String,
    nome: String,
    preco: Number,
    precoAnterior: Number,
    quantidade: Number,
    descricao: String,
    imagem: String,
    tamanho: String,
    peso: Number,
    marca: String,
    modelo: String,
    fabricante: String,
    numeracao: String,
    caracteristicas: String
    
});

const ProductModel = mongoose.model('produto', ProductSchema);

module.exports = ProductModel;

// definindo o Model de Produto

