const {Router} = require('express')
const {check} = require('express-validator')
const {findMPbyId,updatePm,deletePM,postMP,findByCustomQuery} = require('../controllers/medioDePagoController')
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();


//Acá defino los servicios con el http method que sea.

router.get("/paymentMethod/:idCliente",
    [check('idCliente').notEmpty(),validarCampos],
    findMPbyId
    /*Servicio que consume*/)

router.post('/paymentMethod',[],postMP)

router.get('/paymentMethod/:idCliente/:cardNumber?key=value',[],findByCustomQuery)

//DELETE /paymentMethod/{idCliente}/{cardNumber}
//PUT /paymentMethod/{idCliente}/{cardNumber}
//La cosa es que se le pone copmo ruta, checks, y llamado que hacen.


router.route('/paymentMethod/:idCliente/:cardNumber').delete(deletePM).put(updatePm)
//Se puede poner así cuando comparten la misma url pero diferentes metodos.


module.exports = router
