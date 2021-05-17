const express = require("express");
const trainAPI = require("../trainAPI.js");

const router = express.Router();

router.get("/search-station", async (req, res) => {
  res.json(await trainAPI.locateStation(req.query.stationname));
});

router.get("/station-trains", async (req, res) => {
  res.json(
    await trainAPI.stationTrainData(req.query.stationcode, req.query.type)
  );
});

router.get("/closest-station", async (req, res) => {
  res.json(await trainAPI.closestStation(req.query.lat, req.query.lng));
});

router.get("/train-service", async (req, res) => {
  res.json(await trainAPI.trainService(req.query.trainId));
});

module.exports = router;
