const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let state = {
  services: [
    { name: "API Gateway", icon: "🚪", status: "healthy", latency: 12, cpu: 15 },
    { name: "User Service", icon: "👤", status: "healthy", latency: 45, cpu: 25 },
    { name: "Product Service", icon: "📦", status: "healthy", latency: 32, cpu: 30 },
    { name: "Cart Service", icon: "🛒", status: "healthy", latency: 28, cpu: 20 },
    { name: "Payment Service", icon: "💳", status: "healthy", latency: 67, cpu: 35 },
    { name: "Inventory Service", icon: "📊", status: "healthy", latency: 41, cpu: 22 },
    { name: "Notification Service", icon: "📧", status: "healthy", latency: 89, cpu: 18 },
    { name: "Database", icon: "💾", status: "healthy", latency: 15, cpu: 40 }
  ],
  metrics: {
    throughput: 800,
    latency: 20,
    errorRate: 0.1
  },
  logs: [],
  chaosActive: false
};

function log(level, message) {
  state.logs.unshift({
    timestamp: new Date().toISOString(),
    level,
    message
  });
  if (state.logs.length > 50) state.logs.pop();
}
app.get('/', (req, res) => {
  res.sendFile('C:/CS 6365/BugBox/public/interface.html');
});
app.get('/api/state', (req, res) => {
  res.json(state);
});

app.post('/api/inject/:type', (req, res) => {
    const { type } = req.params;

    if (type === 'latency') {
        state.metrics.latency += 200;
        state.metrics.errorRate += 1.5;
        log('warning', 'Injected network latency');
    } else if (type === 'failure') {
        state.metrics.throughput *= 0.5;
        state.metrics.errorRate += 4.5;
        log('error', 'Injected service failure');
    } else if (type === 'cpu') {
        state.metrics.latency += 100;
        log('warning', 'Simulated CPU spike');
    } else {
        return res.status(400).json({ error: 'Invalid chaos type' });
    }

    res.json({ success: true });
});

app.post('/api/reset', (req, res) => {
  // Reset services and metrics...
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`BugBox server running at http://localhost:${PORT}`);
});