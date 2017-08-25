const Orm=require("sequelize");
const Sequelize=require("./sequelize");
let Role = Sequelize.define('role',
    {
        id: {
            type: Orm.DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            comment: "角色ID",
            primaryKey: true,
        },
        name: {
            type: Orm.DataTypes.STRING,
            comment: "角色名称",
            unique:true,
            allowNull:false,
        },
        status: {
            type: Orm.DataTypes.BOOLEAN,
            comment: "角色状态"
        },
    },{
        timestamps:true
    }
);
module.exports=Role;
