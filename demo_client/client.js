const axios = require('axios');

setInterval(() => {
  axios.get('http://demo_server:5005/ping')
    .then(res => {
      console.log(`Client received: ${res.data.message}`);
    })
    .catch(err => {
      console.error(`Error calling server: ${err.message}`);
    });
}, 2000);
