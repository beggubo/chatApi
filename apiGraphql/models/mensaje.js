'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mensaje.belongsTo(models.Chat,{
        foreignKey: 'chatId',
        as : 'chat'
      })
      Mensaje.belongsTo(models.Usuario,{
        foreignKey: 'remitenteId',
        as : 'usuario'
      })
    }
  }
  Mensaje.init({
    texto: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    remitente: DataTypes.STRING,
    filename: DataTypes.STRING,
    tipo: DataTypes.STRING,
    remitenteId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mensaje',
  });
  return Mensaje;
};