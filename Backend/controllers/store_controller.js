const Store = require("../models/store.model");

exports.CreateStore = (req, res, next) => {
  const store = new Store({
    title: req.body.title,
    address: req.body.address,
    games: req.body.games,
    accessories: req.body.accessories
  });

  store.save().then(createdStore => {
    if (createdStore) {
      res.status(201).json({
        message: 'Store added successfully',
        storeId: createdStore._id
      });
    }
  }).catch((error) => res.status(400).send({error: error.message}));
};

exports.UpdateStore = (req, res, next) => {
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
    if (result) {
      res.status(200).json({
        message: 'Update successful!'
      });
    } else {
      res.status(404).json({
        message: 'store not found!'
      });
    }
  }).catch((error) => res.status(400).send({error: error.message}));
};

exports.GetStores = (req, res, next) => {
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
};

exports.GetStore = (req, res, next) => {
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
  });
};

exports.DeleteStore = (req, res, next) => {
  Store.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (!result) {
      res.status(404).json({
        message: "Store not found!"
      });
    } else {
      res.status(200).json({
        message: "Store deleted!"
      });
    }
  });
};
