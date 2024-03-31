const Sequelize = require("sequelize")
const sequelize = require("../util/database")

const Team = sequelize.define("team", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
})

module.exports = Team
