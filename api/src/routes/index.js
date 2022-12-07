const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogController = require("./controllers/dogs.js");
const temperamentController = require("./controllers/temperaments.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogController);
router.use("/temperaments", temperamentController);

module.exports = router;
