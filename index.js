const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const scores = {}; // In-memory country scores

app.post('/score', (req, res) => {
  const { country } = req.body;
  if (!country) return res.status(400).json({ error: 'Missing country' });
  scores[country] = (scores[country] || 0) + 1;
  res.json({ success: true, country, total: scores[country] });
});

app.get('/scores', (req, res) => {
  res.json(scores);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
