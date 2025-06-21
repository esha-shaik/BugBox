const express = require('express');
const app = express();
const os = require('os');
const process = require('process');
const promClient = require('prom-client');
const { trace, context, propagation } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const PORT = 5001;
app.use(express.json());

// Setup Prometheus metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

const requestsCounter = new promClient.Counter({
  name: 'bugsim_requests_total',
  help: 'Total requests handled',
});
register.registerMetric(requestsCounter);

// Set up Jaeger tracing
const tracerProvider = new NodeTracerProvider();
const exporter = new JaegerExporter({ endpoint: 'http://jaeger:14268/api/traces' });
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));
tracerProvider.register();
const tracer = trace.getTracer('bugbox-bugsim');

// Root endpoint
app.get('/', (req, res) => {
  requestsCounter.inc();
  res.send(`Bug Simulator at ${os.hostname()}`);
});

// Failure injection endpoint
app.post('/inject/failure', (req, res) => {
  const { type, delay_ms = 1000, duration_s = 5 } = req.body;
  const timestamp = new Date().toISOString();
  requestsCounter.inc();

  // Start tracing span
  const span = tracer.startSpan(`inject-${type}`, {
    attributes: { type, delay_ms, duration_s }
  });

  if (type === 'crash') {
    console.log(`[${timestamp}] Injecting CRASH in ${duration_s}s`);
    res.json({ message: `Crashing in ${duration_s} seconds`, status: 'success' });
    setTimeout(() => {
      span.end();
      process.exit(1);
    }, duration_s * 1000);

  } else if (type === 'latency') {
    console.log(`[${timestamp}] Injecting ${delay_ms}ms LATENCY`);
    setTimeout(() => {
      span.end();
      res.json({ message: `Injected ${delay_ms}ms latency`, status: 'success' });
    }, delay_ms);

  } else {
    span.end();
    res.status(400).json({ error: 'Unknown failure type' });
  }
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`Bug Simulator running on port ${PORT}`);
});
