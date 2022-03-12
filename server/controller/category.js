
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
        console.log(e)
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
        console.log(e)
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
        console.log(e)
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.searchCategory = async (req,res)=>{
    try{
        let order
        let search
        let param = req.body
        if(param.sort===''){
            order = ''
        }else{
            order = `order by ${param.sort}`
        }
        if(param.keywords===''){
            search = `where 1=1`
        }else{
            search = `where c.name like '%${param.keywords}%' 
                        or c.desc like '%${param.keywords}%'  `
        }
        let query = `select * from category c                    
                    ${search}
                    ${order} `
        let rows = await categoryModel.searchCategory(req.db,query)
        res.send({
            data:rows,
            status :true
        })
    }catch(e){
        console.log(e)
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.delCategory = async (req,res)=>{
    try{
        let data = await categoryModel.delCategory(req.db,req.query.id)
        res.send({
            data:('id :',data[0]),
            status :true
        })
    }catch(e){
        console.log(e)
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.updateCategory =async (req,res)=>{
    try{
        await categoryModel.updateCategory(req.db,req.body)
        res.send({
            status :true
        })
    }catch(e){
        console.log(e)
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}