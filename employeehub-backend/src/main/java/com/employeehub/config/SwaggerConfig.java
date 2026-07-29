package com.employeehub.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Sets up Swagger UI for interactive API documentation.
// Accessible at /swagger-ui/index.html when the application is running.
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI employeeHubOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                    .title("EmployeeHub API")
                    .description("Spring Boot Backend API for EmployeeHub")
                    .version("v1.0.0"));
    }
}
