const UserModel = require('../Models/UserModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {
    
   
    async store(req, res){
        const {
            nome, nomeCompleto, email, password,
            cpf_cnpj, telefone, chavePix, cep,
            imagemUsuario, rua, numero, cidade,
            bairro, estado, complemento
        } = req.body

        //validations
        if(!nome) {
            return res.status(422).json({msg: 'O nome é obrigatório!'})
        }
        if(!email) {
            return res.status(422).json({msg: 'O email é obrigatório!'})
        }

        if(!password) {
            return res.status(422).json({msg: 'A senha é obrigatória!'})
        }

        //check if user exists
        const userExistis = await UserModel.findOne({ email: email })

        if(userExistis) {
            return res.status(422).json({ msg: 'Por favor, utilize outro e-mail'})
        }

        //create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = await UserModel.create(req.body);

        try {
            await user.save()
            res.status(201).json({ msg: 'Usuário criado com sucesso!', user})
        } catch(error) {
            console.log(error)
            res
            .status(500)
            .json({
                msg:'Aconteceu um erro no servidor, tente novamente mais tarde'
            })
        }

    }

    async check(req, res) {

        const authHeader = req.headers['authorization']

        const token = authHeader && authHeader.split(" ")[1]

        if(!token) {
            return res.status(401).json({ msg: "Acesso negado!" })
        }

        // checkToken(req, res)
        
        try { 
            const { id } = req.params;

            const secret = 'criandoHashDoidaPraFortalecerOToken123123'

            jwt.verify(token, secret)
    
            
            const user = await UserModel.findById(id, "-password");

            if (!user) {
                return res.status(404).json({ msg: 'Usuário não encontrado!' });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde' });
        }
    }

    async login(req, res){
        
        const { email, password } = req.body

        // validations
        if(!email) {
            return res.status(422).json({msg: 'O email é obrigatório!'})
        }
    
        if(!password) {
            return res.status(422).json({msg: 'A senha é obrigatória!'})
        }
    
        //check if user exists
        const user = await UserModel.findOne({ email: email})
    
        if(!user) {
            return res.status(404).json({msg: "Usuário não encontrado!"})
        }
    
        //check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
    
        if(!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida!" })
        }
    
        try {
    
            const secret = 'criandoHashDoidaPraFortalecerOToken123123'
    
            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
            )
    
            res.status(200).json({user , msg:'autenticação realizada com sucesso', token})
    
        } catch(err) {
            console.log(error)
            res
            .status(500)
            .json({
                msg:'Aconteceu um erro no servidor, tente novamente mais tarde'
            })
        }

    }

    async index(req, res){
        const users = await UserModel.find();

        return res.status(200).json(users);
    }

    async update(req, res){
        try {
            const { id } = req.params;

            await UserModel.findByIdAndUpdate(id, req.body);
            
            return res.status(200).json({message:"Usuario atualizado!!!"})
        } catch (error) {
            return res.status(404).json({message:"Falhou a atualização"});
        }
    }

    async destroy(req, res){
        try {
            const { id } = req.params;

            const userDeleted = await UserModel.findByIdAndDelete(id);
    
            if (!userDeleted){
                return res.status(404).json({message:"Usuario não existe!"});
            }
    
            return res.status(200).json({message:"Usuario deletado!!!"});

        } catch (error) {
            return res.status(404).json({message:"Falha ao deletar"});
        }
    }

}

module.exports = new UserController();

//criação da classe de produto controller com os métodos