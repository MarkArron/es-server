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

exports.examinee_appointments = (req, res) =>
  Appointments.find(req.query)
    .then((appointments) => {
      res.status(201).json({
        success: "Appointments created successfully",
        payload: appointments,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
