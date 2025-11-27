package com.example.quizzutp.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() throws URISyntaxException {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Render provee: postgresql://user:password@host:port/database
            // Spring Boot necesita: jdbc:postgresql://host:port/database
            
            URI dbUri = new URI(databaseUrl);
            
            String username = dbUri.getUserInfo().split(":")[0];
            String password = dbUri.getUserInfo().split(":")[1];
            String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();

            System.out.println("✅ Conectando a: " + dbUrl);
            System.out.println("✅ Usuario: " + username);

            return DataSourceBuilder
                    .create()
                    .url(dbUrl)
                    .username(username)
                    .password(password)
                    .build();
        }
        
        throw new RuntimeException("DATABASE_URL no encontrada en variables de entorno");
    }
}