# BugBox – Chaos Engineering Sandbox

BugBox is an educational chaos engineering platform designed to let you inject failures into microservices and observe system behavior. It includes a frontend for visualizing service health, a backend for service orchestration, and example services with logging and monitoring.

---

## File Structure

```plaintext
.
├── docker-compose.yml         # services and dependencies
├── bugbox_demo.ipynb          # Jupyter notebook to simulate bugs and test injection
├── reproducible.html          # Interactive frontend for injecting chaos into services
├── server.js                  # Node.js backend server
├── services/                  # Core microservices
│   ├── bug_simulator/         # Injects crashes, latency, and resource strain
│   ├── log_collector/         # Collects structured logs
│   └── health_monitor/        # Tracks service availability
├── prometheus/                # Prometheus metrics configuration
├── grafana/                   # Grafana dashboard JSONs for visual monitoring
```

---

## Start

### 1. Run the services locally

```bash
docker-compose up --build
```

### 2. Test with the demo notebook

Run `bugbox_demo.ipynb` in Jupyter to test simulate bug injection and observe metrics.

### 3. Try the reproducible frontend

Open [`reproducible.html`]() in your browser to interactively inject chaos and view the service graph.

#### Add your own service

You can input your own **live API URL** to test with BugBox:

Example working services:

* [https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)
* [https://catfact.ninja/fact](https://catfact.ninja/fact)

Example failing services:

* [https://httpstat.us/200](https://httpstat.us/200) — always returns 200 OK
* [https://httpstat.us/500](https://httpstat.us/500) — simulates a server error

BugBox will visualize them with statuses like **healthy**, **degraded**, or **failed**.

---

## In-Progress Work

You can run a backend version with service connection support:

```bash
node server.js
```

Then open:

```
http://localhost:4000/
```

This connects the frontend to a backend proxy (enabling secure fetch and chaos injection into user-uploaded or private services if they modify the server file).

For the future this functionality can be better repsented by:

* Making the backend publicly accessible for external service testing
* Allowing users to upload service files (e.g., OpenAPI) for simulation
* Enabling chaos injection directly from the browser using the UI