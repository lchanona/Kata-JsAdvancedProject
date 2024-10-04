const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary in-memory storage
let songs = [];

// Create (POST)
app.post('/api/songs', (req, res) => {
    const song = {
        id: Date.now(),
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year
    };
    songs.push(song);
    res.status(201).json(song);
});

// Read (GET)
app.get('/api/songs', (req, res) => {
    res.status(200).json(songs);
});

// Update (PUT or PATCH)
app.patch('/api/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const song = songs.find(s => s.id === id);
    if (song) {
        song.title = req.body.title || song.title;
        song.artist = req.body.artist || song.artist;
        song.album = req.body.album || song.album;
        song.year = req.body.year || song.year;
        res.status(200).json(song);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

// Delete (DELETE)
app.delete('/api/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    songs = songs.filter(song => song.id !== id);
    res.status(200).json({ message: 'Song deleted' });
});

// Add a route to handle the root URL ("/")
app.get('/', (req, res) => {
    res.send('Welcome to my song app!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});