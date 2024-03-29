const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init({
    // add properites here, ex:
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    platform: {
        type: DataTypes.STRING,
        allowNull:false
   },
    review: {
        type: DataTypes.TEXT,
        allowNull:false
   },
    score: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:5
        }
   }
},{
    sequelize
});

module.exports=Game