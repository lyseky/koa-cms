const Model = require("../../model");
// const Lodash = require("lodash");
const GetIp = require("../../config/getIp");
const Joi=require("joi");
/*router: /admin/login
methods:get
*/
exports.page = async ctx => {
    await ctx.render("login/login");
};
/*router: /admin/login
methods:post
body:name password
*/
const schema= Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    code: Joi.string(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
exports.login = async ctx => {
    let err=Joi.validate(ctx.request.body,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let { name, password } = ctx.request.body;
    let doc = await Model.User.findOne({
        where: {
            name,
            password
        },
        attributes: ["id", "name"]
    });
    if (doc) {
        ctx.session.name = doc.name,
        ctx.session.id = doc.id;
        ctx.body = "success";
        Model.Log.create({
            content: "用户登录",
            userName: ctx.session.name,
            ip: GetIp.getClientIp(ctx.req)
        });
    }
    else {
        ctx.status = 401;
    }
};
exports.logout = async ctx => {
    ctx.session = null;
    ctx.redirect("/admin/login");
};