const express = require('express');
const app = express();
const port = 6001;
app.use(express.json());

app.post('/log', (req, res) => {
  console.log("[LOG]", req.body);
  res.send("Logged");
});

app.listen(port, () => {
  console.log(`Log Collector running on port ${port}`);
});
