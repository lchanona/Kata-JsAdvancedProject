const songForm = document.getElementById('song-form');
const songList = document.getElementById('song-list');

// Fetch and display all songs on page load
window.onload = function() {
    fetchSongs();
};

// Add a new song
songForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const songData = {
        title: document.getElementById('title').value,
        artist: document.getElementById('artist').value,
        album: document.getElementById('album').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(songData),
        });

        if (response.ok) {
            fetchSongs();
        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
});

// Fetch all songs from the server
async function fetchSongs() {
    try {
        const response = await fetch('http://localhost:3000/api/songs');
        const songs = await response.json();
        displaySongs(songs);
    } catch (error) {
        console.error(error);
    }
}

// Display songs in the DOM
function displaySongs(songs) {
    songList.innerHTML = '';
    songs.forEach((song) => {
        const songItem = document.createElement('div');
        songItem.dataset.id = song.id;

        const titleElement = `<h3>${song.title} by ${song.artist}</h3>`;
        const albumElement = `<p>Album: ${song.album}</p>`;
        const buttons = `
            <button onclick="deleteSong(${song.id})">Delete</button>
            <button onclick="updateSong(${song.id})">Update</button>
        `;
        const updateForm = `
            <form id="update-form">
                <input type="text" id="title" value="${song.title}">
                <input type="text" id="artist" value="${song.artist}">
                <input type="text" id="album" value="${song.album}">
                
            </form>
        `;

        songItem.innerHTML = `${titleElement}${albumElement}${buttons}${updateForm}`;
        songList.appendChild(songItem);
    });
}

// Delete a song
async function deleteSong(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/songs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchSongs();
        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}

// Update a song
async function updateSong(id) {
    const songItem = document.querySelector(`[data-id="${id}"]`);
    const titleInput = songItem.querySelector('#title');
    const artistInput = songItem.querySelector('#artist');
    const albumInput = songItem.querySelector('#album');

    const newTitle = titleInput.value;
    const newArtist = artistInput.value;
    const newAlbum = albumInput.value;

    const songData = {
        title: newTitle,
        artist: newArtist,
        album: newAlbum,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/songs/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(songData),
        });

        if (response.ok) {
            fetchSongs();
        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
}