package com.example.quizzutp.repository;

import com.example.quizzutp.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
    Optional<Usuarios> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Long countByRole(Usuarios.Role role);


}