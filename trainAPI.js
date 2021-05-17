const fetch = require("node-fetch");

exports.locateStation = async function (stationName) {
  try {
    const response = await fetch(
      `http://transportapi.com/v3/uk/places.json?query=${stationName}&type=train_station&app_id=${process.env.TRANSPORT_API_ID}&app_key=${process.env.TRANSPORT_API_KEY}`
    );
    const json = await response.json();
    return json.member.map((data) => ({
      name: data.name,
      code: data.station_code,
      coords: [data.latitude, data.longitude],
    }));
  } catch (err) {
    console.error(err);
  }
};

exports.stationTrainData = async function (stationCode, type) {
  try {
    const response = await fetch(
      `https://transportapi.com/v3/uk/train/station/${stationCode}///timetable.json?app_id=${
        process.env.TRANSPORT_API_ID
      }&app_key=${process.env.TRANSPORT_API_KEY}&train_status=passenger&type=${
        type === "pass" ? "pass" : "arrival,departure"
      }`
    );
    const json = await response.json();
    const allData = type === "pass" ? json.passes.all : json.updates.all;
    return allData.map((data) => ({
      train_uid: data.train_uid,
      platform: data.platform || "?",
      operator_name: data.operator_name || "Operator name unknown",
      arrival_time: data.aimed_arrival_time || "Starts here",
      departure_time: data.aimed_departure_time || "Terminates here",
      pass_time: data.aimed_pass_time,
      origin_name: data.origin_name,
      destination_name: data.destination_name,
    }));
  } catch (err) {
    console.error(err);
  }
};

exports.closestStation = async function (lat, lng) {
  try {
    const response = await fetch(
      `https://transportapi.com/v3/uk/places.json?app_id=${process.env.TRANSPORT_API_ID}&app_key=${process.env.TRANSPORT_API_KEY}&lat=${lat}&lon=${lng}&type=train_station`
    );
    const json = await response.json();
    const station = json.member[0];
    return {
      name: station.name,
      code: station.station_code,
      distance: station.distance,
      coords: [station.latitude, station.longitude],
    };
  } catch (err) {
    console.error(err);
  }
};

exports.trainService = async function (trainId) {
  try {
    const response = await fetch(
      `https://transportapi.com/v3/uk/train/service/train_uid:${trainId}///timetable.json?app_id=${process.env.TRANSPORT_API_ID}&app_key=${process.env.TRANSPORT_API_KEY}&darwin=false&live=false`
    );
    const json = await response.json();
    return json.member.map((data) => ({
      name: data.station_name,
      code: data.station_code,
      platform: data.platform || "?",
      departure_time: data.aimed_departure_time,
    }));
  } catch (err) {
    console.error(err);
  }
};
