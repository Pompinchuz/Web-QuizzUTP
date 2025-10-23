package com.example.quizzutp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String email;
    
    private Integer bestScore = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ESTUDIANTE;
    
    public enum Role {
        ESTUDIANTE,
        ADMINISTRADOR
    }
}