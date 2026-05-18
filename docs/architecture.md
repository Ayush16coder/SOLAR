# System Architecture & Product Blueprint

## Overview
Solar is a "Central OS" for development designed to connect developer ecosystems, manage deployments, and integrate AI systems in real-time.

## System Architecture Diagram
```mermaid
graph TD
    subgraph Client Layer
        WebUI[Next.js Dashboard]
        CLI[Solar CLI]
    end

    subgraph Gateway Layer
        NGINX[NGINX Ingress / Load Balancer]
        Gateway[API Gateway - NestJS]
    end

    subgraph Service Layer
        AuthSvc[Auth Service]
        ProjectSvc[Project Management Service]
        DeploymentSvc[Deployment & Hosting Service]
        SyncSvc[Real-time Sync Engine - WebSocket]
        AISvc[AI Integration Service]
        LogSvc[Unified Monitoring & Logging]
    end

    subgraph Data Layer
        PostgreSQL[(PostgreSQL - Primary DB)]
        Redis[(Redis - Pub/Sub & Cache)]
        S3[(Object Storage - Assets/Logs)]
    end

    subgraph Infrastructure
        K8s[Kubernetes Cluster]
        Docker[Docker Containers]
        Terraform[Infrastructure as Code]
    end

    Client Layer --> NGINX
    NGINX --> Gateway
    Gateway --> Service Layer
    Service Layer --> Data Layer
    Service Layer --> Infrastructure
```

## Microservice Plan
1.  **Auth Service**: Handles multi-tenant authentication, RBAC, and session management.
2.  **Project Service**: Manages developer ecosystems, repositories, and workspace configurations.
3.  **Deployment Service**: Orchestrates CI/CD pipelines, container builds, and hosting provider integrations.
4.  **Sync Engine**: A dedicated WebSocket service for real-time code changes and event broadcasting.
5.  **AI Service**: Orchestration layer for LLMs (OpenAI, Claude, Gemini) to provide coding assistance.
6.  **Monitoring Service**: Aggregates logs and metrics from all services and deployments.

## Deployment Pipeline Architecture
1.  **Trigger**: Code change or manual trigger via UI/CLI.
2.  **Build**: Docker image creation using Kaniko or Docker-in-Docker within K8s.
3.  **Test**: Automated testing suite execution.
4.  **Deploy**: Kubernetes manifest update or Terraform apply for infrastructure changes.
5.  **Notify**: Real-time status updates via WebSocket.

## Finalized Tech Stack
-   **Frontend**: Next.js, TypeScript, Tailwind CSS, Monaco Editor (for IDE features).
-   **Backend**: NestJS (Microservices architecture).
-   **Database**: PostgreSQL (Relational data), Redis (Speed & Real-time).
-   **Real-time**: Socket.IO with Redis Adapter.
-   **Infrastructure**: Docker, Kubernetes, Terraform.
-   **AI Layer**: LangChain/NestJS integration with OpenAI, Anthropic, and Google.
