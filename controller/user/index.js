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
    userName: Joi.any(),
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
exports.add = Add.page;
exports.createUser = Add.createUser;
exports.info = Info.page;
exports.put = Info.put;