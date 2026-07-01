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

## Component Architecture 
## 📂 Project Structure
```text
/week8-task-manager-fullstack
├── docker-compose.yml                          # Orchestrates Postgres, Backend, and Frontend containers
├── .gitignore                                  # Excludes node_modules, target/, and .env files
├── README.md                                   # Comprehensive project documentation
│
├── backend/                                    # Spring Boot / Java 17 Application
│   ├── pom.xml                                 # Maven dependencies and build configuration
│   ├── Dockerfile                              # Backend containerization instructions
│   └── src/main/
│       ├── resources/
│       │   └── application.properties          # Database config, JPA settings, and JWT secrets
│       └── java/com/taskmanager/
│           ├── TaskManagerApplication.java     # Spring Boot application entry point
│           ├── config/
│           │   ├── SecurityConfig.java         # Spring Security filter chains and CORS setup
│           │   └── WebSocketConfig.java        # STOMP message broker configuration
│           ├── controller/
│           │   ├── AuthController.java         # Registration and Login endpoints
│           │   └── TaskController.java         # CRUD endpoints for tasks
│           ├── model/
│           │   ├── Task.java                   # Task JPA Entity
│           │   ├── TaskRequest.java            # Validated DTO for incoming requests
│           │   └── User.java                   # User JPA Entity for authentication
│           ├── repository/
│           │   ├── TaskRepository.java         # Database operations for tasks
│           │   └── UserRepository.java         # Database operations for users
│           └── security/
│               ├── JwtFilter.java              # Intercepts requests to validate JWTs
│               └── JwtUtil.java                # Token generation and extraction logic
│
└── frontend/                                   # React / TypeScript / Vite Application
    ├── package.json                            # NPM dependencies and scripts
    ├── Dockerfile                              # Frontend containerization instructions
    ├── tsconfig.json                           # TypeScript compiler rules
    ├── vite.config.ts                          # Vite bundler configuration
    ├── index.html                              # Root HTML template
    └── src/
        ├── main.tsx                            # React application root render
        ├── App.tsx                             # Main router and layout wrapper
        ├── api/
        │   └── axiosConfig.ts                  # Centralized Axios interceptors for JWT injection
        └── components/
            ├── Dashboard.tsx                   # Main protected view with task grid and forms
            └── Login.tsx                       # Authentication form for login and registration
```

---

# 💻 Quick Start & Setup Instructions
## Prerequisites
* Docker & Docker Compose installed.

* Ports 3000, 8080, and 5432 must be available on your host machine.

## Automated Setup (Docker)
1. Clone the repository and navigate to the root directory.

2. Execute the build command:

```Bash
docker-compose up -d --build
```
3. Monitor logs to ensure successful startup:

```Bash
docker logs taskmanager-backend -f
```
## Application Access Points
* Web Interface: http://localhost:3000

* Backend API Root: http://localhost:8080/api

Swagger API Docs: http://localhost:8080/swagger-ui.html

---

# 📚 Comprehensive API Documentation
All endpoints (except /api/auth/) require a valid JWT passed in the Authorization header.

## Authentication Endpoints
* POST /api/auth/register - Registers a new user.

* POST /api/auth/login - Authenticates user and returns JWT.

  * Payload: { "username": "user", "password": "password" }

  * Response: { "token": "eyJhbGciOiJIUzI1NiIsIn..." }

## Task Management Endpoints
* GET /api/tasks - Retrieves all tasks associated with the authenticated user.

* POST /api/tasks - Creates a new task.

  * Payload: { "title": "Buy groceries", "status": "TODO" }

* PUT /api/tasks/{id} - Updates an existing task.

  *Payload: { "title": "Buy groceries", "status": "DONE" }

* DELETE /api/tasks/{id} - Permanently removes a task.

---

# 🧪 Testing Evidence & Strategy

### Quality assurance was prioritized throughout the development lifecycle:

##  Backend Unit Testing: 
JUnit 5 and Mockito were utilized to mock repository layers and test service-level business logic in isolation.

