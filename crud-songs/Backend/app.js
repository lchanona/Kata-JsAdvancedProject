const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('frontend'));

const songs = []; // temporary storage for songs

app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.post('/api/songs', (req, res) => {
  const { artist, title, album } = req.body;
  const newSong = { artist, title, album };
  songs.push(newSong);
  res.json(newSong);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});