const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/authentication');
const addressController = require('../controllers/address.controller');


router.post('/new-address', addressController.createAddress);
router.get('/', addressController.getAllAddress);
router.get('/:addressId', addressController.getAddressById);
router.patch('/update/:addressId', [ensureAuth.ensureAuth], addressController.updateAddressPatch);
router.delete('/delete/:addressId', [ensureAuth.ensureAuth], addressController.deleteManyAddress);

module.exports = router;