const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

// Initialize model by extending off Sequelize's Model class
class Post extends Model {}

// Table definition for a category
// Two column definitions
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    creation_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        isAlphanumeric: true,
        len: [1,1E4]
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;