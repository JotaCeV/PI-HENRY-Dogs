const axios = require("axios");

const getApiDogs = async () => {
  let response = await axios.get("https://api.thedogapi.com/v1/breeds");
  response = response.data;

  const dbDogs = response.map((dog) => {
    let lifeSpanNum = dog.life_span.replace("years", "Años");

    return {
      name: dog.name,
      height: dog.height.metric + " Cm",
      weight: dog.weight.metric + " Kg",
      life_span: lifeSpanNum,
      image: dog.image.url,
      temperament: dog.temperament,
    };
  });

  return dbDogs;
};

const getTemperament = async () => {
  let response = await axios.get("https://api.thedogapi.com/v1/breeds");
  response = response.data;

  const tempNames = [];
  const dogsTemperament = response.map(async (dog) => {
    if (dog.temperament) {
      let str = dog.temperament;
      let arr = str?.split(", ");
      await arr.forEach((element) => tempNames.push(element));
    }
  });

  const dbTemperament = tempNames.reduce((acc, element) => {
    if (!acc.find((d) => d == element)) {
      acc.push(element);
    }

    return acc;
  }, []);

  let temps = [];
  dbTemperament.forEach((element) => {
    temps.push({ name: element });
  });

  return temps;
};

module.exports = {
  getApiDogs,
  getTemperament,
};
