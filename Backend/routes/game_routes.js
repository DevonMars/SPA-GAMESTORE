const express = require("express");
const GameController = require('../controllers/game_controller')
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const router = express.Router();

router.post('', checkAuth, extractFile, GameController.CreateGame );

router.put('/:id', checkAuth, extractFile, GameController.UpdateGame);

router.get('', GameController.GetGames);

router.get('/:id', GameController.GetGame)

router.delete("/:id", checkAuth, GameController.DeleteGame);


module.exports = router;
