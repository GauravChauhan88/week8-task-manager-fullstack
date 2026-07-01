import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/');
            return;
        }
        fetchTasks(token);
    }, [navigate]);

    const fetchTasks = async (token: string) => {
        try {
            const response = await axios.get(`${apiUrl}/tasks`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (error: any) {
            if (error.response && error.response.status === 401) handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        const token = localStorage.getItem('accessToken');
        try {
            await axios.post(`${apiUrl}/tasks`, { title: newTaskTitle, description: '', status: 'TODO' }, { headers: { Authorization: `Bearer ${token}` } });
            setNewTaskTitle('');
            if (token) fetchTasks(token); 
        } catch (error) { alert("Failed to create task."); }
    };

    // 🌟 UPDATED: Included title to satisfy backend @Valid constraint
    const toggleStatus = async (task: Task) => {
        const token = localStorage.getItem('accessToken');
        const nextStatus = task.status === 'TODO' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'DONE' : 'TODO';
        try {
            await axios.put(`${apiUrl}/tasks/${task.id}`, { 
                title: task.title, // Required to pass validation
                status: nextStatus 
            }, { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            if (token) fetchTasks(token);
        } catch (error) { console.error("Error updating task:", error); }
    };

    const deleteTask = async (taskId: number) => {
        const token = localStorage.getItem('accessToken');
        try {
            await axios.delete(`${apiUrl}/tasks/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
            if (token) fetchTasks(token);
        } catch (error) { console.error("Error deleting task:", error); }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
            <div style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', display: 'flex', flexDirection: 'column', padding: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '40px', fontWeight: 'bold' }}>Task Manager</h2>
                <div style={{ flexGrow: 1 }}>
                    <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '10px' }}>MAIN MENU</p>
                    <div style={{ padding: '10px', backgroundColor: '#374151', borderRadius: '4px' }}>📋 My Tasks</div>
                </div>
                <button onClick={handleLogout} style={{ padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
            </div>

            <div style={{ flexGrow: 1, padding: '40px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2rem', color: '#111827', margin: 0 }}>My Dashboard</h1>
                    <form onSubmit={handleCreateTask} style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="What needs to be done?" style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Add Task</button>
                    </form>
                </div>

                {isLoading ? <p>Loading...</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {tasks.map(task => (
                            <div key={task.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `5px solid ${task.status === 'DONE' ? '#10b981' : task.status === 'IN_PROGRESS' ? '#f59e0b' : '#3b82f6'}` }}>
                                <h3 style={{ margin: '0 0 10px 0', color: '#1f2937' }}>{task.title}</h3>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                    <button onClick={() => toggleStatus(task)} style={{ fontSize: '0.7rem', padding: '5px', cursor: 'pointer', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px' }}>Status 🔄</button>
                                    <button onClick={() => deleteTask(task.id)} style={{ fontSize: '0.7rem', padding: '5px', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px' }}>Delete 🗑️</button>
                                </div>
                                <span style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold', backgroundColor: task.status === 'DONE' ? '#dcfce7' : task.status === 'IN_PROGRESS' ? '#fef3c7' : '#dbeafe', color: task.status === 'DONE' ? '#166534' : task.status === 'IN_PROGRESS' ? '#b45309' : '#1e40af' }}>
                                    {task.status.replace('_', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};