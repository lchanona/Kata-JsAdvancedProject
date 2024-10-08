const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Temporary in-memory storage for songs
let songs = [];

// Create (POST) - Add a new song
app.post('/api/songs', (req, res) => {
    const song = {
        id: Date.now(), // Unique ID using Date.now()
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
    };
    songs.push(song);
    res.status(201).json(song);
});

// Read (GET) - Fetch all songs
app.get('/api/songs', (req, res) => {
    res.status(200).json(songs);
});

// Update (PATCH) - Update a song
app.patch('/api/songs/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert ID to integer
    const song = songs.find(s => s.id === id);
    
    if (song) {
        song.title = req.body.title || song.title;
        song.artist = req.body.artist || song.artist;
        song.album = req.body.album || song.album;
        res.status(200).json(song);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

// Delete (DELETE) - Delete a song
app.delete('/api/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const songIndex = songs.findIndex(s => s.id === id);

    if (songIndex !== -1) {
        songs.splice(songIndex, 1);
        res.status(200).json({ message: 'Song deleted' });
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

// Add a route to handle the root URL ("/")
app.get('/', (req, res) => {
    res.send('Welcome to my song app made by Luis Chanona!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
