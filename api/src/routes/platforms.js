const { Router } = require('express');
const {getApiInfo} = require('../controladores')
const router = Router()

router.get('/', async function(req,res){
    const info = await getApiInfo()
    
    const platforms=info.map(el=>el.platforms)
    
    const allPlatforms = new Set(platforms.flat())
    
    const plats=[]

    for(var platform of allPlatforms){
        plats.push(platform)
    }
    console.log(plats)

    res.status(200).send(plats)
})

module.exports = router