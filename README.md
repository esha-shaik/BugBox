# BugBox

## Proposed File  Structure

- docker-compose.yml: Orchestrates all services and dependencies.
- .env: Will store environment variables for configuration.
- bugbox_demo.ipynb: Reproducible notebook to test bug injection.
- services/: Contains the three main microservices:
  - `bug_simulator`: Injects crashes, latency, and resource strain.
  - `log_collector`: Collects structured logs.
  - `health_monitor`: Tracks service availability.
- prometheus/: Configuration for Prometheus metrics scraping.
- grafana/: Contains Grafana dashboard JSONs for monitoring.
- dashboard/ *(optional)*: UI built with React (for logs and metrics).

## Getting Started

```bash
Run docker-compose up --build

Next, run the bugboxdemo.ipynb notebook to run a simple bugbox simulation.

Access:

http://localhost:5001/inject/failure – Simulate bugs

http://localhost:9090 – Prometheus

http://localhost:3000 – Grafana

```

## Proof of Concept
interface.html serves as a proof of concept on what BugBox will look like and how it can serve coders.
To view this interface click [here](https://htmlpreview.github.io/?https://raw.githubusercontent.com/esha-shaik/BugBox/refs/heads/main/interface.html)