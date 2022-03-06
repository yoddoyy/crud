
const categoryModel = require('../model/category')
const ctrl = {}

module.exports = ctrl

ctrl.getCategory = async (req,res) =>{
    try{
        let rows = await categoryModel.getCategory(req.db)
    
        res.send({
            data: rows,
            status :true
        })    
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }    
}

ctrl.addCategory = async (req,res) =>{
    try{
        let item = req.body
        item.create_at = new Date().toISOString()
        let data = await categoryModel.addCategory(req.db,item)
    
        res.send({
            data: ('id :',data[0]),
            status :true
        })    
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.getDropDown = async (req,res)=>{
    try{        
        let rows = await categoryModel.getDropDown(req.db)
    
        res.send({
            data: rows,
            status :true
        })    
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}