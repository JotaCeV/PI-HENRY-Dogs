//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { getApiDogs, getTemperament } = require("./src/service/utils.js");
const { Dog, Temperament, DogTemperament } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  const apiDogs = await getApiDogs();
  const apiTemperament = await getTemperament();

  apiTemperament.forEach(async (temperament) => {
    await Temperament.create(temperament);
  });

  apiDogs.forEach(async (dog) => {
    const createdDog = await Dog.create(dog);
    if (createdDog.temperament) {
      let str = createdDog.temperament;
      let arr = str?.split(", ");
      arr?.forEach(async (temp) => {
        const temperamentId = await Temperament.findOne({
          where: { name: temp },
        });
        await DogTemperament.create({
          DogId: createdDog.id,
          TemperamentId: temperamentId.dataValues.id,
        });
      });
    }
  });

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
