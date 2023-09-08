const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const ensureAuth = require('../middleware/authentication');


router.post ('/new-category', categoryController.createCategory);
router.get("/" , categoryController.getAllCategories );
router.get("/:categoryId" , categoryController.getCategoryById );
router.delete("/delete/:categoryId", [ensureAuth.ensureAuth], categoryController.deleteCategory );




module.exports = router;