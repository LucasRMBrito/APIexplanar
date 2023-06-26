const VendaModel = require('../Models/VendaModel')

class VendaController {

    async store(req, res){
        
        const {
            id_produto, id_donoProduto, id_vendedor,
            id_comprador, data, nome, preco, quantidade
        } = req.body;

        if (!id_produto || !id_donoProduto || !id_vendedor || !id_comprador || !data || !nome || !preco || !quantidade){
            return res.status(400).json({message: "preencha todos campos"})
        }

        const vendaFeita = await VendaModel.create(req.body);

        return res.status(200).json(vendaFeita);

    }

    async index(req, res){
        const vendas = await VendaModel.find();

        return res.status(200).json(vendas);
    }

    async show(req, res){
        try {
            const { id } = req.params;

            const venda = await VendaModel.findById(id);
    
            if(!venda){
                return res.status(404).json({message:"Produto não existe!"});
            }
    
            return res.status(200).json(venda);
        } catch (error) {
            return res.status(404).json({message:"Falha ao buscar produto"});
        }
    }

}

module.exports = new VendaController();