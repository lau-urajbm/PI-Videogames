const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released:{
      type: DataTypes.STRING,
      allowNull: true
    },
    rating:{
      type: DataTypes.REAL,
      allowNull: true
    },
    platforms:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    background_image:{
      type:DataTypes.TEXT,
      defaultValue:''
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  },
  {          
    timestamps: false,
    createdAt: false,
    updatedAt: false

});
};
