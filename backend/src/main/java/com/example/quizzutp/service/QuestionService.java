package com.example.quizzutp.service;

import com.example.quizzutp.model.Question;
import com.example.quizzutp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class QuestionService {
    
    private static final Logger log = LoggerFactory.getLogger(QuestionService.class);
    
    @Autowired
    private QuestionRepository questionRepository;
    
    public List<Question> getRandomQuestions(int count) {
        log.info("🔍 Solicitando {} preguntas aleatorias", count);
        
        // Verificar cuántas preguntas hay en total
        long totalQuestions = questionRepository.count();
        log.info("📊 Total de preguntas en la base de datos: {}", totalQuestions);
        
        if (totalQuestions == 0) {
            log.error("❌ No hay preguntas en la base de datos!");
            return List.of();
        }
        
        List<Question> questions = questionRepository.findRandomQuestions(count);
        log.info("✅ Se obtuvieron {} preguntas aleatorias", questions.size());
        
        if (!questions.isEmpty()) {
            questions.forEach(q -> log.debug("   - Pregunta ID: {} - {}", q.getId(), q.getQuestionText()));
        }
        
        return questions;
    }
    
    public Question createQuestion(Question question) {
        log.info("➕ Creando nueva pregunta: {}", question.getQuestionText());
        Question saved = questionRepository.save(question);
        log.info("✅ Pregunta creada con ID: {}", saved.getId());
        return saved;
    }
    
    public List<Question> getAllQuestions() {
        log.info("📋 Obteniendo todas las preguntas");
        List<Question> questions = questionRepository.findAll();
        log.info("✅ Total de preguntas obtenidas: {}", questions.size());
        return questions;
    }
    
    public Question getQuestionById(Long id) {
        log.info("🔎 Buscando pregunta con ID: {}", id);
        return questionRepository.findById(id)
            .orElseThrow(() -> {
                log.error("❌ Pregunta no encontrada con ID: {}", id);
                return new RuntimeException("Pregunta no encontrada");
            });
    }
    
    public Question updateQuestion(Question question) {
        log.info("✏️ Actualizando pregunta con ID: {}", question.getId());
        if (!questionRepository.existsById(question.getId())) {
            log.error("❌ Pregunta no encontrada con ID: {}", question.getId());
            throw new RuntimeException("Pregunta no encontrada");
        }
        Question updated = questionRepository.save(question);
        log.info("✅ Pregunta actualizada con ID: {}", updated.getId());
        return updated;
    }
    
    public void deleteQuestion(Long id) {
        log.info("🗑️ Eliminando pregunta con ID: {}", id);
        if (!questionRepository.existsById(id)) {
            log.error("❌ Pregunta no encontrada con ID: {}", id);
            throw new RuntimeException("Pregunta no encontrada");
        }
        questionRepository.deleteById(id);
        log.info("✅ Pregunta eliminada con ID: {}", id);
    }
    
    public long getTotalQuestions() {
        long total = questionRepository.count();
        log.info("📊 Total de preguntas: {}", total);
        return total;
    }
}