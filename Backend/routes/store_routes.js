const express = require("express");
const Store = require("../models/store.model");

const router = express.Router();


router.get('', (req, res, next) => {
  Store.find()
  .then(documents => {
    res.status(200).json({
      message: 'Store fetched succesfully',
      stores: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  const storeId = req.params.id;
  Store.findById({_id: storeId})
  .populate('games')
  .populate('accessories')
  .then(store => {
    if (store) {
      res.status(200).json(store);
    } else {
      res.status(404).json({ message: 'Store not found!'});
    }
  })
})

router.post('', (req, res, next) => {
  const store = new Store({
    title: req.body.title,
    address: req.body.address,
    games: req.body.games,
    accessories: req.body.accessories
  });

  store.save().then(createdStore => {
    res.status(201).json({
      message: 'Store added successfully',
      storeId: createdStore._id,
    })
  });
});

router.put('/:id', (req, res, next) => {
  const store = new Store({
    _id: req.body.id,
    title: req.body.title,
    address: req.body.address,
    games: req.body.games,
    accessories: req.body.accessories
  });
  Store.findOneAndUpdate({_id: req.params.id}, store)
  .populate('games')
  .populate('accessories')
  .then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.delete("/:id", (req, res, next) => {
  Store.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Store deleted!" });
  });
});


module.exports = router;
