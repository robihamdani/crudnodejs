const sequelize = require("sequelize");

const db = new sequelize("crudnodejs", "root", "", {
  dialect: "mysql"
});

db.sync({});

module.exports = db;
