package com.example.quizzutp.controller;

import com.example.quizzutp.model.Question;
import com.example.quizzutp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    
    @Autowired
    private QuestionService questionService;
    
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
    
    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            Question question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@RequestBody Question question) {
        try {
            Question newQuestion = questionService.createQuestion(question);
            return ResponseEntity.ok(newQuestion);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Error al crear la pregunta");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        try {
            question.setId(id);
            Question updatedQuestion = questionService.updateQuestion(question);
            return ResponseEntity.ok(updatedQuestion);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Pregunta eliminada exitosamente");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalQuestions", questionService.getTotalQuestions());
        return ResponseEntity.ok(stats);
    }
}