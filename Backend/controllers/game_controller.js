const Game = require('../models/game.model');

exports.CreateGame = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const game = new Game({
    title: req.body.title,
    discription: req.body.discription,
    imagePath: url + '/images/' + req.file.filename
  });
  game.save().then(createdGame => {
    if(createdGame) {
      res.status(201).json({
        message: 'Game added successfully',
        game: {
          ...createdGame,
          id: createdGame._id
        }
      });
    }
  }).catch((error) => res.status(400).send({error: error.message}));
};

exports.UpdateGame = (req, res, next) => {
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
  Game.findOneAndUpdate({_id: req.params.id}, game)
  .then(result => {
    if (result) {
      res.status(200).json({message: 'Update successful!'});
    } else {
      res.status(404).json({
        message: 'Game not found!'
      });
    }
  }).catch((error) => res.status(400).send({error: error.message}));
};

exports.GetGames = (req, res, next) => {
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
};

exports.GetGame = (req, res, next) => {
  Game.findById(req.params.id).then(game => {
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found!'});
    }
  });
};

exports.DeleteGame = (req, res, next) => {
  Game.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (!result) {
      res.status(404).json({
        message: "Game not found!"
      });
    } else {
      res.status(200).json({
        message: "Game deleted!"
      });
    }
  })
};


