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
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\d*$/).min(11).max(11),
    gender: Joi.string().valid("0","1","2"),
    birthDate:Joi.string().isoDate()
});
exports.put=async ctx=>{
    let err=Joi.validate(ctx.request.body,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let user=await Model.User.update(ctx.request.body,{
        where:{id:ctx.session.id}
    });
    if(user){
        ctx.body={message:"更改成功"};
    }else{
        ctx.body={err:"设置失败，请稍后重试"};
    }
    
};