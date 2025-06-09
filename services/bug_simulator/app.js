const express = require('express');
const app = express();
const port = 5001;
app.use(express.json());

app.post('/inject/failure', (req, res) => {
  const { type, target, duration, delay } = req.body;
  console.log(`[FAILURE] Type: ${type} on ${target}, Duration: ${duration || delay}`);
  
  if (type === 'crash') {
    setTimeout(() => {
      process.exit(1); // simulate crash
    }, (duration || 5) * 1000);
  }

  if (type === 'latency') {
    setTimeout(() => {
      res.json({ message: `${target} delayed by ${delay}ms`, status: "success" });
    }, delay);
    return;
  }

  res.json({ message: `${type} simulated on ${target}`, status: "success" });
});

app.listen(port, () => {
  console.log(`Bug Simulator running at http://localhost:${port}`);
});
