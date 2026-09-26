# EmployeeHub

A modern, full-stack employee management system to streamline HR processes and team data tracking.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.13-brightgreen)
![Maven](https://img.shields.io/badge/Maven-Build-blue)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)

---

## 1. Overview

EmployeeHub is a full-stack web application designed to manage employee records efficiently. It serves as a centralized hub for organizations to onboard, track, and maintain employee information. The backend, powered by Spring Boot, handles business logic, data persistence, and API endpoints, while the React frontend provides a responsive, dynamic user interface. This solution resolves the problem of fragmented employee data by providing a clean, unified dashboard for HR operations.

---

## 2. Features

### Employee Management
* **Create Employees**: Add new team members with their details (name, email, department, designation, salary).
* **Read Employees**: View a complete list of employees or individual employee details.
* **Update Employees**: Edit existing employee records to keep information current.
* **Delete Employees**: Remove employees with a secure confirmation modal.

### Search and Filtering
* **Keyword Search**: Debounced search functionality to find employees by name or email.
* **Salary Filtering**: Filter employees by predefined salary bands.
* **Pagination**: Server-side pagination for efficient data loading and display.

### Frontend / UI Features
* **Responsive Design**: Modern UI with a dedicated mobile-optimized view for lists and forms.
* **Loading & Empty States**: Graceful feedback during data fetching and when no records exist.
* **Interactive Navigation**: Fixed navigation bar for easy access to application features.

### Backend / API Features
* **Standardized API Responses**: Consistent JSON response wrapping (success, message, data).
* **Input Validation**: Strict request validation using Jakarta Validation.
* **Global Exception Handling**: Centralized error management to prevent stack trace leaks.
* **Interactive API Docs**: Swagger UI integration for API exploration.

---

## 3. Tech Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | Java / JavaScript | 17 / ES6+ | Core application languages |
| **Backend Framework** | Spring Boot | 3.5.13 | REST API and business logic |
| **Frontend Framework** | React | 19.2.0 | User interface |
| **Build Tool** | Maven / Vite | 3+ / 7.3.1 | Dependency management and bundling |
| **Database** | MySQL | 8.x | Relational data storage |
| **ORM** | Spring Data JPA | - | Database interaction and mapping |
| **API** | REST / OpenAPI | - | Client-server communication |
| **Styling** | Vanilla CSS | - | Application design and responsive layouts |
| **HTTP Client** | Axios | 1.13.6 | Promise-based HTTP requests |
| **Development Tools**| Lombok / Swagger | - | Boilerplate reduction and API documentation |

---

## 4. Complete Project Structure

### Backend (`employeehub-backend`)

```text
employeehub-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── employeehub/
│   │   │           ├── config/
│   │   │           │   ├── CorsConfig.java               # CORS configuration
│   │   │           │   ├── SecurityConfig.java           # Spring Security setup
│   │   │           │   └── SwaggerConfig.java            # OpenAPI documentation
│   │   │           ├── controller/
│   │   │           │   └── EmployeeController.java       # REST endpoints
│   │   │           ├── dto/
│   │   │           │   ├── ApiResponse.java              # Response wrapper
│   │   │           │   ├── EmployeeRequestDTO.java       # Input DTO
│   │   │           │   └── EmployeeResponseDTO.java      # Output DTO
│   │   │           ├── entity/
│   │   │           │   └── EmpEntity.java                # JPA entity
│   │   │           ├── exception/
│   │   │           │   ├── GlobalExceptionHandler.java   # Global exception handler
│   │   │           │   └── ResourceNotFoundException.java # Custom exception
│   │   │           ├── repository/
│   │   │           │   └── EmpRepository.java            # JPA repository
│   │   │           ├── service/
│   │   │           │   ├── EmpService.java               # Service interface
│   │   │           │   └── EmpServiceImpl.java           # Implementation
│   │   │           └── EmployeeHubApplication.java       # Main class
│   │   └── resources/
│   │       ├── application.properties                    # Configuration
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
│       └── java/
│           └── com/
│               └── employeehub/
│                   ├── service/
│                   │   └── EmployeeServiceTest.java      # Service tests
│                   └── EmployeeHubApplicationTests.java  # Integration tests
├── .env.example                                          # Environment variables template
├── .env                                                  # Local environment variables
├── .gitattributes                                        # Git attributes configuration
├── .gitignore                                            # Git ignore rules
├── mvnw                                                  # Maven wrapper (Unix)
├── mvnw.cmd                                              # Maven wrapper (Windows)
└── pom.xml                                               # Maven dependencies
```

### Frontend (`employeehub-frontend`)

```text
employeehub-frontend/
├── public/                                               # Static assets
├── src/
│   ├── api/
│   │   └── employeeService.js                            # Axios API service
│   ├── assets/
│   │   ├── fonts/                                        # Local font files
│   │   └── images/                                       # Image assets
│   ├── components/
│   │   ├── ConfirmModal.jsx                              # Reusable confirmation dialog
│   │   ├── Layout.jsx                                    # Page layout wrapper
│   │   └── Navbar.jsx                                    # Navigation component
│   ├── pages/
│   │   ├── AddEmployee.jsx                               # Create employee form
│   │   ├── EditEmployee.jsx                              # Update employee form
│   │   ├── EmployeeList.jsx                              # Paginated employee table
│   │   └── Home.jsx                                      # Landing page
│   ├── App.jsx                                           # Router configuration
│   ├── index.css                                         # Global styles
│   └── main.jsx                                          # React entry point
├── .gitignore                                            # Git ignore rules
├── eslint.config.js                                      # ESLint configuration
├── index.html                                            # HTML template
├── package.json                                          # NPM dependencies
├── package-lock.json                                     # Dependency lock file
└── vite.config.js                                        # Vite configuration
```

---

## 5. Architecture

EmployeeHub follows a standard multi-tier architecture. The React frontend communicates with the Spring Boot backend via RESTful HTTP calls using Axios. The backend processes these requests through a structured layer system before interacting with the MySQL database.

**Data Flow:**
```text
Frontend (React + Axios)
          ↓ (HTTP REST)
REST Controller (EmployeeController)
          ↓ (DTOs)
Service Layer (EmpServiceImpl)
          ↓ (Entities)
Repository (EmpRepository via Spring Data JPA)
          ↓ (SQL)
MySQL Database
```

**Entity Relationship Diagram:**
```text
Employee (EmpEntity)
────────────────────
employeeId (Primary Key, Auto-increment)
firstName (String)
lastName (String)
email (String, Unique)
phoneNumber (String)
salary (Double)
department (String)
designation (String)
createdAt (Timestamp)
updatedAt (Timestamp)
```

---

## 6. Getting Started / Local Setup

### Prerequisites
* Java 17
* Node.js (v18+) and npm
* Maven (or use the provided Maven Wrapper)
* MySQL Server
* Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/EmployeeHub.git
   cd EmployeeHub
   ```

2. **Database Setup:**
   Create a MySQL database for the application.
   ```sql
   CREATE DATABASE employeehub_db;
   ```

3. **Backend Configuration:**
   Navigate to the backend directory, copy the environment template, and update it with your MySQL credentials.
   ```bash
   cd employeehub-backend
   cp .env.example .env
   ```
   *Edit the `.env` file to include your actual database URL, username, and password.*

4. **Start the Backend:**
   From the `employeehub-backend` directory, run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will start on port 8080 by default.*

5. **Frontend Configuration & Start:**
   Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd employeehub-frontend
   npm install
   npm run dev
   ```
   *The frontend will start on port 5000 by default.*

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:5000`.
   Swagger API documentation is available at `http://localhost:8080/swagger-ui/index.html`.

---

## 7. Environment Variables

### Backend (`employeehub-backend/.env`)

| Variable | Used By | Purpose | Required |
| :--- | :--- | :--- | :--- |
| `SPRING_PROFILES_ACTIVE` | Spring Boot | Defines active profile (e.g., `dev`, `prod`) | No (defaults to `dev`) |
| `SERVER_PORT` | Spring Boot | Port for the backend server | No (defaults to `8080`) |
| `DB_URL` | Application/JPA | JDBC URL for the MySQL database | Yes |
| `DB_USERNAME` | Application/JPA | Database username | No (defaults to `root`) |
| `DB_PASSWORD` | Application/JPA | Database password | No (defaults to `root`) |

### Frontend (`employeehub-frontend/.env` - optional)

| Variable | Used By | Purpose | Required |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Axios/Services | Overrides default backend API URL | No (defaults to localhost:8080) |

---

## 8. API Documentation

All API responses are wrapped in a standard `ApiResponse` object containing `success`, `message`, and `data` fields.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/employees` | Get paginated list of al  employees. |
| `GET` | `/api/v1/employees/{id}` | Retrieve a single employee by their ID. |
| `POST` | `/api/v1/employees` | Create a new employee record. |
| `PUT` | `/api/v1/employees/{id}` | Update an existing employee record. |
| `DELETE` | `/api/v1/employees/{id}` | None | Delete an employee by their ID. |

---

## 9. Sample Requests

**1. Create an Employee (Success)**

Request:

```http
POST /api/v1/employees HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": 85000,
  "phoneNumber": "555-0198"
}
```

Response: `201 Created`

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "employeeId": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "department": "Engineering",
    "designation": "Software Engineer",
    "salary": 85000.0,
    "phoneNumber": "555-0198",
    "createdAt": "2026-09-03T10:00:00.123456",
    "updatedAt": "2026-09-03T10:00:00.123456"
  }
}
```

