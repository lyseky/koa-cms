const Orm = require("sequelize");
const Sequelize = require("./sequelize");
let Log = Sequelize.define('log',
    {
        id: {
            type: Orm.DataTypes.INTEGER,
            unique: true,//设置为true时，会为列添加唯一约束
            autoIncrement: true,//	是否自增
            comment: "日志ID",
            primaryKey: true,
        },
        content: {
            type: Orm.DataTypes.STRING,
            comment: "日志内容"
        },
        userName: {
            type: Orm.DataTypes.STRING,
            comment: "用户名",
        },
        ip: {
            type: Orm.DataTypes.STRING,
            comment: "客户端IP"
        },
    },
    {
        timestamps:true
    }
);
module.exports = Log;
