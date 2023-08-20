const Schedules = require("../models/Schedules");

exports.save = (req, res) =>
  Schedules.create(req.body)
    .then((schedule) => {
      res.status(201).json({
        success: "Schedule created successfully",
        payload: schedule,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Schedules.find()
    .then((schedule) =>
      res.json({
        success: "Schedules found successfully",
        payload: schedule,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Schedules.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((schedule) => {
      res.json({
        success: "Schedule updated successfully",
        payload: schedule,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.exam_schedule = (req, res) => {
  Schedules.find(req.query)
    .populate("admin", "username")
    .populate("exam", "title")
    .then((schedule) => {
      res.json({
        success: "Exam schedule found successfully",
        payload: schedule,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
