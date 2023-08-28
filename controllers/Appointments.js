const Appointments = require("../models/Appointments");
const Schedules = require("../models/Schedules");

exports.save = (req, res) => {
  const { schedule } = req.body;

  Schedules.findById(schedule)
    .then(async (selectedSchedule) => {
      if (!selectedSchedule) {
        return res.status(404).json({ error: "Selected schedule not found" });
      }

      if (selectedSchedule.slotsTaken >= selectedSchedule.maxSlots) {
        return res.status(400).json({
          error: "No available slots for the selected schedule",
          slotsTaken: selectedSchedule.slotsTaken,
        });
      }

      selectedSchedule.slotsTaken += 1;
      await selectedSchedule.save();

      Appointments.create(req.body)
        .then((appointment) => {
          res.status(201).json({
            success: "Appointment created successfully",
            payload: appointment,
          });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

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
    .populate("examinee", "email")
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
  const updateFields = { status: req.body.status, reason: req.body.reason };
  Appointments.findByIdAndUpdate(req.body._id, updateFields, { new: true })
    .then((appointment) => {
      res.json({
        success: "Appointment's status updated successfully",
        payload: appointment,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
