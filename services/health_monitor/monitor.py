import requests
import time
import json

SERVICES = {
    "bug_simulator": "http://bug_simulator:5001",
    "log_collector": "http://log_collector:6001"
}

while True:
    for name, url in SERVICES.items():
        try:
            response = requests.get(url)
            status = "UP" if response.status_code == 200 else "DEGRADED"
        except:
            status = "DOWN"
        log = {
            "service": name,
            "status": status,
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ')
        }
        print(json.dumps(log))
    time.sleep(10)
