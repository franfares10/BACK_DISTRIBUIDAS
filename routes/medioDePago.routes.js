const {Router} = require('express')
const {check} = require('express-validator')
const {findMPbyId,updatePm,deletePM,postMP,findByCustomQuery, getAllCards} = require('../controllers/medioDePago.controller')
const {validarCampos} = require('../middlewares/validar-campos')
const router = Router();


//Acá defino los servicios con el http method que sea.

router.get("/paymentMethod/:idCliente/:cardNumber",
    [check('idCliente').notEmpty(),validarCampos],
    findMPbyId
    /*Servicio que consume*/)

router.post('/paymentMethod',[],postMP)

router.get('/paymentMethod/:idCliente',[],findByCustomQuery)
router.get('/allPaymentsMethods/:idCliente',[],getAllCards)
//DELETE /paymentMethod/{idCliente}/{cardNumber}
//PUT /paymentMethod/{idCliente}/{cardNumber}
//La cosa es que se le pone copmo ruta, checks, y llamado que hacen.


router.route('/paymentMethod/:idCliente/:cardNumber').delete(deletePM).put(updatePm)
//Se puede poner así cuando comparten la misma url pero diferentes metodos.


module.exports = router
