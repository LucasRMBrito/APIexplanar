const app = require('./app');
const Loaders = require('./loaders/index');


Loaders.start();

app.listen(3333, () => console.log('Servidor rodando!!!'));

// definindo a porta do servidor