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
