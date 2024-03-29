const User = require("./User");
const Game = require("./Game");

User.hasMany(Game,{
    onDelete:"CASCADE"
});
Game.belongsTo(User);


module.exports = { User, Game };
