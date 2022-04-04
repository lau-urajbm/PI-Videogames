const { Router } = require('express');
const {getAll, getApiInfo} = require('../controladores')
const {getDetail}=require('../controladores')

const router = Router()

router.get('/', async function(req,res){
   try{
    const {name}=req.query
    const todos = await getAll()
    if(name){
        let buscado = todos.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
        console.log(buscado)
        if(buscado.length){
         return res.status(200).send(buscado)
        }
        else{
            buscado =[{
                id: '23e21ed',
                name: "Not Found",
                released: "00-00-0000",
                background_image: "https://c.tenor.com/c2qhMmAr_fMAAAAd/sad-head-shake.gif",
                rating: 0,
                description: "The game has 0 results",
                genres: [],
                platforms: [],
              }]
         res.status(200).send(buscado)
    }}else{
        return res.status(200).send(todos)
    } }catch(err){
        console.log(err)
    } 
})

router.get('/:idVideogame', async function(req,res){
    const {idVideogame}=req.params
   try{
    let detalle = await getDetail(idVideogame)
     console.log(detalle)
    
    Object.keys(detalle).length >0? res.status(200).send(detalle): res.status(404).send(detalle)
}catch(err){
    res.send(err)
}
})
 



module.exports= router