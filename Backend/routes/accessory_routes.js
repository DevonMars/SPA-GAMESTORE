const express = require("express");
const AccessoryController = require('../controllers/accessory_controller')
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const router = express.Router();

router.post('', checkAuth, extractFile, AccessoryController.CreateAccessory);

router.put('/:id', checkAuth, extractFile, AccessoryController.UpdateAccessory);

router.get('', AccessoryController.GetAccessories);

router.get('/:id', AccessoryController.GetAcccessory);

router.delete("/:id", checkAuth, AccessoryController.DeleteAccessory);


module.exports = router;
