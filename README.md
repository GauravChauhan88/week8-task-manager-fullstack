# 📋Task Management Full Stack Application

A comprehensive, enterprise-grade Task Management platform built to demonstrate advanced full-stack development methodologies. This application provides a seamless, secure, and highly responsive environment for tracking daily objectives, featuring real-time state synchronization, stateless security, and an event-driven architecture.

---

# 📝 Project Overview
The objective of this project is to architect and deploy a robust web application that bridges a modern, component-based frontend with a scalable, secure RESTful backend.

## Core Objectives Achieved:

* Security First: Implementation of a strict, stateless JWT-based authentication flow.

* Data Integrity: Comprehensive backend validation preventing malformed or malicious data persistence.

* Real-Time Capabilities: Preparation of STOMP-based WebSocket channels for live updates.

* Professional DevOps: Containerization using Docker for guaranteed environment consistency.

---
# 🚀 Key Features
---

## Backend Architecture (Spring Boot)
* Stateless Security: JWT authentication with BCrypt password hashing and role-based access control.

* RESTful API Design: Standardized GET, POST, PUT, and DELETE endpoints for task lifecycle management.

* Data Validation: Strict input sanitization using jakarta.validation annotations (e.g., @NotBlank, @Size).

* Robust Error Handling: Global exception handling returning standardized, predictable JSON error responses.

* API Documentation: Auto-generated interactive API documentation via Swagger UI / OpenAPI 3.0.

* Database Management: PostgreSQL integration.

---

## Frontend Experience (React + TypeScript)
* Type Safety: End-to-end TypeScript interfaces matching backend DTOs for zero-runtime type errors.

* Component-Driven UI: Modular, reusable components (Dashboard, Forms, Layouts) styled with Tailwind CSS.

* Responsive Design: Fully fluid layout adapting seamlessly from desktop monitors to mobile devices.

* Optimistic UI Updates: Instant DOM updates upon CRUD actions followed by background state synchronization.

* Secure Routing: Protected routes that redirect unauthenticated users and manage JWT storage securely in local storage.

---

# 🏗️ Technical Details & Architecture
## System Data Flow
The application utilizes a decoupled client-server architecture:

1. Client Request: The React frontend captures user input, serializes it to JSON, and attaches the active JWT to the Authorization: Bearer header.

2. Security Filter Chain: Spring Security intercepts the incoming HTTP request, validates the JWT signature, and authenticates the context.

3. Controller & Validation: The TaskController receives the request. The @Valid annotation triggers the DTO validation constraints.

4. Persistence: Validated data is passed to the JPA Repository, executed against the PostgreSQL database, and returned to the client as a confirmed state.

---

