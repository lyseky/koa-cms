const Joi=require("joi");
const Model = require("../../model");
/*
router: /admin/user/info
methods:get
*/
exports.page=async ctx=>{
    let user=await Model.User.findById(ctx.session.id,{
        attributes:{exclude:["password"]},
    });
    if(!user){
        ctx.redirect("/admin/login");
        return;
    }
    let roles=await user.getRoles();
    user.roles=roles;
    await ctx.render("user/userInfo",user);
};
/*
router: /admin/user/info/:id
methods:put
*/
const schema= Joi.object().keys({
    id: Joi.array().items(Joi.string().regex(/^\d*$/)),
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\d*$/).min(11).max(11),
    status: Joi.string(),
    gender: Joi.string().valid("0","1","2"),
    
    describe: Joi.any(),
});
exports.put=async ctx=>{
    let err=Joi.validate(ctx.params.id,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    // let id=ctx.params.id;
    // Model.User.update({},)
};