## Validation Testing: 
Boundary testing on DTOs to ensure @NotBlank and @Size constraints correctly trigger 400 Bad Request responses.

## Security Testing: 
Verified that requests lacking valid JWTs are reliably intercepted and return 401 Unauthorized.

## Frontend Integration: 
Manual end-to-end testing of the component lifecycle, ensuring API responses accurately map to React state changes and trigger correct renders.

---

# 📸 Visual Documentation

## 1. Main Dashboard & Task Management
<img width="1918" height="1145" alt="image" src="https://github.com/user-attachments/assets/3433b372-29e8-499d-bc16-63d2fa30ff18" />

Displays the responsive grid layout, status indicators, and task creation interface.

## 2. Secure Authentication
<img width="1918" height="1151" alt="image" src="https://github.com/user-attachments/assets/3bc750f8-4084-4206-9e43-c5f710797240" />

Demonstrates the secure login portal required to access the application.

## 3. Interactive API Documentation
<img width="1918" height="1155" alt="image" src="https://github.com/user-attachments/assets/cc9c1b21-54a2-4a03-8763-d097f00f1fbc" />

Shows the auto-generated Swagger interface used for testing backend endpoints.

---

# 📋 Comprehensive API Documentation

All endpoints (except `/api/auth/**`) are secured and require a valid JWT passed in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

## 🔐 Authentication Endpoints

### 1. Register a New User
* **Method:** `POST`
* **Endpoint:** `/api/auth/register`
* **Description:** Creates a new user account.
* **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

* Success Response (201 Created):

```JSON
{
  "message": "User registered successfully."
}
```

### 2. User Login
* **Method:** POST

* **Endpoint:** /api/auth/login

* **Description:** Authenticates a user and returns a JWT.

* **Request Body:**

```JSON
{
  "username": "johndoe",
  "password": "securePassword123"
}
```
* **Success Response (200 OK):**

```JSON
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsIn...",
  "refreshToken": "dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4..."
}
```

## 📋 Task Management Endpoints
### 1. Retrieve All Tasks
* **Method:** GET

* **Endpoint:** /api/tasks

* **Description:** Fetches all tasks associated with the authenticated user.

* **Success Response (200 OK):**

```JSON
[
  {
    "id": 1,
    "title": "Set up Docker",
    "description": "Configure docker-compose for the backend.",
    "status": "DONE",
    "createdAt": "2026-07-01T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Write API Docs",
    "description": "Document all endpoints.",
    "status": "IN_PROGRESS",
    "createdAt": "2026-07-02T11:30:00Z"
  }
]
```
### 2. Create a New Task
* **Method:** POST

* **Endpoint:** /api/tasks

* **Description:** Creates a new task.

* **Request Body:**

```JSON
{
  "title": "Review Pull Request",
  "description": "Review the latest changes in the UI component.",
  "status": "TODO"
}
```
* **Success Response (201 Created):**

```JSON
{
  "id": 3,
  "title": "Review Pull Request",
  "description": "Review the latest changes in the UI component.",
  "status": "TODO",
  "createdAt": "2026-07-02T12:00:00Z"
}
```
### 3. Update an Existing Task
* **Method:** PUT

* **Endpoint:** /api/tasks/{id}

* **Description:** Fully updates an existing task's details.

* **Request Body:**

```JSON
{
  "title": "Review Pull Request (Urgent)",
  "description": "Review the latest changes immediately.",
  "status": "IN_PROGRESS"
}
```
* **Success Response (200 OK):** (Returns the updated task object)

### 4. Update Task Status Only
* **Method:** PUT

* **Endpoint:** /api/tasks/{id}/status

* **Description:** Updates just the status of a specific task (used for the quick-toggle button).

* **Request Body:**

```JSON
{
  "status": "DONE"
}
```
* **Success Response (200 OK):** (Returns the updated task object)

### 5. Delete a Task
* **Method:** DELETE

* **Endpoint:** /api/tasks/{id}

* **Description:** Permanently removes a task from the database.

* **Success Response (204 No Content):** (No body returned upon successful deletion)
