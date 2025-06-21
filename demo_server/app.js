const express = require('express');
const promClient = require('prom-client');
const app = express();
const PORT = 5005;

// Metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });
const pingCounter = new promClient.Counter({
  name: 'demo_server_pings_total',
  help: 'Total ping requests received',
});
register.registerMetric(pingCounter);

app.get('/ping', (req, res) => {
  pingCounter.inc();
  res.json({ message: 'pong' });
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => console.log(`Demo server on port ${PORT}`));
