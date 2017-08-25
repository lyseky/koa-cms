const Model = require("../../model");
const GetIp=require("../../config/getIp");
const Joi=require("joi");
/*
router: /admin/system
methods:get
*/
exports.page = async ctx => {
    try {
        let doc = await Model.System.findById(1);
        await ctx.render("systemParameter/systemParameter", doc);
    } catch (err) {
        throw new Error("系统配置表无数据,请进入数据库中手动填入数据后刷新页面");
    }

};
/*
router: /admin/system
methods:put
query: name,keywords,description,copyright,record
*/
const schema= Joi.object().keys({
    name: Joi.string(),
    keywords: Joi.string(),
    description: Joi.string(),
    copyright: Joi.string(),
    record: Joi.string(),
});
exports.update = async ctx => {
    let err=Joi.validate(ctx.request.body,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let { name, keywords, description, copyright, record } = ctx.request.body;
    let doc = await Model.System.update({
        name,
        keywords,
        description,
        copyright,
        record
    }, { where: { id: 1 } }
    );
    if (doc) {
        ctx.body = "success";
        Model.Log.create({
            content:"系统设置",
            userName:ctx.session.name,
            ip:GetIp.getClientIp(ctx.req)
        });
    } else {
        ctx.res.statusCode = 500;
    }
};