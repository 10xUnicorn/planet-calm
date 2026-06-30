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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        {['all', 'pending', 'in_progress', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`page-tab ${filter === f ? 'active' : ''}`}>
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button className="btn-primary" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={13} /> Add Task
        </button>
      </div>

      <div className="card">
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', fontSize: '12px', fontStyle: 'italic', color: '#9b6fc4' }}>
            No tasks match this filter
          </div>
        )}
        {filtered.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', cursor: 'pointer', borderBottom: '1px solid rgba(98,52,145,0.06)', borderRadius: '8px', transition: 'background 0.18s' }}>
            <button onClick={() => toggleStatus(t.id)} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              {t.status === 'completed' ? (
                <CheckCircle size={18} style={{ color: '#2a9d5c' }} />
              ) : t.status === 'in_progress' ? (
                <Clock size={18} style={{ color: '#e8c487' }} />
              ) : (
                <Circle size={18} style={{ color: '#9b6fc4' }} />
              )}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12.5px',
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                color: '#2d1a47',
                textDecoration: t.status === 'completed' ? 'line-through' : 'none',
                opacity: t.status === 'completed' ? 0.5 : 1,
              }}>{t.title}</div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <span className="tag">{t.module}</span>
                <span style={{ fontSize: '10px', color: '#7a5ea0' }}>{t.assigned} · Due {t.due}</span>
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
