const jwt = require("jsonwebtoken");
const Persons = require("../models/Persons");

const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    })
  );

const middleware = (req, res, procceed) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "no token detected" });

  if (!authorization.startsWith("Bearer"))
    return res.status(401).json({ error: "invalid token format" });

  verifyToken(authorization.split(" ")[1])
    .then((decoded) => {
      if (!decoded._id)
        return res.status(401).json({ error: "invalid token content" });

      Persons.findById(decoded._id)
        .then((person) => {
          if (!person) return res.status(404).json({ error: "invalid id" });

          //res.locals.person = person res.locals is a global variable that use to return the value of it
          procceed();
        })
        .catch(() => res.status(401).json({ error: "invalid id format" }));
    })
    .catch(() => res.status(401).json({ error: "invalid token or expired" }));
};

module.exports = middleware;
