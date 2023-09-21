const Exams = require("../models/Exams");

exports.save = (req, res) =>
  Exams.create(req.body)
    .then((exam) => {
      res.status(201).json({
        success: "Exam created successfully",
        payload: exam,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Exams.find()
    .then((exams) =>
      res.json({
        success: "Exams fetched successfully",
        payload: exams,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Exams.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((exam) => {
      res.json({
        success: "Exam updated successfully",
        payload: exam,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.destroy = (req, res) =>
  Exams.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Exam deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
