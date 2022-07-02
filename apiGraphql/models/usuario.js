'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    filename: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    numTareas: DataTypes.INTEGER,
    munMensajes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  Usuario.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function(err, isMatch){
      if(err){
        return cb(err);
      }
      cb(null,isMatch);
    })
  };
  Usuario.beforeSave((user,options)=>{
    if(user.changed('password')){
      user.password = bcrypt.hashSync(user.password,bcrypt.genSaltSync(10),null);
    }
  })
  return Usuario;
};