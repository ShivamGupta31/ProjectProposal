# Node.js Demo API Service

A simple Node.js Express API that prints request headers, method, and body. The application is Dockerized, integrated with GitHub Actions for CI/CD, and deployable via Helm charts on Kubernetes.

---

## 📦 Tech Stack

- Node.js + Express
- Docker (Multi-stage build)
- GitHub Actions (CI/CD)
- Kubernetes + Helm

---

## 🚀 Setup & Run Locally

1. **Clone the Repository**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/demo-api.git
cd demo-api

Install dependencies
npm install

Run the Server
node index.js

Test API
curl --header "Content-Type: application/json" \
--data '{"username":"xyz","password":"xyz"}' \
http://localhost:3000/api

🐳 Docker Setup
1️⃣ Build Docker Image
docker build -t demo-api .

2️⃣ Run Docker Container
 docker run -d -p 3000:3000 --name demo-api demo-api

3️⃣ Stop & Remove Container
docker stop demo-api
docker rm demo-api

🛠️ Dockerfile (Multi-stage Build)
# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production Image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js .
COPY --from=builder /app/package.json .

EXPOSE 3000

CMD ["node", "index.js"]

⚙️ CI/CD Pipeline Using GitHub Actions
The CI/CD pipeline automatically builds and pushes Docker images and deploys to your server.

📁 Workflow File: .github/workflow/docker-cicd.yml
name: CI/CD Pipeline - Dockerized Node.js API

on:
  push:
    branches:
      - main

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v4

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and Push Docker Image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/demo-api:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
    - name: Deploy via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SSH_HOST }}
        username: ${{ secrets.SSH_USER }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          docker pull ${{ secrets.DOCKER_USERNAME }}/demo-api:latest
          docker stop demo-api || true
          docker rm demo-api || true
          docker run -d -p 3000:3000 --name demo-api ${{ secrets.DOCKER_USERNAME }}/demo-api:latest

🔐 Required GitHub Secrets
Secret Name	Description
DOCKER_USERNAME	Docker Hub username
DOCKER_PASSWORD	Docker Hub access token
SSH_HOST	Server IP or domain
SSH_USER	SSH username
SSH_KEY	SSH private key (without passphrase)

📦 Kubernetes Deployment via Helm
Helm charts are stored in the helm-chart/ directory.

1️⃣ Navigate to Helm Chart Directory
cd helm-chart

2️⃣ Install Using Helm
helm install demo-api .

3️⃣ Upgrade Release (if needed)
helm upgrade demo-api .

4️⃣ Uninstall Deployment
helm uninstall demo-api

📂 Project Structure
demo-api/
├── .github/workflows/docker-cicd.yml
├── Dockerfile
├── .dockerignore
├── package.json
├── server.js
├── helm-chart/
└── README.md

📤 Steps to Push Project to GitHub
Initialize Git
git init
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/demo-api.git

Add and Commit Code
git add .
git commit -m "Initial commit - Node.js API with Docker, CI/CD, and Helm"

Push to GitHub
git branch -M main
git push -u origin main

