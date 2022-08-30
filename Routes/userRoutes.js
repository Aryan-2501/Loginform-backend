const { signup, login, allData } = require("../Controller/userController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/alldata", allData);

module.exports = router;
