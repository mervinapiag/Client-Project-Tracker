'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    client_name: DataTypes.STRING,
    project_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    start_date: DataTypes.DATE,
    due_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};