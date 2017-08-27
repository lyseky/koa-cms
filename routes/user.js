const Router = require("koa-router");
const Controller = require("../controller/user");
const router = Router();
router.prefix("/admin/user"); 
router.get("/", Controller.page)
    .get("/list", Controller.list)
    .get("/add", Controller.add)
    .post("/add", Controller.createUser)
    .get("/info",Controller.info)
    .put("/info",Controller.put);

module.exports = router;