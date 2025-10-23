package com.example.quizzutp.service;

import com.example.quizzutp.model.Usuarios;
import com.example.quizzutp.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuariosService {
    
    @Autowired
    private UsuariosRepository usuariosRepository;
    
    public Usuarios register(Usuarios usuario) {
        if (usuariosRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El username ya existe");
        }
        if (usuariosRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Si no se especifica rol, asignar ESTUDIANTE por defecto
        if (usuario.getRole() == null) {
            usuario.setRole(Usuarios.Role.ESTUDIANTE);
        }
        
        return usuariosRepository.save(usuario);
    }
    
    public Usuarios login(String username, String password) {
        Optional<Usuarios> usuario = usuariosRepository.findByUsername(username);
        if (usuario.isPresent() && usuario.get().getPassword().equals(password)) {
            return usuario.get();
        }
        throw new RuntimeException("Credenciales inválidas");
    }
    
    public Usuarios findByUsername(String username) {
        return usuariosRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
    
    public Usuarios updateScore(Long userId, Integer score) {
        Usuarios usuario = usuariosRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (score > usuario.getBestScore()) {
            usuario.setBestScore(score);
            return usuariosRepository.save(usuario);
        }
        return usuario;
    }
}