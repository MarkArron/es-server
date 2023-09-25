const Banks = require("../models/Banks");

const validateChoices = (bank) => {
  if (bank.choices.length < 2) return "you must have at least 2 choices";

  if (bank.choices.length > 5) return "you have exceeded the maximum 5 choices";
};

exports.browse = (req, res) =>
  Banks.find()
    .sort({ createdAt: -1 })
    .then((banks) =>
      res.json({
        success: "Banks fetched successfully",
        payload: banks,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.save = (req, res) => {
  if (validateChoices(req.body))
    return res.status(400).json({ error: validationError });

  Banks.create(req.body)
    .then((bank) => {
      res.status(201).json({
        success: "Bank created successfully",
        payload: bank,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.find = (req, res) =>
  Banks.find(req.query)
    .sort({ createdAt: -1 })
    .populate("exam", "title")
    .then((banks) =>
      res.json({
        success: "Banks found successfully",
        payload: banks,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) => {
  const validationError = validateChoices(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  Banks.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((bank) => {
      res.json({
        success: "Bank updated successfully",
        payload: bank,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.destroy = (req, res) =>
  Banks.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Bank deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
