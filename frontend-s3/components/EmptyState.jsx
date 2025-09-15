const EmptyState = ({ title = 'Sin imágenes aún', subtitle = 'Sube tu primera imagen para comenzar.' }) => {
  return (
    <div className="text-center py-16 card">
      <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-slate-400">
          <path d="M19.5 6h-15A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 19.5 6Zm0 1.5v6.94l-3.72-3.72a1.5 1.5 0 0 0-2.12 0l-1.06 1.06-3.72-3.72a1.5 1.5 0 0 0-2.12 0L4.5 10.94V7.5h15Zm-15 9v-2.56l3.72-3.72 4.78 4.78H4.5Zm10.06 0L12 12.94l1.06-1.06 4.5 4.5h-3Z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-1">{subtitle}</p>
    </div>
  )
}

export default EmptyState
