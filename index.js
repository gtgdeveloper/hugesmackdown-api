// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let scores = {}; // In-memory score tracker

app.post('/score', (req, res) => {
  const { country } = req.body;
  if (!country) return res.status(400).send({ error: 'No country provided' });

  scores[country] = (scores[country] || 0) + 1;
  console.log(`[POST] ${country}: ${scores[country]}`);
  res.status(200).send({ success: true });
});

app.get('/scores', (req, res) => {
  res.send(scores);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
