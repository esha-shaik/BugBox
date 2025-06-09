const express = require('express');
const app = express();
app.use(express.json());

const PORT = 5001;

app.post('/inject/failure', (req, res) => {
  const { failure_type, delay_ms } = req.body;

  const timestamp = new Date().toISOString();

  if (failure_type === 'crash') {
    console.log(`[${timestamp}] Injecting crash`);
    res.json({ message: 'bug_simulator has crashed intentionally.', status: 'success', duration: 30 });
    process.exit(1);
  } else if (failure_type === 'latency') {
    console.log(`[${timestamp}] Injecting latency of ${delay_ms}ms`);
    setTimeout(() => {
      res.json({ message: `Injected ${delay_ms}ms delay`, status: 'success' });
    }, delay_ms);
  } else {
    res.status(400).json({ error: 'Unknown failure type' });
  }
});

app.listen(PORT, () => console.log(`bug_simulator running on port ${PORT}`));
