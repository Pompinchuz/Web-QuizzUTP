package com.example.quizzutp.controller;

import com.example.quizzutp.model.QuizResult;
import com.example.quizzutp.service.QuizResultService;
import com.example.quizzutp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://quizz-utp.netlify.app"  // ← Cambia por tu URL real de Netlify
})
public class ReportsController {
    
    @Autowired
    private QuizResultService quizResultService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/save")
    public ResponseEntity<?> saveResult(
            @RequestBody Map<String, Object> resultData,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Long userId = jwtUtil.extractUserId(token);
            
            QuizResult result = quizResultService.saveResult(
                userId,
                (Integer) resultData.get("score"),
                (Integer) resultData.get("totalQuestions"),
                (Integer) resultData.get("correctAnswers"),
                (Integer) resultData.get("incorrectAnswers")
            );
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/my-results")
    public ResponseEntity<?> getMyResults(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Long userId = jwtUtil.extractUserId(token);
            
            List<QuizResult> results = quizResultService.getUserResults(userId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/all-results")
    public ResponseEntity<?> getAllResults(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String role = jwtUtil.extractRole(token);
            
            // Solo administradores pueden ver todos los resultados
            if (!"ADMINISTRADOR".equals(role)) {
                return ResponseEntity.status(403).body(Map.of("message", "No autorizado"));
            }
            
            List<QuizResult> results = quizResultService.getAllResults();
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping("/general-stats")
    public ResponseEntity<?> getGeneralStats(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String role = jwtUtil.extractRole(token);
            
            // Solo administradores pueden ver estadísticas generales
            if (!"ADMINISTRADOR".equals(role)) {
                return ResponseEntity.status(403).body(Map.of("message", "No autorizado"));
            }
            
            Map<String, Object> stats = quizResultService.getGeneralStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}