const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: { // EL id es un campo de tipo UUID para no tener colisiones con los id de la api
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    img:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'https://w7.pngwing.com/pngs/855/341/png-transparent-pokemon-pikachu-pikachu-pokemon-x-and-y-pokemon-go-pokemon-ruby-and-sapphire-ash-ketchum-pokemon-dog-like-mammal-cartoon-snout-thumbnail.png',
    },
    createdInDb: { // Campo para saber si el pokemon fue creado en la base de datos o no
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
