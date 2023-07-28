const Persons = require("../models/Persons");
const generateToken = require("../config/generateToken");

exports.save = (req, res) =>
  Persons.create(req.body)
    .then((person) => {
      const _person = { ...person._doc }; //'_doc' is use to get the actual value because in node.js is when ... it returns many value
      delete _person.password; //manual delete
      res.status(201).json({
        success: "Person created successfully",
        payload: _person,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Persons.find()
    .select("-password") //remove password (not show to anyone) //select can only use in 'find()' and 'findOne()'
    .then((persons) =>
      res.json({
        success: "Persons fetched successfully",
        payload: persons,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Persons.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((person) => {
      const _person = { ...person._doc };
      delete _person.password;
      res.json({
        success: "Person updated successfully",
        payload: _person,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.destroy = (req, res) =>
  Persons.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Person deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.login = (req, res) => {
  const { email, password } = req.query;
  Persons.findOne({ email })
    .then(async (person) => {
      if (!person) return res.status(404).json({ error: "person not found" });

      if (!(await person.matchPassword(password)))
        //wait the match password
        return res.status(400).json({ error: "invalid password" });

      const _person = { ...person._doc };
      delete _person.password;
      res.json({
        success: "Login success!",
        payload: {
          auth: _person,
          token: generateToken({ _id: _person._id }),
        },
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
