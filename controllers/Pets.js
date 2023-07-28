const Pets = require("../models/Pets");

exports.save = (req, res) =>
  Pets.create(req.body)
    .then((pet) =>
      res.status(201).json({
        success: "Pet created successfully",
        payload: pet,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Pets.find()
    .then((pet) =>
      res.json({
        success: "Pets fetched successfully",
        payload: pet,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Pets.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((pet) =>
      res.json({
        success: "Pet updated successfully",
        payload: pet,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.destroy = (req, res) =>
  Pets.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Pet deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
