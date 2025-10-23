package com.example.quizzutp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Usuarios usuario;
    
    @Column(nullable = false)
    private Integer score;
    
    @Column(nullable = false)
    private Integer totalQuestions;
    
    @Column(nullable = false)
    private LocalDateTime completedAt;
    
    @Column(nullable = false)
    private Integer correctAnswers;
    
    @Column(nullable = false)
    private Integer incorrectAnswers;
}