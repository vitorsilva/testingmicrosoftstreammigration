const fetch = require('node-fetch'); // You can use the 'node-fetch' package to make HTTP requests in Node.js

// Set up authentication
const client_id = 'your-client-id';
const client_secret = 'your-client-secret';
const tenant = 'your-tenant';
const auth_url = `https://login.microsoftonline.com/${tenant}/oauth2/token`;
const auth_data = {
  grant_type: 'client_credentials',
  client_id,
  client_secret,
  resource: 'https://api.microsoftstream.com',
};
fetch(auth_url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams(auth_data),
})
  .then((res) => res.json())
  .then((auth_response) => {
    const access_token = auth_response.access_token;

    // Set up API request
    const api_url = 'https://api.microsoftstream.com/v1.0/me/videos';
    const headers = {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    };

    // Send API request and retrieve list of videos
    fetch(api_url, {
      method: 'GET',
      headers: headers,
    })
      .then((res) => res.json())
      .then((response) => {
        const video_list = response.value;

        // Print list of video names and IDs
        for (let i = 0; i < video_list.length; i++) {
          console.log(`Video Name: ${video_list[i].name}, Video ID: ${video_list[i].id}`);
        }
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
