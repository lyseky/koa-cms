const Koa = require("koa");
const Views = require("koa-views");
const Json = require("koa-json");
const Onerror = require("koa-onerror");
const Bodyparser = require("koa-bodyparser");
const Logger = require("koa-logger");
const Session = require("koa-session2");
const App = new Koa();
const colors = require("colors");// eslint-disable-line no-unused-vars
// error handler
Onerror(App);
// middlewares
App.use(Bodyparser());
App.use(Json());
App.use(Logger());
App.use(Session({
    key: "SESSIONID",   //default "koa:sess"
}));
App.use(require("koa-static")(__dirname + "/public"));
App.use(Views(__dirname + "/views", {
    map: { html: "ejs" }
}));
// logger
App.use(async (ctx, next) => {
    if (!ctx.session.name && ctx.url != "/admin/login") {
        ctx.redirect("/admin/login");
    }
    const start = new Date();
    await next();
    const end = new Date();
    const ms = end - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);// eslint-disable-line no-console
});
// routes
//admin
const Router = require("./routes");
App.use(Router);
App.listen(80, "0.0.0.0");
console.log("project is running,and listen port:80".green);// eslint-disable-line no-console
console.log([// eslint-disable-line no-console
    "                   _ooOoo_",
    "                  o8888888o",
    "                  88\" . \"88",
    "                  (| -_- |)",
    "                  O\\  =  /O",
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    "            /  \\\\|||  :  |||//  \\",
    "           /  _||||| -:- |||||-  \\",
    "           |   | \\\\\\  -  /// |   |",
    "           | \\_|  ''\\---/''  |   |",
    "           \\  .-\\__  `-`  ___/-. /",
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
    "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
    "         佛祖保佑       永无BUG"
].join("\n").green);
module.exports = App;
