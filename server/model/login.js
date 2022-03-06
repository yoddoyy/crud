const model = {}

module.exports = model

model.register = async (trx,item)=>{
    let data = await trx('user').insert(item).then(data=>data) 
    return data
}

model.getUser = async (trx,userName)=>{
    let rows = await trx('user').where({username:userName}).then(rows=>rows)
    return rows
}