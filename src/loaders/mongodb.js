const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function startDB() {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jcsx1sp.mongodb.net/bdExplanar`);
};

module.exports = startDB;

//usando o mongoose para conectar no mongodb