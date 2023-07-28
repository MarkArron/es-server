const Exams = require("../models/Scores");

exports.save = (req, res) =>
  Persons.create(req.body)
    .then((person) => {
      const _person = { ...person._doc }; //'_doc' is use to get the actual value because in node.js is when ... it returns many value
      delete _person.password; //manual delete
      res.status(201).json({
        success: "Scores created successfully",
        payload: _person,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Persons.find()
    .select("-password") //remove password (not show to anyone) //select can only use in 'find()' and 'findOne()'
    .then((persons) =>
      res.json({
        success: "Scores fetched successfully",
        payload: persons,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.find = (req, res) =>
  Persons.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((person) => {
      const _person = { ...person._doc };
      delete _person.password;
      res.json({
        success: "Scores updated successfully",
        payload: _person,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
