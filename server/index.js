require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}/`);
});
