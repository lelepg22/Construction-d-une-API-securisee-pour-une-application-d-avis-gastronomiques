const express = require('express');


const modelsSauceCtrl = require('../controllers/modelsSauce');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const router = express.Router();

router.get('/', auth, modelsSauceCtrl.getAllSauce);
router.get('/:id', auth, modelsSauceCtrl.getOneSauce);

router.post('/:id/like', auth, modelsSauceCtrl.likeSauce);
router.put('/:id', auth, multer, modelsSauceCtrl.modifySauce);
router.post('/', auth, multer, modelsSauceCtrl.createSauce);
router.delete('/:id', auth, modelsSauceCtrl.deleteSauce);


module.exports = router;