const express = require("express");
const StoreController = require('../controllers/store_controller')
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post('', checkAuth, StoreController.CreateStore);

router.put('/:id', checkAuth, StoreController.UpdateStore);

router.get('', StoreController.GetStores);

router.get('/:id', StoreController.GetStore);

router.delete("/:id", checkAuth, StoreController.DeleteStore);


module.exports = router;
