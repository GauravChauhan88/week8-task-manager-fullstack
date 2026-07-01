package com.taskmanager.model.dto;

public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String name;
    private String email;

    // Default No-Args Constructor
    public AuthResponse() {}

    // Explicit All-Args Constructor to satisfy the AuthController invocation
    public AuthResponse(String accessToken, String refreshToken, String name, String email) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.name = name;
        this.email = email;
    }

    // Explicit Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}