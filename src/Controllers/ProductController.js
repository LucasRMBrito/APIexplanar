const ProductModel = require('../Models/ProductModel');

class ProductController {
    async store(req, res){
        const { 
            id_dono, nome, preco, precoAnterior, quantidade, descricao, 
            imagem, tamanho, peso,
            marca, modelo, fabricante,
            numeracao, caracteristicas
        } = req.body;
        
        const productAlreadyExists = await ProductModel.findOne({nome});

        if(productAlreadyExists) {
            return res.status(400).json({message:"O nome do produto já existe!"});
        }
        
        if(!id_dono || !nome || !preco){
            return res.status(400).json({message:"id do dono, Nome, Preço requeridos !"})
        }
        const createdProdutc = await ProductModel.create(req.body);

        return res.status(200).json(createdProdutc);
    }

    async index(req, res){
        const products = await ProductModel.find();

        return res.status(200).json(products);
    }

    async show(req, res){
        try {
            const { id } = req.params;

            const product = await ProductModel.findById(id);
    
            if(!product){
                return res.status(404).json({message:"Produto não existe!"});
            }
    
            return res.status(200).json(product);
        } catch (error) {
            return res.status(404).json({message:"Falha ao buscar produto"});
        }
    }

    async update(req, res){
        try {
            const { id } = req.params;

            await ProductModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message:"Produto atualizado!!!"})
        } catch (error) {
            return res.status(404).json({message:"Falhou a atualização"});
        }
    }

    async destroy(req, res){
        try {
            const { id } = req.params;

            const productDeleted = await ProductModel.findByIdAndDelete(id);
    
            if (!productDeleted){
                return res.status(404).json({message:"Produto não existe!"});
            }
    
            return res.status(200).json({message:"Produto deletado!!!"});

        } catch (error) {
            return res.status(404).json({message:"Falha ao deletar"});
        }
    }
}

module.exports = new ProductController();

//criação da classe de produto controller com os métodos