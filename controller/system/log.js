const Model =require("../../model");
const Joi=require("joi");
/*
router: /admin/system-log
methods:get
*/
exports.page=async ctx => {
    let userList=await Model.User.findAll();
    await ctx.render("systemParameter/systemLog",{userList});
};
/*
router: /admin/system-log/list
methods:get
query: userName,startTime,endTime,content
*/
const schema= Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(30).allow(""),
    startTime: Joi.string().allow(""),
    endTime: Joi.string().allow(""),
    content: Joi.string().allow(""),
});
exports.list=async ctx => {
    let err=Joi.validate(ctx.request.query,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let {userName,startTime,endTime,content}=ctx.query;
    let query={};
    if(content){query.content=content;}
    if(userName){query.userName=userName;}
    if(startTime){query.createdAt={};query.createdAt.$gte=startTime;}
    if(endTime){query.createdAt=query.createdAt?query.createdAt:{};query.createdAt.$lte=endTime;}
    let doc=await Model.Log.findAll({
        where:query
    });
    ctx.body=doc;
};