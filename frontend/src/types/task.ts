export interface User {
  email: string;
  name: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  assigneeName: string;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  title: string;
  description?: string;
  status: string;
  priority: string;
}