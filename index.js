
// index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const scoresFile = path.join(__dirname, 'scores.json');

// Load existing scores from file if available
let scores = {};
if (fs.existsSync(scoresFile)) {
  try {
    scores = JSON.parse(fs.readFileSync(scoresFile, 'utf-8'));
    console.log('✅ Loaded scores from disk.');
  } catch (e) {
    console.error('⚠️ Failed to parse scores.json:', e);
  }
}

// Save scores to disk
function saveScores() {
  fs.writeFileSync(scoresFile, JSON.stringify(scores, null, 2));
}

app.post('/score', (req, res) => {
  const { country } = req.body;
  if (!country) return res.status(400).send({ error: 'No country provided' });

  scores[country] = (scores[country] || 0) + 1;
  saveScores(); // Save after every update

  console.log(`[POST] ${country}: ${scores[country]}`);
  res.status(200).send({ success: true });
});

app.get('/scores', (req, res) => {
  res.send(scores);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
