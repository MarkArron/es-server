const router = require("express").Router();
const middleware = require("../middleware/jwt");
const {
  save,
  browse,
  update,
  destroy,
  login,
  promote_demote,
} = require("../controllers/Persons");

router
  .post("/save", save)
  .get("/login", login)
  .get("/browse", middleware, browse)
  .delete("/:id/destroy", middleware, destroy)
  .put("/update", middleware, promote_demote);
module.exports = router;
