package com.taskmanager.controller;

import com.taskmanager.model.dto.TaskRequest;
import com.taskmanager.model.entity.Task;
import com.taskmanager.model.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import jakarta.validation.Valid; // 🌟 IMPORTANT IMPORT
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); 
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 🌟 1. GET ALL TASKS
    @GetMapping
    public ResponseEntity<List<Task>> getUserTasks() {
        User currentUser = getAuthenticatedUser();
        List<Task> tasks = taskRepository.findByUserId(currentUser.getId());
        return ResponseEntity.ok(tasks);
    }

    // 🌟 2. CREATE A NEW TASK (Added @Valid)
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest request) {
        User currentUser = getAuthenticatedUser();

        Task newTask = new Task();
        newTask.setTitle(request.getTitle());
        newTask.setDescription(request.getDescription() != null ? request.getDescription() : "");
        newTask.setStatus(request.getStatus() != null ? request.getStatus() : "TODO");
        
        newTask.setUser(currentUser);

        Task savedTask = taskRepository.save(newTask);
        return ResponseEntity.ok(savedTask);
    }

    // 🌟 3. UPDATE TASK STATUS (Added @Valid)
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request) {
        User currentUser = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        task.setStatus(request.getStatus());
        return ResponseEntity.ok(taskRepository.save(task));
    }

    // 🌟 4. DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        User currentUser = getAuthenticatedUser();
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).build();
        }

        taskRepository.delete(task);
        return ResponseEntity.noContent().build();
    }
}