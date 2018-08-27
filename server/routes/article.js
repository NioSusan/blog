const router = require("express").Router();
const {
	getAll,
	create,
	getOne,
	edit,
	remove
} = require("../controllers/article");
const auth = require("../middlewares/auth");
const isLogin = require("../middlewares/isLogin");

const authUser = auth(["user", "admin"]);

router.get("/articles", getAll);
router.post("/articles", isLogin, authUser, create);
router.get("/articles/:id", isLogin, authUser, getOne);
router.put("/articles/:id", isLogin, authUser, edit);
router.delete("/articles/:id", isLogin, authUser, remove);

module.exports = router;
