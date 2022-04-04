const { Router } = require('express');
const {Videogame, Genre}=require('../db')

const router = Router()

router.post('/', async function(req,res){
    const{name, description, released, rating, genres, platforms, background_image}=req.body
    try{
    let nuevoJuego = await Videogame.create({
            name,
            description, 
            released, 
            rating, 
            platforms:platforms.toString(), 
            background_image: background_image===''?'../../../videogame.png':background_image
        })

    let genresForm = await Genre.findAll({
        where:{
            name:genres
        }
    
    })
    nuevoJuego.addGenre(genresForm)
    res.status(200).send('VideoJuego Creado Con Éxito')
}catch(err){
    console.log(err)
}
})
module.exports =router 