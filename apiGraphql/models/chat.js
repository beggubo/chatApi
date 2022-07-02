'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.Usuario,{
        foreignKey: 'usuarioId',
        as : 'usuario'
      })   
      Chat.belongsTo(models.Usuario,{
        foreignKey: 'remitenteId',
        as : 'remitente'
      })  
    }
  }
  Chat.init({
    /*participantes: DataTypes.STRING,*/
    participantes: DataTypes.ARRAY(DataTypes.STRING),
    estado: DataTypes.BOOLEAN,
    usuarios: DataTypes.ARRAY(DataTypes.INTEGER),
    remitenteId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    numRemitente: DataTypes.INTEGER,
    numDestinatario: DataTypes.INTEGER    
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};