const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const VendaSchema = new Schema({
    id: ObjectId,
    id_produto: String,
    id_donoProduto: String,
    id_vendedor: String,
    id_comprador: String,
    data: String,
    nome: String,
    preco: Number,
    quantidade: Number,    
});

const VendaModel = mongoose.model('venda', VendaSchema);

module.exports = VendaModel;