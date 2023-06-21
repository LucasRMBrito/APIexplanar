const { Router } = require('express');

const ProductController = require('./Controllers/ProductController');
const UserController = require('./Controllers/UserController');

const routes = Router();

routes.get('/health', (req, res) => {
    return res.status(200).json({message:"Servidor online..."});
});


routes.post('/produto', ProductController.store);
routes.get('/produto', ProductController.index);
routes.get('/produto/:id', ProductController.show);
routes.put('/produto/:id', ProductController.update);
routes.delete('/produto/:id', ProductController.destroy);

routes.post('/auth/register', UserController.store);
routes.post('/auth/login', UserController.login);
routes.get('/usuario/:id', UserController.check);
routes.get('/usuario', UserController.index);
routes.put('/usuario/:id', UserController.update);
routes.delete('/usuario/:id', UserController.destroy);

module.exports = routes

//criando as rotas