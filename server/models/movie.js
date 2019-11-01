module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    movie_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    movie_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    overview: {
      type: DataTypes.STRING,
      allowNull: false
    },
    poster_path: {
      type:DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Movie.associate = function (models) {
    Movie.belongsTo(models.User);
  }
  
  return Movie;
};
