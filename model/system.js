const Orm=require("sequelize");
const Sequelize=require("./sequelize");
let system = Sequelize.define('system',
    {
        id: {
            type: Orm.DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            comment: "唯一ID",
            primaryKey: true,
        },
        name: {
            type: Orm.DataTypes.STRING,
            comment: "系统名称"
        },
        keywords: {
            type: Orm.DataTypes.STRING,
            comment: "关键词"
        },
        description: {
            type: Orm.DataTypes.STRING,
            comment: "描述"
        },
        copyright: {
            type: Orm.DataTypes.STRING,
            comment: "版权"
        },
        record: {
            type: Orm.DataTypes.STRING,
            comment: "备案号"
        },
    },
);
module.exports=system;
