const { Router } = require('express');
const {getGenres} = require('../controladores');


const router = Router()

router.get('/', async function(req, res){
    try{
    const genres = await getGenres()
    
    res.status(200).send(genres)
    }catch(err){
        console.log(err)
    }    
})

module.exports=router

