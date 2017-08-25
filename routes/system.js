const Router = require("koa-router");
const Controller = require("../controller/system/settings");
const router = Router();
router.prefix("/admin/system");
router.get("/", Controller.page)
    .put("/", Controller.update);

module.exports = router;