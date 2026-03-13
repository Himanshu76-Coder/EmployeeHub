package com.himanshu.ems.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Swagger/OpenAPI configuration for interactive API documentation.
// Accessible at /swagger-ui.html when application is running.
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI employeeManagementOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                    .title("Employee Management System API")
                    .description("Spring Boot Backend API for Employee Management System")
                    .version("v1.0.0")
                    .contact(new Contact().name("Developer").email("dev@example.com")));
    }
}
