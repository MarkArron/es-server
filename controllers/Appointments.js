const Appointments = require("../models/Appointments");
const Schedules = require("../models/Schedules");

exports.save = (req, res) => {
  try {
    const { schedule } = req.body;

    const selectedSchedule = Schedules.findById(schedule);
    if (!selectedSchedule) {
      return res.status(404).json({ error: "Selected schedule not found" });
    }

    if (selectedSchedule.remainingSlots <= 0) {
      return res.status(400).json({
        error: "No available slots for the selected schedule",
        remainingSlots: 0,
      });
    }

    const appointment = Appointments.create(req.body);

    // Update remainingSlots in the schedule
    selectedSchedule.remainingSlots -= 1;
    selectedSchedule.save();

    res.status(201).json({
      success: "Appointment created successfully",
      remainingSlots: selectedSchedule.remainingSlots,
      payload: appointment,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
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
