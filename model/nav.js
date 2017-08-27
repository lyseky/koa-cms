const Orm = require("sequelize");
const Sequelize = require("./sequelize");
let Nav = Sequelize.define("nav",
    {
        id: {
            type: Orm.DataTypes.INTEGER,
            unique: true,//设置为true时，会为列添加唯一约束
            autoIncrement: true,//	是否自增
            comment: "菜单ID",
            primaryKey: true,
        },
        name: {
            type: Orm.DataTypes.STRING,
            comment: "菜单名称"
        },
        pid: {
            type: Orm.DataTypes.INTEGER,
            defaultValue: 0,//	字面默认值,
            comment: "菜单父级ID"
        },
        path: {
            type: Orm.DataTypes.STRING,
            comment: "子菜单path",
            unique: true,//设置为true时，会为列添加唯一约束
        }
    },
);
module.exports=Nav;
