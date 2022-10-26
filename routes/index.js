var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);
router.post('/', indexController.saveToDb)
router.delete('/', indexController.deleteFromDb)
router.get('/get-data',indexController.getDataFromDb)

module.exports = router;
