const Orm=require("sequelize");
const Sequelize=require("./sequelize");
let User = Sequelize.define("user",
    {
        id: {
            type: Orm.DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            comment: "用户ID",
            primaryKey: true,
        },
        name: {
            type: Orm.DataTypes.STRING,
            comment: "用户名称",
            unique:true,
            allowNull:false,
        },
        password: {
            type: Orm.DataTypes.STRING,
            comment: "用户密码",
            allowNull:false,
        },
        email: {
            type: Orm.DataTypes.STRING,
            comment: "邮箱"
        },
        phone: {
            type: Orm.DataTypes.STRING,
            comment: "手机号"
        },
        status: {
            type: Orm.DataTypes.BOOLEAN,
            comment: "用户状态"
        },
        birthDate:{
            type: Orm.DataTypes.DATE,
            comment: "出生日期"
        },
        gender:{
            type: Orm.DataTypes.INTEGER,
            comment: "性别",
            defaultValue:0
        },
        describe:{
            type: Orm.DataTypes.STRING,
            comment: "描述"
        }
    },{
        timestamps:true
    }
);
module.exports=User;
