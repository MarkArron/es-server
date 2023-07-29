const Scores = require("../models/Scores");

exports.save = (req, res) =>
  Scores.create(req.body)
    .then((score) => {
      res.status(201).json({
        success: "Score saved successfully",
        payload: score,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Scores.find()
    .populate("examinee", "username")
    .populate("exam", "title")
    .then((scores) =>
      res.status(201).json({
        success: "Scores fetched successfully",
        payload: scores,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.find = (req, res) =>
  Scores.find({ examinee: req.query.examinee })
    .populate("examinee", "username")
    .populate("exam", "title")
    .then((examinee) => {
      res.status(201).json({
        success: "Scores found successfully",
        payload: examinee,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
