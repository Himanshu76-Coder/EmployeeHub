# Employee Management System

A production-ready Full-Stack Employee Management System built with Spring Boot 3.5 and React 19, demonstrating modern enterprise application architecture and best practices.

## 🎯 Overview

This project showcases a clean, scalable full-stack application with proper separation of concerns, robust error handling, and a modern tech stack. Ideal for developers learning enterprise-level Spring Boot and React integration.

## ✨ Key Features

* **Complete CRUD Operations** - Create, Read, Update, Delete with pagination support
* **Layered Architecture** - Controllers, Services, Repositories, DTOs, and Entities
* **Global Exception Handling** - Centralized error management with `@RestControllerAdvice`
* **Standardized API Responses** - Uniform JSON structure with ApiResponse wrapper
* **Input Validation** - Bean validation with custom error messages
* **Interactive API Documentation** - SpringDoc OpenAPI 3.0 (Swagger UI)
* **Security Configuration** - Spring Security with CORS support
* **Pagination & Sorting** - Efficient data retrieval with Spring Data JPA
* **Modern React UI** - Built with Vite, React Router, and Axios
* **Reusable Components** - Modular frontend with Layout, Navbar, and ConfirmModal
* **H2 & MySQL Support** - Flexible database configuration

## 🛠️ Technology Stack

### Backend
* **Java 17**
* **Spring Boot 3.5.13**
  * Spring Web
  * Spring Data JPA
  * Spring Security
  * Spring Validation
* **SpringDoc OpenAPI 2.8.3** (Swagger)
* **MySQL 8+** / H2 Database
* **Lombok** - Boilerplate reduction
* **Maven** - Dependency management

### Frontend
* **React 19.2**
* **Vite 7.3** - Build tool
* **React Router DOM 7.13** - Client-side routing
* **Axios 1.13** - HTTP client
* **Vanilla CSS** - Custom styling with CSS variables

## 📁 Project Structure

### Backend (`employee-management-backend`)
```
employee-management-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── himanshu/
│   │   │           └── ems/
│   │   │               ├── config/
│   │   │               │   ├── CorsConfig.java                  # CORS configuration
│   │   │               │   ├── SecurityConfig.java              # Spring Security setup
│   │   │               │   └── SwaggerConfig.java               # OpenAPI documentation
│   │   │               ├── controller/
│   │   │               │   └── EmployeeController.java          # REST endpoints
│   │   │               ├── dto/
│   │   │               │   ├── ApiResponse.java                 # Response wrapper
│   │   │               │   ├── EmployeeRequestDTO.java          # Input DTO
│   │   │               │   └── EmployeeResponseDTO.java         # Output DTO
│   │   │               ├── entity/
│   │   │               │   └── EmpEntity.java                   # JPA entity
│   │   │               ├── exception/
│   │   │               │   ├── ErrorResponse.java               # Error structure
│   │   │               │   ├── GlobalExceptionHandler.java      # Global exception handler
│   │   │               │   └── ResourceNotFoundException.java   # Custom exception
│   │   │               ├── repository/
│   │   │               │   └── EmpRepository.java               # JPA repository
│   │   │               ├── service/
│   │   │               │   ├── EmpService.java                  # Service interface
│   │   │               │   └── EmpServiceImpl.java              # Implementation
│   │   │               └── EmployeeManagementApplication.java   # Main class
│   │   │
│   │   └── resources/
│   │       └── application.properties    # Configuration
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── himanshu/
│                   └── ems/
│                       ├── service/
│                       │   └── EmployeeServiceTest.java               # Service tests
│                       └── EmployeeManagementApplicationTests.java    # Integration tests
│
├── .gitattributes      # Git attributes configuration
├── .gitignore          # Git ignore rules
├── mvnw                # Maven wrapper (Unix)
├── mvnw.cmd            # Maven wrapper (Windows)
└── pom.xml             # Maven dependencies
```

### Frontend (`employee-management-frontend`)
```
employee-management-frontend/
├── public/                       # Static assets
├── src/
│   ├── api/
│   │   └── employeeService.js    # Axios API service
│   ├── components/
│   │   ├── ConfirmModal.jsx      # Reusable confirmation dialog
│   │   ├── Layout.jsx            # Page layout wrapper
│   │   └── Navbar.jsx            # Navigation component
│   ├── pages/
│   │   ├── AddEmployee.jsx       # Create employee form
│   │   ├── EditEmployee.jsx      # Update employee form
│   │   ├── EmployeeList.jsx      # Paginated employee table
│   │   └── Home.jsx              # Landing page
│   ├── App.jsx                   # Router configuration
│   ├── index.css                 # Global styles
│   └── main.jsx                  # React entry point
│
├── .gitignore                    # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML template
├── package.json                  # NPM dependencies
├── package-lock.json             # Dependency lock file
└── vite.config.js                # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
* **Java 17+** - [Download](https://adoptium.net/)
* **Node.js 18+** - [Download](https://nodejs.org/)
* **MySQL 8+** - [Download](https://dev.mysql.com/downloads/)
* **Maven 3.6+** (or use included wrapper)

### 1️⃣ Database Setup

Create the database schema:
```sql
CREATE DATABASE employee_db;
```

Update credentials in `employee-management-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=your_password
```

> **Note:** Tables are auto-generated via `spring.jpa.hibernate.ddl-auto=update`

### 2️⃣ Backend Setup

```bash
cd employee-management-backend

# Using Maven wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# Or using system Maven
mvn clean install
mvn spring-boot:run
```

**Backend runs on:** `http://localhost:8080`  
**Swagger UI:** `http://localhost:8080/swagger-ui/index.html`

### 3️⃣ Frontend Setup

```bash
cd employee-management-frontend

npm install
npm run dev
```

**Frontend runs on:** `http://localhost:5000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/employees` | Get all employees (paginated) |
| GET | `/api/v1/employees/{id}` | Get employee by ID |
| POST | `/api/v1/employees` | Create new employee |
| PUT | `/api/v1/employees/{id}` | Update employee |
| DELETE | `/api/v1/employees/{id}` | Delete employee |

**Query Parameters for GET all:**
- `page` (default: 0)
- `size` (default: 10)
- `sortBy` (default: employeeId)

**Example Response:**
```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": {
    "content": [...],
    "totalElements": 50,
    "totalPages": 5
  }
}
```

## 🏗️ Architecture Highlights

### Backend Patterns
* **DTO Pattern** - Separation between API contracts and database entities
* **Service Layer** - Business logic isolation
* **Repository Pattern** - Data access abstraction
* **Exception Handling** - Global error handling with custom exceptions
* **API Versioning** - `/api/v1/` prefix for future compatibility

### Frontend Patterns
* **Component-Based Architecture** - Reusable UI components
* **Service Layer** - Centralized API calls
* **Layout Pattern** - Consistent page structure
* **Controlled Components** - Form state management

## 🔧 Configuration

### Switch to H2 Database (Development)
Comment out MySQL and use H2 in `application.properties`:
```properties
# spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
```

### CORS Configuration
CORS is pre-configured for `http://localhost:5173`. Update `CorsConfig.java` for production.

## 📦 Build for Production

### Backend
```bash
./mvnw clean package
java -jar target/ems-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
npm run build
# Output in dist/ folder
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**Himanshu**  
Package: `com.himanshu.ems`

---

**⭐ Star this repo if you find it helpful!**
