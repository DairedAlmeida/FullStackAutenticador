var express = require('express');
const { cadastroUsuario, autentificarUsuario, confereToken, alterarSenha} = require('../models/user');
var router = express.Router();

function converteUsuario(user){
    return {id: user.id, name: user.name, email: user.email, token: user.token}
}

router.post('/', async function(req,res){
    try{
        let user = req.body;
        if(user.senha.length <= 5 || user.senha.length >= 20){
            throw('Senha entre 5 e 20 caracteres')
        }
        user = await cadastroUsuario(user.name, user.email, user.senha)
        res.status(201).send(converteUsuario(user))
    } catch(err){
        res.status(400).send(err)
    }
});

router.post('/autenticar', async function(req,res){
    try{
        let token;
        let {email, senha} = req.body;
        token = await autentificarUsuario(email, senha)
        res.status(200).send({token})
    } catch(err){
        res.status(400).send()
    }
});

router.post('/isAutenticated', async function(req,res){
    try{
        let user;
        let {token} = req.body;
        user = await confereToken(token)
        res.status(200).send(converteUsuario(user))
    } catch(err){
        res.status(400).send()
    }
});

router.patch('/senha', async function(req,res){
    try{
        let {senha, senhaNew,token} = req.body;
        console.log(senha, senhaNew, token)
        await alterarSenha(senha, senhaNew, token)
        res.status(200).send()
    } catch(err){
        console.log(err)
        res.status(400).send()
    }
});

module.exports = router;