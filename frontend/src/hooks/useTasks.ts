import { useState, useCallback } from 'react';
import { Task, CreateTaskRequest } from '../types/task';
import { apiService } from '../services/api';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async (params?: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiService.getTasks(params);
            setTasks(response.content || []);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = useCallback(async (taskData: CreateTaskRequest) => {
        setLoading(true);
        try {
            const newTask = await apiService.createTask(taskData);
            setTasks(prev => [...prev, newTask]);
            return newTask;
        } catch (err: any) {
            setError(err.message || 'Failed to create task');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTaskStatus = useCallback(async (id: number, status: string) => {
        try {
            const updatedTask = await apiService.updateTaskStatus(id, status);
            setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
            return updatedTask;
        } catch (err: any) {
            setError(err.message || 'Failed to update task status');
            throw err;
        }
    }, []);

    const deleteTask = useCallback(async (id: number) => {
        try {
            await apiService.deleteTask(id);
            setTasks(prev => prev.filter(task => task.id !== id));
        } catch (err: any) {
            setError(err.message || 'Failed to delete task');
            throw err;
        }
    }, []);

    return { tasks, loading, error, fetchTasks, createTask, updateTaskStatus, deleteTask, setTasks };
};