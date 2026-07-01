package com.taskmanager.repository;

import com.taskmanager.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // 🌟 Custom query: Find all tasks that belong to a specific user ID
    List<Task> findByUserId(Long userId);
}