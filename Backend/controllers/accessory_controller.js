const Accessory = require("../models/accessory.model");



exports.CreateAccessory = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const accessory = new Accessory({
    title: req.body.title,
    discription: req.body.discription,
    imagePath: url + '/images/' + req.file.filename
  });
  accessory.save().then(createdGame => {
    if(createdGame) {
      res.status(201).json({
      message: 'Accessory added successfully',
      accessory: {
        ...createdGame,
        id: createdGame._id
      }
    });
  }}).catch((error) => res.status(400).send({error: error.message}));
};

exports.UpdateAccessory = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  }
  const accessory = new Accessory({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription,
    imagePath: imagePath
  });
  Accessory.findOneAndUpdate({_id: req.params.id}, accessory).then(result => {
    if(result) {
      res.status(200).json({
        message: 'Update Accessory successful!'
      });
    } else {
      res.status(404).json({
        message: 'Accessory not found!'
      });
    }
  }).catch((error) => res.status(400).send({error: error.message}));
};

exports.GetAccessories = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const accessQuery = Accessory.find();
  let fetchedAccessories;
  if (pageSize && currentPage) {
    accessQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  accessQuery.then(documents => {
    fetchedAccessories = documents
    return Accessory.countDocuments();
  }).then(count => {
    res.status(200).json({
      message: 'Accessory fetched succesfully',
      accessories: fetchedAccessories,
      maxAccessories: count
    });
  });
};


exports.GetAcccessory = (req, res, next) => {
  Accessory.findById(req.params.id).then(accessory => {
    if (accessory) {
      res.status(200).json(accessory);
    } else {
      res.status(404).json({ message: 'Accessory not found!'});
    }
  });
};


exports.DeleteAccessory = (req, res, next) => {
  Accessory.deleteOne({ _id: req.params.id })
  .then(result => {
    res.status(200).json({
      message: "Accessory deleted!"
    });
  }).catch((error) => res.status(400).send({error: error.message}));
};
