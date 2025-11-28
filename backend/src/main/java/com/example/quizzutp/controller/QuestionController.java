package com.example.quizzutp.controller;

import com.example.quizzutp.model.Question;
import com.example.quizzutp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://quizz-utp.netlify.app"
})
public class QuestionController {
    
    private static final Logger log = LoggerFactory.getLogger(QuestionController.class);
    
    @Autowired
    private QuestionService questionService;
    
    @GetMapping("/random/{count}")
    public ResponseEntity<List<Question>> getRandomQuestions(@PathVariable int count) {
        log.info("🌐 GET /api/questions/random/{} - Iniciando petición", count);
        
        List<Question> questions = questionService.getRandomQuestions(count);
        
        log.info("📤 Retornando {} preguntas al cliente", questions.size());
        
        return ResponseEntity.ok(questions);
    }
    
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        log.info("🌐 POST /api/questions - Creando nueva pregunta");
        return ResponseEntity.ok(questionService.createQuestion(question));
    }
    
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        log.info("🌐 GET /api/questions - Obteniendo todas las preguntas");
        List<Question> questions = questionService.getAllQuestions();
        log.info("📤 Retornando {} preguntas totales", questions.size());
        return ResponseEntity.ok(questions);
    }
}