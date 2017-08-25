const router =require("koa-router")();
const Controller = require("../controller/main/welcome");
router.prefix("/admin/welcome");

router.get("/", Controller.page);
module.exports=router;
