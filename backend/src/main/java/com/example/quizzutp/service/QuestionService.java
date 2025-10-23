package com.example.quizzutp.service;

import com.example.quizzutp.model.Question;
import com.example.quizzutp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;
    
    public List<Question> getRandomQuestions(int count) {
        return questionRepository.findRandomQuestions(count);
    }
    
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));
    }
    
    public Question updateQuestion(Question question) {
        if (!questionRepository.existsById(question.getId())) {
            throw new RuntimeException("Pregunta no encontrada");
        }
        return questionRepository.save(question);
    }
    
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Pregunta no encontrada");
        }
        questionRepository.deleteById(id);
    }
    
    public long getTotalQuestions() {
        return questionRepository.count();
    }
}