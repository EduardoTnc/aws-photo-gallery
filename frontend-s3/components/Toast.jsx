import { useEffect } from 'react'

const variants = {
  success: 'bg-emerald-600',
  error: 'bg-red-600',
  info: 'bg-slate-800',
}

export default function Toast({ open, message, type = 'info', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(id)
  }, [open, duration, onClose])

  if (!open) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`text-white px-4 py-3 rounded-lg shadow-lg ${variants[type]}`}>
        {message}
      </div>
    </div>
  )
}
