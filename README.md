# BugBox

## Proposed File  Structure
chaoslab/
├── docker-compose.yml
├── .env
├── bugbox_demo.ipynb           # Jupyter notebook to run bugs
├── README.md
├── services/
│   ├── bug_simulator/
│   │   ├── Dockerfile
│   │   └── app.js
│   ├── log_collector/
│   │   ├── Dockerfile
│   │   └── app.js
│   ├── health_monitor/
│   │   ├── Dockerfile
│   │   └── monitor.py
├── prometheus/
│   └── prometheus.yml
├── grafana/                       # For dashboards and volumes
│   └── dashboards/
│       └── example-dashboard.json
├── dashboard/                     # (Optional frontend)
│   └── (React code here)

## Getting Started

```bash
docker-compose up --build

Access:

http://localhost:5001/inject/failure – Simulate bugs

http://localhost:9090 – Prometheus

http://localhost:3000 – Grafana