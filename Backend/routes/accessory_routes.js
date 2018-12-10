const express = require("express");
const multer = require('multer');
const Accessory = require("../models/accessory.model");
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
  const accessory = new Accessory({
    title: req.body.title,
    discription: req.body.discription,
    imagePath: url + '/images/' + req.file.filename
  });
  accessory.save().then(createdGame => {
    res.status(201).json({
      message: 'Accessory added successfully',
      accessory: {
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
  const accessory = new Accessory({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription,
    imagePath: imagePath
  });
  Accessory.findOneAndUpdate({_id: req.params.id}, accessory).then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req, res, next) => {
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
});

router.get('/:id', (req, res, next) => {
  Accessory.findById(req.params.id).then(accessory => {
    if (accessory) {
      res.status(200).json(accessory);
    } else {
      res.status(404).json({ message: 'Accessory not found!'});
    }
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Accessory.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Accessory deleted!" });
  });
});


module.exports = router;
