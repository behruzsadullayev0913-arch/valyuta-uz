import { Moon, Sun, Wifi } from 'lucide-react'

export default function Header({ darkMode, onToggleTheme, now }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white shadow-lg shadow-blue-500/25">₿</div>
        <div>
          <p className="font-display text-xl font-bold tracking-tight text-ink dark:text-white">Valyuta<span className="text-brand">.uz</span></p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Moliyaviy ma’lumotlar markazi</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 sm:flex">
          <Wifi size={14} className="text-mint" /> <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> Jonli ma’lumot
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-ink dark:bg-slate-800 dark:text-slate-200">{now}</div>
        <button aria-label="Rang rejimini almashtirish" onClick={onToggleTheme} className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
