const { User, Game } = require("../models");
const sequelize = require("../config/connection11")
const userSeeds = [
  {
    email: "cats@meow.com",
    password: "meowmeow"
  },
  {
    email: "joe@joe.joe",
    password: "password"
  },
];

const reviewSeeds = [
  {
    title: "Final Fantasy VII: Rebirth",
    platform: "PS5",
    review: "its great but gets real weird at the end",
    score: 5,
    UserId: 2
  },
  {
    title: "stick",
    platform: "the floor",
    review: "yes i love to snap at the stick",
    score: 5,
    UserId: 1
  },
];

const seedme = async () => {
  try {
    await sequelize.sync({ force: true });
    const userData = await User.bulkCreate(userSeeds, {
      individualHooks: true,
    });
    const reviewData = await Game.bulkCreate(reviewSeeds);
    const users = userData.map((usr) => usr.toJSON());
    const games = reviewData.map((gam) => gam.toJSON());
    console.table(users);
    console.table(games);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

seedme();
