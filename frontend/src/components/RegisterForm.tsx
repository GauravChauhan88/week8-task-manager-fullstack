import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' }); 
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
            
            // Adjust this URL if your Spring Boot endpoint is /signup instead of /register
            await axios.post(`${apiUrl}/auth/register`, {
                name,
                email,
                password
            });

            setMessage({ text: "✅ Account created! Redirecting to login...", type: 'success' });
            
            // Send them back to the login screen after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err: any) {
            console.error("❌ Registration Failed:", err);
            setMessage({ 
                text: err.response?.data?.message || "Registration failed. Email might already exist.", 
                type: 'error' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', color: '#1f2937', marginBottom: '20px' }}>Create an Account</h2>
                
                {message.text && (
                    <div style={{ 
                        backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2', 
                        color: message.type === 'success' ? '#166534' : '#b91c1c', 
                        padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' 
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#4b5563', fontSize: '14px' }}>Full Name</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
                            placeholder="John Doe" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#4b5563', fontSize: '14px' }}>Email Address</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
                            placeholder="user@example.com" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#4b5563', fontSize: '14px' }}>Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} 
                            placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={isLoading}
                        style={{ marginTop: '10px', padding: '12px', backgroundColor: isLoading ? '#93c5fd' : '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>Already have an account? </span>
                    <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>Log in here</Link>
                </div>
            </div>
        </div>
    );
};