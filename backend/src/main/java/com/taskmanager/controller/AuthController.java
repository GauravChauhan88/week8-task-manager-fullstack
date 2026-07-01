package com.taskmanager.controller;

import com.taskmanager.model.dto.AuthResponse;
import com.taskmanager.model.dto.LoginRequest;
import com.taskmanager.model.dto.RegisterRequest;
import com.taskmanager.model.entity.User;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") 
public class AuthController { 

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // 🌟 ADDED to hash passwords

    // 🌟 UPDATED CONSTRUCTOR to include PasswordEncoder
    public AuthController(AuthenticationManager authenticationManager, 
                          JwtTokenProvider tokenProvider, 
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🌟 ADDED: The Missing Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        System.out.println(">>> REGISTER ATTEMPT: Email = " + registerRequest.getEmail());
        
        try {
            // 1. Check if the user already exists
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Error: Email is already in use!");
            }

            // 2. Create the new User entity
            User user = new User();
            user.setName(registerRequest.getName());
            user.setEmail(registerRequest.getEmail());
            
            // 3. Hash the password before saving to PostgreSQL
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

            // 4. Save to database
            userRepository.save(user);

            System.out.println(">>> REGISTER SUCCESS");
            return ResponseEntity.ok("User registered successfully!");
            
        } catch (Exception e) {
            System.out.println(">>> REGISTER FAILED: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Registration Failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println(">>> LOGIN ATTEMPT: Email = " + loginRequest.getEmail());
        
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User profile error"));

            String jwt = tokenProvider.generateToken(user.getEmail());
            String refresh = tokenProvider.generateToken(user.getEmail());

            System.out.println(">>> LOGIN SUCCESS");
            return ResponseEntity.ok(new AuthResponse(jwt, refresh, user.getName(), user.getEmail()));
            
        } catch (Exception e) {
            System.out.println(">>> LOGIN FAILED: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            return ResponseEntity.status(401).body("Authentication Failed: " + e.getMessage());
        }
    }
}