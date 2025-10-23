package com.example.quizzutp.controller;

import com.example.quizzutp.model.Question;
import com.example.quizzutp.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;
    
    @GetMapping("/random/{count}")
    public ResponseEntity<List<Question>> getRandomQuestions(@PathVariable int count) {
        return ResponseEntity.ok(questionService.getRandomQuestions(count));
    }
    
    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(questionService.createQuestion(question));
    }
    
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
}