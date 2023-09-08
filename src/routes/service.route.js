const express = require("express");
const serviceController = require("../controllers/service.controller");
const ensureAuth = require("../middleware/authentication");
const router = express.Router();
const multer = require("multer");
const path = require("path");


// Configuracion de multer
const storage = multer.diskStorage({
  destination: "/src/upload/service",
  filename: (req, file, cb) => {
    cb(null, path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
}).single("photos");

// Rutas
router.post( "/new-service", upload, serviceController.createService);
router.get("/" , serviceController.getAllServices );
router.get("/:serviceId" , serviceController.getServiceById);
router.delete("/delete/:serviceId", [ensureAuth.ensureAuth], serviceController.deleteService );


module.exports = router;