const router =require("koa-router")();
const Controller=require("../controller/login");
router.prefix("/admin/login");
router.get("/",Controller.page)
	.post("/",Controller.login)
	.get("/logout",Controller.logout);

module.exports=router;
