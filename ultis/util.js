const bcrypt = require('bcrypt');
const saltRounds = 10;

async function encriptar(senha){
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                if(err){
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    });
}

async function compararSenha(senha, senhaEncriptada){
    return await bcrypt.compare(senha, senhaEncriptada);
}

module.exports = {encriptar, compararSenha};