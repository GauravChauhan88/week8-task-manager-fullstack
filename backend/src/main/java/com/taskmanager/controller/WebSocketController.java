package com.taskmanager.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // When the frontend sends a message to "/app/task-update"
    // It is broadcast to everyone listening on "/topic/tasks"
    @MessageMapping("/task-update")
    @SendTo("/topic/tasks")
    public String broadcastTaskUpdate(String message) {
        return message; 
    }
}