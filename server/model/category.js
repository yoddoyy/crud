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