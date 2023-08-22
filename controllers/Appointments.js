const Appointments = require("../models/Appointments");

exports.save = (req, res) =>
  Appointments.create(req.body)
    .then((appointment) => {
      res.status(201).json({
        success: "Appointments created successfully",
        payload: appointment,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Appointments.find()
    .populate({
      path: "schedule",
      populate: [
        {
          path: "exam",
          select: "title",
        },
        {
          path: "admin",
          select: "username",
        },
      ],
    })
    .then((appointments) => {
      res.status(201).json({
        success: "Appointments created successfully",
        payload: appointments,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.examinee_appointments = (req, res) =>
  Appointments.find(req.query)
    .populate({
      path: "schedule",
      populate: [
        {
          path: "exam",
          select: "title",
        },
        {
          path: "admin",
          select: "username",
        },
      ],
    })
    .then((appointments) => {
      res.status(201).json({
        success: "Appointments created successfully",
        payload: appointments,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update_status = (req, res) => {
  const updateStatus = { status: req.body.status };
  Appointments.findByIdAndUpdate(req.body._id, updateStatus, { new: true })
    .then((appointment) => {
      res.json({
        success: "Appointment's status updated successfully",
        payload: appointment,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
