'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {as: 'user', foreignKey: 'contactId', foreignKeyConstrain: true});
      Comment.belongsTo(models.Photo, {as: 'photo', foreignKey: 'photoId', foreignKeyConstrain: true});
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    photoId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};