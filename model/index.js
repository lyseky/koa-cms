const Sequelize =require("./sequelize");
const User =require("./user");
const Role =require("./role");
const System =require("./system");
const Nav =require("./nav");
const Log =require("./log");

User.belongsToMany(Role, {through: 'user_roles', as:'Roles'});
Role.belongsToMany(User, {through: 'user_roles', as:'Users'});

Role.belongsToMany(Nav, {through: 'role_navs', as:'Navs'});
Nav.belongsToMany(Role, {through: 'role_navs', as:'Roles'});

module.exports={
    Role,
    Sequelize,
    User,
    System,
    Nav,
    Log
}