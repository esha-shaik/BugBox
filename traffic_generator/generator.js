const axios = require('axios');

const interval = 2000; // 2 seconds

setInterval(() => {
  axios.get('http://bug_simulator:5001/')
    .then(res => {
      console.log(`Success: ${res.data}`);
    })
    .catch(err => {
      console.error(`Error: ${err.message}`);
    });
}, interval);
