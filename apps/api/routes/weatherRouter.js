import express from "express";
import processGET from "../services/weatherServices.js";

const router = express.Router();

router.get("/name/:name/country/:country/state/:state", async (req, res) => {
  console.log("GET request received. req.params is ", req.params);
  const { name, country, state } = req.params;
  const result = await processGET(name, country, state);
  console.log("GET request processed! result is: ", result);
  res.send(result);
});

export default router;

//apps/api/services/weatherServices.js
