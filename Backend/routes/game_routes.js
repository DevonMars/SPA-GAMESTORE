const express = require("express");

const Game = require("../models/game.model");

const router = express.Router();

router.post('', (req, res, next) => {
  const game = new Game({
    title: req.body.title,
    discription: req.body.discription
  });
  game.save().then(createdGame => {
    res.status(201).json({
      message: 'Game added successfully',
      gameId: createdGame._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const game = new Game({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription
  });
  Game.updateOne({_id: req.params.id}, game).then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req, res, next) => {
  Game.find()
  .then(documents => {
    res.status(200).json({
      message: 'Games fetched succesfully',
      games: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Game.findById(req.params.id).then(game => {
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found!'});
    }
  })
})

router.delete("/:id", (req, res, next) => {
  Game.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Game deleted!" });
  });
});


module.exports = router;
