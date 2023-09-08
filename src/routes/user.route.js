const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/authentication');
const userController = require('../controllers/user.controller');


router.post ('/signup', userController.register);
router.post ('/login', userController.login);
router.get ('/', userController.getAllUsers);
router.get ('/:userId', userController.getUserById);
router.patch ('/edit/:userId',[ensureAuth.ensureAuth], userController.editUserPatch); //edit by patch
router.put ('/editPut/:userId',[ensureAuth.ensureAuth], userController.editUserPut); //edit by put
router.delete('/delete/:userId',[ensureAuth.ensureAuth], userController.deleteUser)


module.exports = router;