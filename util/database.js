const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-complete','root','Neha@5678',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;


