'use client'

import { useState } from 'react'
import { Plus, CheckCircle, Circle, Clock } from 'lucide-react'

const initialTasks = [
  { id: '1', title: 'Review Best Friends pilot contract', priority: 'high', due: 'Jun 26', assigned: 'Stephanie', status: 'pending', module: 'Pipeline' },
  { id: '2', title: 'Send book chapter preview to Substack', priority: 'high', due: 'Jun 27', assigned: 'Stephanie', status: 'pending', module: 'Content' },
  { id: '3', title: 'Coach check-in with 14 at-risk Studio members', priority: 'medium', due: 'Jun 28', assigned: 'Coach Jen', status: 'in_progress', module: 'Clients' },
  { id: '4', title: 'Prepare BARKType cohort session agenda', priority: 'medium', due: 'Jun 30', assigned: 'Coach Ari', status: 'pending', module: 'Cohort' },
  { id: '5', title: 'Run AI reactivation batch for chew sub lapsed', priority: 'low', due: 'Jul 1', assigned: 'Stephanie', status: 'pending', module: 'AI Brain' },
  { id: '6', title: 'Upload affiliate book launch assets', priority: 'medium', due: 'Jul 2', assigned: 'Team', status: 'pending', module: 'Partners' },
  { id: '7', title: 'Reconcile Stripe payments for June', priority: 'low', due: 'Jul 5', assigned: 'Team', status: 'pending', module: 'Payments' },
  { id: '8', title: 'Onboard Austin Animal Center org admin', priority: 'high', due: 'Jun 25', assigned: 'Stephanie', status: 'completed', module: 'Cohort' },
]

const statusCycle: Record<string, string> = {
  pending: 'in_progress',
  in_progress: 'completed',
  completed: 'pending',
}

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const toggleStatus = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: statusCycle[t.status] || 'pending' } : t
    ))
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        {['all', 'pending', 'in_progress', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-[7px] rounded-full text-[10.5px] font-bold cursor-pointer"
            style={{
              background: filter === f ? '#623491' : '#ede4f5',
              color: filter === f ? '#e8c487' : '#623491',
              fontFamily: 'Georgia, serif',
              border: filter === f ? 'none' : '1.5px solid #d6c8e4',
            }}>
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button className="px-4 py-[8px] rounded-full text-[11px] font-bold cursor-pointer flex items-center gap-2 ml-auto"
          style={{ background: 'linear-gradient(135deg,#623491,#9b6fc4)', color: '#e8c487', fontFamily: 'Georgia, serif', border: 'none' }}>
          <Plus size={13} /> Add Task
        </button>
      </div>

      <div className="bg-white rounded-[14px] p-5"
        style={{ border: '1px solid #d6c8e4', boxShadow: '0 2px 12px rgba(98,52,145,0.08)' }}>
        {filtered.length === 0 && (
          <div className="text-center py-8 text-[12px] italic" style={{ color: '#9b6fc4' }}>
            No tasks match this filter
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} className="flex items-center gap-4 py-3 cursor-pointer hover:bg-[#fdf8ec] rounded-lg px-3"
            style={{ borderBottom: '1px solid #f0e8f5' }}>
            <button onClick={() => toggleStatus(t.id)} className="cursor-pointer" style={{ background: 'none', border: 'none', padding: 0 }}>
              {t.status === 'completed' ? (
                <CheckCircle size={18} style={{ color: '#2a9d5c' }} />
              ) : t.status === 'in_progress' ? (
                <Clock size={18} style={{ color: '#e8c487' }} />
              ) : (
                <Circle size={18} style={{ color: '#9b6fc4' }} />
              )}
            </button>
            <div className="flex-1">
              <div className={`text-[12.5px] font-bold ${t.status === 'completed' ? 'line-through opacity-50' : ''}`}
                style={{ fontFamily: 'Georgia, serif', color: '#2d1a47' }}>{t.title}</div>
              <div className="flex gap-2 mt-1">
                <span className="tag">{t.module}</span>
                <span className="text-[10px]" style={{ color: '#7a5ea0' }}>{t.assigned} · Due {t.due}</span>
              </div>
            </div>
            <span className={`pill ${t.priority === 'high' ? 'pill-red' : t.priority === 'medium' ? 'pill-amber' : 'pill-purple'}`}>
              {t.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
