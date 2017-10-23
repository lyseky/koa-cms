const Router = require("koa-router");
const Controller = require("../controller/role");
const router = Router();
router.prefix("/admin/role");
router.get("/", Controller.page)
    .get("/list", Controller.list)
    .get("/add", Controller.add)
    .post("/add", Controller.createUser)
    .get("/info",Controller.info)
    .put("/info",Controller.putInfo)
    .get("/changePW",Controller.changePWInfo)
    .put("/changePW",Controller.changePW);

module.exports = router;