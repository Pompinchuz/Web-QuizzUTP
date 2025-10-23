package com.example.quizzutp.controller;

import com.example.quizzutp.model.Usuarios;
import com.example.quizzutp.service.UsuariosService;
import com.example.quizzutp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    
    @Autowired
    private UsuariosService usuariosService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuarios usuario) {
        try {
            // Por defecto, todos los nuevos usuarios son estudiantes
            if (usuario.getRole() == null) {
                usuario.setRole(Usuarios.Role.ESTUDIANTE);
            }
            
            Usuarios newUsuario = usuariosService.register(usuario);
            String token = jwtUtil.generateToken(
                newUsuario.getId(), 
                newUsuario.getUsername(), 
                newUsuario.getRole().name()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("user", createUserResponse(newUsuario));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            Usuarios usuario = usuariosService.login(
                credentials.get("username"),
                credentials.get("password")
            );
            
            String token = jwtUtil.generateToken(
                usuario.getId(), 
                usuario.getUsername(), 
                usuario.getRole().name()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("user", createUserResponse(usuario));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);
            
            if (jwtUtil.isTokenExpired(token)) {
                return ResponseEntity.status(401).body(Map.of("valid", false, "message", "Token expirado"));
            }
            
            Usuarios usuario = usuariosService.findByUsername(username);
            
            Map<String, Object> response = new HashMap<>();
            response.put("valid", true);
            response.put("user", createUserResponse(usuario));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("valid", false, "message", "Token inválido"));
        }
    }
    
    @PutMapping("/score/{userId}")
    public ResponseEntity<?> updateScore(
            @PathVariable Long userId, 
            @RequestBody Map<String, Integer> scoreData,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            Long tokenUserId = jwtUtil.extractUserId(token);
            
            // Solo el usuario puede actualizar su propio score
            if (!tokenUserId.equals(userId)) {
                return ResponseEntity.status(403).body(Map.of("message", "No autorizado"));
            }
            
            Usuarios usuario = usuariosService.updateScore(userId, scoreData.get("score"));
            return ResponseEntity.ok(createUserResponse(usuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    private Map<String, Object> createUserResponse(Usuarios usuario) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", usuario.getId());
        userMap.put("username", usuario.getUsername());
        userMap.put("email", usuario.getEmail());
        userMap.put("bestScore", usuario.getBestScore());
        userMap.put("role", usuario.getRole().name());
        return userMap;
    }
}