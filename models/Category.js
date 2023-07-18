const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    //define columns
    //id column
    id: {
      type: DataTypes.INTEGER, //specifies the type of data for this column. It will store integers.
      allowNull: false, //the id column can't be null
      primaryKey: true, //this is the primary key
      autoIncrement: true, //the value of the id field will automatically increment by 1

    },
  },
  {
    // defines the db connection that the model will use
    sequelize, 
    // determines whether or not the model should create timestamps (createdAt/updatedAt columns)
    timestamps: false, 
    // (Review this)Specifies whether sequelize should modify the table name based on the models name. 
    // When set to true, Sequelize will use the model's name as the exact table name in the database, 
    // without applying any pluralization or other modifications.
    freezeTableName: true, 
    // Determines whether sequelize should use underscores in the generated table and column names. 
    // When set to true, Sequelize will use underscores instead of camelCase for table and column names.
    // For example, a field named someField in the model would correspond to a column named some_field in the database.
    underscored: true,  
    //The modelName property explicitly sets the name of the model. By default, Sequelize will use the singular version 
    // of the model's name to infer the table name. In this case, the model's name is set to 'category', so Sequelize will 
    // use this name when referring to the model.
    modelName: 'category',
  }
);

module.exports = Category;
