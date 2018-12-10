const express = require("express");
const Store = require("../models/store.model");
const checkAuth = require('../middleware/check-auth');
const router = express.Router();


router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const storeQuery = Store.find();
  let fetchedStores;
  if (pageSize && currentPage) {
    storeQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  storeQuery.then(documents => {
    fetchedStores = documents
    return Store.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: 'Stores fetched succesfully',
      stores: fetchedStores,
      maxStores: count
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

router.post('', checkAuth, (req, res, next) => {
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

router.put('/:id', checkAuth, (req, res, next) => {
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

router.delete("/:id", checkAuth, (req, res, next) => {
  Store.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Store deleted!" });
  });
});


module.exports = router;
