const express = require("express");

const Accessory = require("../models/accessory.model");

const router = express.Router();

router.post('', (req, res, next) => {
  const accessory = new Accessory({
    title: req.body.title,
    discription: req.body.discription
  });
  accessory.save().then(createdAccessory => {
    res.status(201).json({
      message: 'Accessory added successfully',
      accessoryId: createdAccessory._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const accessory = new Accessory({
    _id: req.body.id,
    title: req.body.title,
    discription: req.body.discription
  });
  Accessory.updateOne({_id: req.params.id}, accessory).then(result => {
    res.status(200).json({message: 'Update successful!'});
  });
});

router.get('', (req, res, next) => {
  Accessory.find()
  .then(documents => {
    res.status(200).json({
      message: 'Accessory fetched succesfully',
      accessories: documents
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

router.delete("/:id", (req, res, next) => {
  Accessory.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: "Accessory deleted!" });
  });
});


module.exports = router;
