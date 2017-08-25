let compose =require("koa-compose");
let main = require("./main");
let login = require("./login");
let welcome = require("./welcome");
let system = require("./system");
let system_log = require("./system_log");
let user = require("./user");

function routerCompose(...routes){
    return compose(routes.reduce((res,router)=>res.concat([router.routes(),router.allowedMethods()]),[]));
}
module.exports=routerCompose(main,login,welcome,system,system_log,user);