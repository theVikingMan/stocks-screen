const Router = require('express-promise-router');
// const db = require('./model');

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).send('get request recieved');
});

module.exports = router;
