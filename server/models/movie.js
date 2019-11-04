module.exports = function (sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    movie_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movie_year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    overview: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    }, 
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  } );

  Movie.associate = function (models) {
    Movie.belongsTo(models.User);
  }

  return Movie;
};
