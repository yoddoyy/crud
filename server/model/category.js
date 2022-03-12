const model = {}

module.exports = model

model.addCategory = async (trx,item)=>{
    let data = await trx('category').insert(item).then(data=>data) 
    return data
}

model.getCategory = async (trx)=>{
    let rows = await trx('category').then(rows=>rows)
    return rows
}

model.getDropDown = async (trx)=>{
    let rows = await trx.raw(`select name as label,id as value from category`).then(rows=>rows)
    return rows
}

model.searchCategory = async (trx,sql)=>{
    let rows = trx.raw(sql).then(rows=>rows)
    return rows
}

model.delCategory = async (trx,id)=>{
    let data = await trx('category').delete().where({id:id}).then(data=>data)
    return data
}

model.updateCategory =async (trx,param)=>{
    let id = param.id
    delete param.id
    param.update_at =  new Date().toISOString()
    await trx('category').update(param).where({id:id})
    return 0
}