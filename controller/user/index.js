const Model = require("../../model");
const Add = require("./add");
const Info = require("./info");
const Joi=require("joi");
/*
router: /admin/user
methods:get
*/
exports.page = async (ctx)=> {
    await ctx.render("user/allUsers");
};
/*
router: /admin/user/list
methods:get
query: userName
*/
const schema= Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(30).allow(""),
});
exports.list = async (ctx) => {
    let err=Joi.validate(ctx.query,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let query = {};
    if (ctx.query.userName) { query.name = ctx.query.userName; }
    let doc = await Model.User.findAll({
        where: query,
        attributes: { exclude: ["password"] },
    });
    ctx.body = await Promise.all(doc.map(async item => {
        return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            status: item.status,
            birthDate: item.birthDate,
            roles: await item.getRoles()
        };
    }));
};
/*
router: /admin/user/changePW
methods:get
*/
exports.changePWInfo= async (ctx)=>{
    await ctx.render("user/changePW",{name:ctx.session.name});
}
/*
router: /admin/user/changePW
methods:put
body: password oldPw
*/
const changePWschema= Joi.object().keys({
    oldPw: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});
exports.changePW= async (ctx)=>{
    let err=Joi.validate(ctx.request.body,changePWschema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let user=await Model.User.update({
        password:ctx.request.body.password
    },{
        limit:1,
        where:{
            name:ctx.session.name,
            password:ctx.request.body.oldPw
        }
    });
    if(user[0]>0){
        ctx.body={message:"更新成功"};
    }else{
        ctx.body={err:"旧密码错误，请重新尝试"};
    }
}
exports.add = Add.page;
exports.createUser = Add.createUser;
exports.info = Info.page;
exports.putInfo = Info.put;