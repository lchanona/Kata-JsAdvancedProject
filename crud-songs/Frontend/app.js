// Get the form and song list elements
const songForm = document.getElementById('song-form');
const songList = document.getElementById('song-list');

// Add an event listener to the form submission
songForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const artist = document.getElementById('artist').value;
  const title = document.getElementById('title').value;
  const album = document.getElementById('album').value;

  // Send a POST request to the backend to create a new song
  fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ artist, title, album }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Update the song list here
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${data.artist}</td>
      <td>${data.title}</td>
      <td>${data.album}</td>
      <td>Actions</td>
    `;
    songList.appendChild(newRow);
  })
  .catch((error) => console.error(error));
});