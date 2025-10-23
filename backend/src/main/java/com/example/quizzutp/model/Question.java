package com.example.quizzutp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 500)
    private String questionText;
    
    @Column(nullable = false)
    private String option1;
    
    @Column(nullable = false)
    private String option2;
    
    @Column(nullable = false)
    private String option3;
    
    @Column(nullable = false)
    private String option4;
    
    @Column(nullable = false)
    private Integer correctAnswer; // 1, 2, 3, o 4
    
    private String difficulty; // "facil", "medio", "dificil"
}