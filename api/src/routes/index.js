const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require('./videogame')
const videogamesRouter = require('./videogames')
const genresRouter = require('./genres')
const platforms = require('./platforms')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',videogamesRouter)
router.use('/genres',genresRouter) 
router.use('/videogame',videogameRouter)
router.use('/platforms', platforms)


module.exports = router;
