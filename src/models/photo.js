'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Photo.belongsTo(models.User, { as: 'user', foreignKey: 'contactId' })
      Photo.hasOne(models.Comment, { as: 'comment', foreignKey: 'photoId' })
    }
  };
  Photo.init({
    caption: DataTypes.STRING,
    url: DataTypes.STRING,
    contactId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};