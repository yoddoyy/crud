const productModel = require('../model/product')

const ctrl = {}

module.exports = ctrl

ctrl.getProduct = async (req,res)=>{
    try{
        let product = await productModel.getProduct(req.db)

        res.send({
            data:product,
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.addProduct = async (req,res)=>{
    console.log('RRRRRRRRRRR',req.body)
    try{
        let item = req.body
        item.create_at = new Date().toISOString()
        let data = await productModel.addProduct(req.db,item)

        res.send({
            data:('id :',data[0]),
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.searchProduct = async (req,res)=>{
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
            search = `where p.name like '%${param.keywords}%' 
                        or p.desc like '%${param.keywords}%' 
                        or c.name like '%${param.keywords}%' `
        }
        let query = `select p.id,p.name,p.desc,c.name as category
                    from product p inner join category c on p.category_id = c.id
                    ${search}
                    ${order} `
        let rows = await productModel.searchProduct(req.db,query)
        res.send({
            data:rows,
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.delProduct = async (req,res)=>{
    try{
        console.log('ZZZZZZZZZZZZZZZZZ',req.body,req.query)
        let data = await productModel.delProduct(req.db,req.query.id)
        console.log('YYYYYYYYYYYYYYYY',data)
        res.send({
            data:('id :',data[0]),
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}

ctrl.updateProduct = async (req,res)=>{
    try{
        console.log('ZZZZZZZZZZZZZZZZZ',req.body)
        await productModel.updateProduct(req.db,req.body)
        res.send({
            // data:('id :',data[0]),
            status :true
        })
    }catch(e){
        res.send({
            error: ('e :',e),
            status :false
        })
    }
}