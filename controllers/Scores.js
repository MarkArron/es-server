const Scores = require("../models/Scores");
const Persons = require("../models/Persons");
const Exams = require("../models/Exams");

exports.save = (req, res) =>
  Scores.create(req.body)
    .then((score) => {
      res.status(201).json({
        success: "Score saved successfully",
        payload: score,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.browse = (req, res) =>
  Scores.find()
    .populate("examinee", "email")
    .populate("exam", "title")
    .then((scores) =>
      res.status(201).json({
        success: "Scores fetched successfully",
        payload: scores,
      })
    )
    .catch((err) => res.status(400).json({ error: err.message }));

exports.find = (req, res) =>
  Scores.find(req.query)
    .populate("examinee", "email")
    .populate("exam", "title")
    .then((examinees) => {
      res.status(201).json({
        success: "Scores found successfully",
        payload: examinees,
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.statistics = (req, res) =>
  Scores.find()
    .populate("examinee", "email")
    .populate("exam", "title")
    .then((scores) => {
      const exams = Array.from(new Set(scores.map((score) => score.exam)));

      const passedExaminees = [];

      const passingPercentages = exams.map((exam) => {
        const passedExamineesForExam = scores.filter(
          (score) => score.score >= score.bank * 0.7 && score.exam?.equals(exam)
        );

        passedExaminees.push(...passedExamineesForExam);

        const allExaminees = scores.filter((score) => score.exam?.equals(exam));

        const passingPercentage =
          (passedExamineesForExam.length / allExaminees.length) * 100;

        return {
          exam: exam.title,
          percentage: passingPercentage,
        };
      });

      res.status(201).json({
        success: "Passing percentages per exam calculated successfully",
        passedExaminees,
        payload: passingPercentages
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 10),
      });
    })
    .catch((err) => res.status(400).json({ error: err.message }));

exports.examinee_statistics = (req, res) => {
  Scores.find(req.query)
    .populate("examinee", "email")
    .populate("exam", "title")
    .then((examineeScores) => {
      Scores.find()
        .populate("exam", "title")
        .then((scores) => {
          const exams = Array.from(new Set(scores.map((score) => score.exam)));

          const passedExaminees = [];

          const examineeExams = exams.map((exam) => {
            const passedExamineesForExam = scores.filter(
              (score) =>
                score.score >= score.bank * 0.7 && score.exam?.equals(exam)
            );

            const allExaminees = scores.filter((score) =>
              score.exam?.equals(exam)
            );

            const passingPercentage =
              (passedExamineesForExam.length / allExaminees.length) * 100;

            const matchingExamineeScore = examineeScores.find((examineeScore) =>
              examineeScore.exam.equals(exam)
            );

            if (matchingExamineeScore) {
              return {
                exam: matchingExamineeScore.exam.title,
                percentage: Math.round(passingPercentage),
              };
            }

            return null;
          });

          const filteredExamineeExams = examineeExams.filter(
            (examineeExam) => examineeExam !== null
          );

          res.status(201).json({
            success: "Scores found successfully",
            payload: filteredExamineeExams
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 10),
          });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
