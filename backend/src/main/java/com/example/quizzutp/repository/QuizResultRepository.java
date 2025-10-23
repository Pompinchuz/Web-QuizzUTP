package com.example.quizzutp.repository;

import com.example.quizzutp.model.QuizResult;
import com.example.quizzutp.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUsuarioOrderByCompletedAtDesc(Usuarios usuario);
    
    @Query("SELECT AVG(qr.score) FROM QuizResult qr")
    Double getAverageScore();
    
    @Query("SELECT COUNT(qr) FROM QuizResult qr")
    Long getTotalAttempts();
    
    @Query("SELECT qr FROM QuizResult qr ORDER BY qr.completedAt DESC")
    List<QuizResult> findAllOrderByCompletedAtDesc();
}