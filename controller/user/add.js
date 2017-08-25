const Model = require("../../model");
const Joi=require("joi");
/*
router: /admin/user/add
methods:get
*/
exports.page = async (ctx) => {
    let roles = await Model.Role.findAll({
        attributes: ["name", "id"]
    });
    await ctx.render("user/addUser", { roles });
};

/*
router:/admin/user/add
methods:post 
body:name,email,phone status gender roles  describe
*/
const schema= Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^\d*$/).min(11).max(11),
    status: Joi.string(),
    gender: Joi.string().valid("0","1","2"),
    roles: Joi.array().items(Joi.string().regex(/^\d*$/)),
    describe: Joi.any(),
});
exports.createUser = async ctx => {
    let err=Joi.validate(ctx.request.body,schema);
    if(err.error){
        ctx.body={err:err.error.message};
        return;
    }
    let {name,email,phone,status,gender,roles,describe} = ctx.request.body;
    let createData={
        password:"123456",
        name,
        email,
        phone
    };
    if(status){createData.status=status;}
    if(gender){createData.gender=parseInt(gender);}
    if(roles){createData.roles=roles;}
    if(describe){createData.describe=describe;}
    try{
        let user=await Model.User.create(createData);
        let _promise=[];
        if(roles){
            _promise=roles.map((id)=>{
                return new Promise(async (resolve)=>{
                    resolve(await Model.Role.findById(id));
                });
            });
        }
        Promise.all(_promise).then((roles)=>{
            roles.forEach((role)=>{
                if(role){
                    user.setRoles(role);
                }
            });
        });
        
        //user.setRoles();
    }catch(e){
        if(e.errors[0]){
            ctx.body={err:e.errors[0].message};
        }else{
            ctx.body={code:500,message:"用户创建失败"};
        }
        return;
    }
    ctx.body={
        status:200,
        password:"123456"
    };
};