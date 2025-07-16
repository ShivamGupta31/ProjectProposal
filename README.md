Design, develop, containerize, and deploy a lightweight API service that echoes HTTP request details (headers, method, body). Automate its lifecycle with CI/CD, Helm packaging, and Kubernetes deployment, following modern DevOps and cloud-native best practices.

---

## Tech Stack
- **Language:** Python (FastAPI)
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Packaging:** Helm
- **Deployment:** Kubernetes (k3d / Minikube)
- **Monitoring:** Prometheus Client Library (Python)
- **Security:** Open Policy Agent (OPA)

---

## Solution Design

### API Service
- FastAPI app exposing endpoint `/api`
- Returns request headers, method, and body
- Includes Prometheus metrics (request count)
- Follows Twelve-Factor App principles

### Dockerization
- Multi-stage Dockerfile for small image
- Non-root container execution
- Container-structure-tests

### CI/CD Pipeline
- GitHub Actions to:
  - Build Docker image
  - Run tests
  - Push to Docker Hub
  - Deploy to Kubernetes (manual trigger or automated)

### Helm Chart
- Helm chart deploying:
  - Deployment
  - Service
  - Ingress
  - RBAC entities
- Helm hooks and tests included

### Kubernetes Deployment
- Minikube or k3d
- OPA policies enforcing:
  - No containers as root
  - No default service account
- Nginx ingress exposure
- Prometheus metrics scraping

---

## Project Structure

```
repo-root/
│
├── api/                    # FastAPI source code
├── Dockerfile              # Multi-stage Dockerfile
├── .github/workflows/      # GitHub Actions pipelines
├── helm/                   # Helm chart files
├── opa-policies/           # OPA policy files
├── tests/                  # Container and API tests
├── README.md               # Setup, build, deploy, usage instructions
└── LICENSE
