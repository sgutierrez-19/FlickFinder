module.exports = function(sequelize, DataTypes) {
  var Candle = sequelize.define("Candle", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    scent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Candle.associate = function (models) {
    Candle.belongsTo(models.User);
  }
  
  return Candle;
};
