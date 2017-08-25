const Model = require("../model");    
(async () =>{
    await Model.Sequelize.sync();
    await Model.System.create({
        name:"",        
        keywords:"",        
        description:"",        
        copyright:"",        
        record:"",        
    });
    await Promise.all([
        Model.User.create({
            name: "admin",
            password: "admin",
            email: "438910313@qq.com",
            phone: "17321354808",
            status: true
        }),
        Model.Role.create({
            name: "管理员",
            status: true
        })
    ]).then((res) => {
        res[0].setRoles(res[1]);
    });
})();