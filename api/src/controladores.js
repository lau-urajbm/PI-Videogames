const {Videogame, Genre}=require('./db')
const axios = require('axios')
const{API_KEY}=process.env
require('dotenv').config();




const getApiInfo = async ()=>{
    const apiInfo1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const apiInfo2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    const apiInfo3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    const apiInfo4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    const apiInfo5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    const apiInfo6 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`)
    
     const apiInfo = apiInfo1.data.results.concat(apiInfo2.data.results, apiInfo3.data.results, apiInfo4.data.results, apiInfo5.data.results, apiInfo6.data.results )
     /* console.log('=>',apiInfo) */
     const info = apiInfo.map(el=>{
         
         return{
            name: el.name,
           released: el.released,
            id:el.id,
            rating: el.rating,
            description_raw:el.slug,
            background_image: el.background_image,
            genres:el.genres.map(el=>el.name),
            platforms:el.platforms.map(el=>el.platform.name)

        }
        
    }) 
    
    return info 
}

const getDBInfo= async ()=>{
     return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through:{
                attributes:[]
        }}
    }
    )
    
}

const getAll = async ()=>{
    const apiInfo = await getApiInfo()
    const DBInfo = await getDBInfo()
    const baseInfo = DBInfo.map(el=>{
        
        return{
            id:el.id,
            name:el.name,
            released:el.released,
            rating:el.rating,
            description:el.description,
            platforms:el.platforms.split(','),
            background_image:el.background_image,
            createdInDB:el.createdInDB,
            genres:el.genres.map(el=>el.name)

        }
    })
    const allInfo = apiInfo.concat(baseInfo)
    

    return allInfo
}

 const getDetail = async (id)=>{
    try{
        if(id.length > 8){

        const buscadoBD = await getAll()
        
        let encontradoBD = buscadoBD.filter(el=>el.id==id)

        if(encontradoBD.length) return encontradoBD
    
}
    else{
        const infoD = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    
    
    

     const detalles = {
        name:infoD.data.name,
        released: infoD.data.released,
        id:infoD.data.id,
        rating: infoD.data.rating,
        background_image: infoD.data.background_image, 
        genres:infoD.data.genres.map(el=>el.name),
        description:infoD.data.description_raw,
        platforms:infoD.data.platforms.map(el=>el.platform.name) 
    }
     
    return [detalles]
    }
}catch(err){
    return 'NO ENCONTRADO'
    } 
} 

const getGenres= async ()=>{
    const validador = await Genre.findAll()

    if(validador.length >0){
    return validador
}else{
    const info = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = info.data.results.map(el=>el.name)
    
    
    genres.forEach(async el => {
        await Genre.findOrCreate({
            where:{
                name:el
            }
        })
    });
    
    const allGenres = await Genre.findAll()
    return allGenres
}
}

module.exports = {getAll,  getDetail , getGenres,getApiInfo}