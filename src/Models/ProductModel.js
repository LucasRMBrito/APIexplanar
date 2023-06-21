const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    id: ObjectId,
    nome: String,
    preco: Number,
    precoAnterior: Number,
    descricao: String,
    imagem: String,
    descricao_tamanho: String,
    descricao_chave: {
    marca: String,
    fabricante: String,
    Modelo: String,
    Número_da_peça: String,
    peso_do_produto: Number,
    padrao_de_conexão: String,
    características_especiais: String
      }
});

const ProductModel = mongoose.model('produto', ProductSchema);

module.exports = ProductModel;

// definindo o Model de Produto

