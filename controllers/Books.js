const Books = require("../models/Books");

exports.save = (req, res) =>
  Books.create(req.body)
    .then((book) =>
      res.status(201).json({
        success: "Book created successfully",
        payload: book,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Books.find()
    .populate("author")
    .then((books) =>
      res.json({
        success: "Books fetched successfully",
        payload: books,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.update = (req, res) =>
  Books.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then((book) =>
      res.json({
        success: "Book updated successfully",
        payload: book,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.destroy = (req, res) =>
  Books.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        success: "Book deleted successfully",
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
