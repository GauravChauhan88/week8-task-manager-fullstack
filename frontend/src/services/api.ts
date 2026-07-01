import axios from 'axios';

// Create a configured Axios instance pointing to your Spring Boot container backend
const api = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Sends a POST request to the authentication controller.
 * Maps keys to match the 'LoginRequest' DTO layout inside Spring Boot exactly.
 * * @param email - User's account email string
 * @param password - User's plain text password string
 */
export const login = async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password }); 
    return response.data;
};

// Add this to your existing frontend/src/services/api.ts

/**
 * Sends a POST request to save a new task.
 * @param taskData - Object containing title, description, dueDate, and priority
 * @param token - The current user's authenticated JWT token string
 */
export const createTask = async (
    taskData: { title: string; description: string; dueDate: string; priority: string },
    token: string
) => {
    const response = await axios.post('http://localhost:8080/api/tasks', taskData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

// Update your default export at the bottom to include it
export default { login: (await import('./api')).login, createTask };
