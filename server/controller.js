const Router = require('express-promise-router');
const request = require('request');
// const db = require('./model');

const router = new Router();

router.get('/stocks/', (req, res) => {
  console.log('inside get reques');
  const { quote, functionType } = req.query;
  const key = process.env.API_KEY;
  request(
    `https://www.alphavantage.co/query?function=${functionType}&symbol=${quote}&apikey=${key}`,
    (error, response, body) => {
      if (!(error)) {
        res.send(body);
      }
    },
  );
});

module.exports = router;
