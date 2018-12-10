const express = require("express");
const multer = require('multer');
const Game = require("../models/game.model");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'Backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const game = new Game({
    title: req.body.title,
    discription: req.body.discription,
    imagePath: url + '/images/' + req.file.filename
  });
  game.save().then(createdGame => {
    res.status(201).json({
      message: 'Game added successfully',
      game: {
        ...createdGame,
        id: createdGame._id
      }
    });
  });
});

router.put('/:id', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  const game = new Game({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription,
    imagePath: imagePath
  });
  Game.findOneAndUpdate({_id: req.params.id}, game).then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const gameQuery = Game.find();
  let fetchedGames;
  if (pageSize && currentPage) {
    gameQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  gameQuery.then(documents => {
    fetchedGames = documents
    return Game.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Games fetched succesfully',
      games: fetchedGames,
      maxGames: count
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

router.delete("/:id", checkAuth, (req, res, next) => {
  Game.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Game deleted!" });
  });
});


module.exports = router;