**2. Create an Employee (Validation Error)**

Request:

```http
POST /api/v1/employees HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "firstName": "",
  "lastName": "Doe",
  "email": "invalid-email",
  "department": "Engineering",
  "designation": "Software Engineer",
  "salary": -500,
  "phoneNumber": "555-0198"
}
```

Response: `400 Bad Request`

```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "firstName": "First name is required",
    "email": "Invalid email format",
    "salary": "Salary must be positive"
  }
}
```

**3. Get a Paginated List of Employees**

Request:

```http
GET /api/v1/employees?page=0&size=10&keyword=Jane HTTP/1.1
Host: localhost:8080
Accept: application/json
```

Response: `200 OK`

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": {
    "content": [
      {
        "employeeId": 1,
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@example.com",
        "department": "Engineering",
        "designation": "Software Engineer",
        "salary": 85000.0,
        "phoneNumber": "555-0198",
        "createdAt": "2026-09-03T10:00:00.123456",
        "updatedAt": "2026-09-03T10:00:00.123456"
      }
    ],
    "pageable": {
      "pageNumber": 0,
      "pageSize": 10
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  }
}
```

---

## 10. Security

* **Spring Security:** Included and configured, but all requests are explicitly permitted (`permitAll()`) as this is intended to be a portfolio/demonstration project.
* **Authentication/Authorization:** Not currently implemented.
* **CSRF:** Disabled for REST APIs to allow cross-origin requests.
* **CORS:** Enabled globally in `CorsConfig` allowing requests from the Vite dev server (`http://localhost:5000`).
* **Validation:** Implemented via Jakarta Validation (`@Valid`) on inbound DTOs to ensure data integrity and prevent malformed requests.
* **Error Handling:** The `GlobalExceptionHandler` intercepts errors and translates them into uniform, safe JSON responses without exposing server stack traces.

---

## 11. Roadmap / Future Improvements

* Implement JWT-based authentication and user roles (Admin vs. Standard User).
* Add a dashboard with visual analytics and charts.
* Introduce bulk import and export capabilities (CSV/Excel).
* Expand unit and integration test coverage to the frontend codebase.

---

## 12. Author

**Name:** *Himanshu Kumavat*  
**GitHub:** [@Himanshu76-Coder](https://github.com/Himanshu76-Coder)  
**LinkedIn:** [linkedin.com/in/himanshu-kumavat](https://www.linkedin.com/in/himanshu-kumavat)

