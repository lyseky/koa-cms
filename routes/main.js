const Router =require("koa-router");
const router=Router();
const Controller=require("../controller/main");
router.prefix("/admin");
router.get("/", Controller.page);
module.exports=router;
