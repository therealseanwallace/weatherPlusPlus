import express from "express";
import { processPOST } from "../services/weatherServices.js";

const router = express.Router();

router.get('/name/:name/country/:country/state/:state', async (req, res) => {
  console.log('GET request received. req.params is ', req.params);
  const { name, country, state } = req.params;
  const result = await processPOST(name, country, state);
  console.log('router! result is: ', result);
  res.send(result);
});

router.get('/name/:name', async (req, res) => {
  console.log('GET request received. req.params is ', req.params);
  const { name } = req.params;
  const result = await processPOST(name);
  res.send(result);
});

router.get('/name/:name/country/:country', async (req, res) => {
  console.log('GET request received. req.params is ', req.params);
  const { name, country } = req.params;
  const result = await processPOST(name, country);
  res.send(result);
});
export default router;

//apps/api/services/weatherServices.js