const Router = require("koa-router");
const Controller = require("../controller/system/log");
const router = Router();
router.prefix("/admin/system-log");
router.get("/", Controller.page)
	.get("/list", Controller.list);
module.exports = router;
