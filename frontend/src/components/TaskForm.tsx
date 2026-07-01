import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface TaskFormProps {
    onTaskCreated: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        if (!token) {
            setError("Authentication session missing. Please log in again.");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/tasks', 
                { title, description, dueDate, priority }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            setSuccess(true);
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('MEDIUM');
            
            onTaskCreated();
        } catch (err: any) {
            console.error("Task submission crash:", err);
            setError(err.response?.data?.message || "Failed to submit task. Is backend live?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', maxWidth: '500px', marginBottom: '20px' }}>
            <h4 style={{ margin: '0 0 15px 0' }}>➕ Create New Task</h4>
            
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 Task saved successfully!</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows={3}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Due Date</label>
                        <input 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Priority</label>
                        <select 
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value)}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', height: '38px' }}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    {loading ? 'Saving...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;