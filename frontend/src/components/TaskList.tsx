import React, { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';

export const TaskList: React.FC = () => {
  const { tasks, loading, error, fetchTasks, updateTaskStatus, deleteTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const moveTask = async (id: number, currentStatus: string, direction: 'forward' | 'backward') => {
    let nextStatus = currentStatus;
    if (currentStatus === 'TODO' && direction === 'forward') nextStatus = 'IN_PROGRESS';
    else if (currentStatus === 'IN_PROGRESS' && direction === 'forward') nextStatus = 'COMPLETED';
    else if (currentStatus === 'IN_PROGRESS' && direction === 'backward') nextStatus = 'TODO';
    else if (currentStatus === 'COMPLETED' && direction === 'backward') nextStatus = 'IN_PROGRESS';

    if (nextStatus !== currentStatus) {
      await updateTaskStatus(id, nextStatus);
      fetchTasks();
    }
  };

  const columns = [
    { id: 'TODO', title: '⏳ To Do', bg: 'bg-amber-50/60 border-amber-200 text-amber-800' },
    { id: 'IN_PROGRESS', title: '⚡ In Progress', bg: 'bg-blue-50/60 border-blue-200 text-blue-800' },
    { id: 'COMPLETED', title: '✅ Completed', bg: 'bg-emerald-50/60 border-emerald-200 text-emerald-800' },
  ];

  if (loading && tasks.length === 0) return <div className="text-center py-10 font-medium text-slate-500">Loading task infrastructure...</div>;

  return (
    <div>
      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col max-h-[75vh]">
              <div className={`p-4 border-b font-semibold rounded-t-2xl flex justify-between items-center ${col.bg}`}>
                <span>{col.title}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border">{colTasks.length}</span>
              </div>
              <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
                {colTasks.map((task) => (
                  <div key={task.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-slate-800 text-sm leading-snug">{task.title}</h4>
                      <button onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-red-500 text-xs transition">❌</button>
                    </div>
                    {task.description && <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{task.priority}</span>
                      <div className="flex gap-1">
                        {col.id !== 'TODO' && (
                          <button onClick={() => moveTask(task.id, task.status, 'backward')} className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded">◀</button>
                        )}
                        {col.id !== 'COMPLETED' && (
                          <button onClick={() => moveTask(task.id, task.status, 'forward')} className="px-2 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded">▶</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {colTasks.length === 0 && <p className="text-center text-xs text-slate-400 py-6 italic">No tasks assigned here</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};