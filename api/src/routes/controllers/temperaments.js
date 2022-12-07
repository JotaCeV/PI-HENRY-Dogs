const { Router } = require("express");
const { Temperament } = require("../../db.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json(await Temperament.findAll());
  } catch (error) {
    return res.status(404).json({ err: error });
  }
});

module.exports = router;
