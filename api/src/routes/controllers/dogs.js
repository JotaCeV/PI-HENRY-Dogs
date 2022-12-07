const { Router } = require("express");
const { Dog, Temperament, DogTemperament } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      return res.status(200).json(await Dog.findAll({ where: { name: name } }));
    }

    return res.status(200).json(await Dog.findAll());
  } catch (error) {
    return res.status(404).json({ err: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundDog = await Dog.findByPk(id);
    if (foundDog) {
      return res.status(200).json(foundDog);
    }
  } catch (error) {
    return res.status(404).json({ err: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const dog = await Dog.create(req.body);
    if (dog.temperament) {
      let str = dog.temperament;
      let arr = str?.split(", ");
      arr.forEach(async (temp) => {
        let foundTemperament = await Temperament.findAll({
          where: { name: temp },
        });
        await dog.addTemperament(foundTemperament, { through: DogTemperament });
      });
    }

    if (dog) {
      return res.status(201).json(dog);
    }
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Dog.destroy({ where: { id: id } });
    return res.status(200).send("Se elimino correctamente!");
  } catch (error) {
    return res.status(400).json({ err: error });
  }
});

module.exports = router;
