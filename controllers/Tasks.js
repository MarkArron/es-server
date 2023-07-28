const Tasks = require("../models/Tasks");

exports.save = (req, res) =>
  Tasks.create(req.body)
    .then((task) =>
      res.status(201).json({
        success: "Task created successfully",
        payload: task,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Tasks.find()
    .then((tasks) =>
      res.json({
        success: "Tasks fetched successfully",
        payload: tasks,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Tasks.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((task) =>
      res.json({
        success: "Task updated successfully",
        payload: task,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.destroy = (req, res) =>
  Tasks.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Task deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
