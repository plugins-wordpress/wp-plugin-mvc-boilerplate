// Socket.io client-side setup...


const socket = io.connect('http://localhost:3000', {
  query: { username: user.username},
  secure: true
   // Pass the user's username
});

// Making an API request to check user online status
fetch(`/is-online/${user.username}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.isOnline) {
        user.isOnline = true 
        user.status = 'online';
    } else {
      user.isOnline = false
      user.status = 'offline'
    }
  });

