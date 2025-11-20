package com.example.quizzutp.repository;

import com.example.quizzutp.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query(value = "SELECT * FROM questions ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Question> findRandomQuestions(int limit);
}