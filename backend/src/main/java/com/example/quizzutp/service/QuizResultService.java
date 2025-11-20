package com.example.quizzutp.service;

import com.example.quizzutp.model.QuizResult;
import com.example.quizzutp.model.Usuarios;
import com.example.quizzutp.repository.QuizResultRepository;
import com.example.quizzutp.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QuizResultService {
    
    @Autowired
    private QuizResultRepository quizResultRepository;
    
    @Autowired
    private UsuariosRepository usuariosRepository;
    
    public QuizResult saveResult(Long userId, Integer score, Integer totalQuestions, 
                                 Integer correctAnswers, Integer incorrectAnswers) {
        Usuarios usuario = usuariosRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        QuizResult result = new QuizResult();
        result.setUsuario(usuario);
        result.setScore(score);
        result.setTotalQuestions(totalQuestions);
        result.setCorrectAnswers(correctAnswers);
        result.setIncorrectAnswers(incorrectAnswers);
        result.setCompletedAt(LocalDateTime.now());
        
        return quizResultRepository.save(result);
    }
    
    public List<QuizResult> getUserResults(Long userId) {
        Usuarios usuario = usuariosRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return quizResultRepository.findByUsuarioOrderByCompletedAtDesc(usuario);
    }
    
    public List<QuizResult> getAllResults() {
        return quizResultRepository.findAllOrderByCompletedAtDesc();
    }
    
    public Map<String, Object> getGeneralStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("averageScore", quizResultRepository.getAverageScore());
        stats.put("totalAttempts", quizResultRepository.getTotalAttempts());
        stats.put("totalStudents", usuariosRepository.count());
        return stats;
    }
}