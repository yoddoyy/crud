const md5 = require('md5')
const loginModel = require('../model/login')
const ctrl = {}

module.exports = ctrl

ctrl.login = async (req,res)=>{
    try{
        let user = await loginModel.getUser(req.db,req.body.username)
        if(user.length===0){
            throw 'There are no users in the system'
        }
        let ciphertext = md5((req.body.password+'logicSpark'))
        if(ciphertext != user[0].password){
            throw 'Password incorrect'
        }
       
        res.send({
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.register = async (req,res)=>{
    try{
        let item = req.body
        let ciphertext = md5((req.body.password+'logicSpark'))
        item.password = ciphertext
        item.create_at = new Date().toISOString()

        let data = await loginModel.register(req.db,item)
        res.send({
            data:('id :',data),
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}