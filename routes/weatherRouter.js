import express from "express";
import { processPOST } from "../services/weatherServices.js";

const router = express.Router();

router.get('/name/:name/country/:country/state/:state', async (req, res) => {
  console.log('GET request received. req.params is ', req.params);
  const { name, country, state } = req.params;
  const result = await processPOST(name, country, state);
  res.send(result);
});

export default router;

//apps/api/services/weatherServices.js