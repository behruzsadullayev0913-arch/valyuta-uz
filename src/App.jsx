import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Converter from './components/Converter'
import RatesTable from './components/RatesTable'
import CryptoSection from './components/CryptoSection'
import { fallbackCurrencies, fetchCurrencies } from './services/currencyApi'

const uzs = { code: 'UZS', name: 'O‘zbekiston so‘mi', rate: 1, diff: 0, flag: '🇺🇿' }

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('valyuta-theme') === 'dark')
  const [currencies, setCurrencies] = useState(fallbackCurrencies)
  const [isFallback, setIsFallback] = useState(true)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('Demo kurslar')
  const [amount, setAmount] = useState(() => localStorage.getItem('valyuta-amount') || '100000')
  const [from, setFrom] = useState('UZS')
  const [to, setTo] = useState('USD')
  const [now, setNow] = useState(new Date())

  const allCurrencies = useMemo(() => [uzs, ...currencies], [currencies])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('valyuta-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('valyuta-amount', amount)
  }, [amount])

  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer) }, [])

  async function loadRates() {
    setLoading(true)
    try {
      const fresh = await fetchCurrencies()
      setCurrencies(fresh)
      setIsFallback(false)
      setLastUpdated(`Yangilandi: ${new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}`)
    } catch { setIsFallback(true); setLastUpdated('Demo kurslar · API mavjud emas') } finally { setLoading(false) }
  }

  useEffect(() => { loadRates() }, [])
  const toggle = () => setDarkMode((value) => !value)
  const swap = () => { setFrom(to); setTo(from) }

  return <div className="page-grid min-h-screen"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Header darkMode={darkMode} onToggleTheme={toggle} now={now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}/><main className="pb-12"><div className="mb-8 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand">Moliyaviy navigator</p><h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink dark:text-white sm:text-5xl">Kurslarni kuzating.<br/><span className="text-brand">Oson konvertatsiya qiling.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">O‘zbekiston Markaziy bankining rasmiy kurslari bilan valyutalaringiz qiymatini tez va aniq hisoblang.</p></div>{isFallback && <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/70 dark:bg-amber-500/10 dark:text-amber-300">CBU API’ga ulanib bo‘lmadi. Hozir demo kurslar ko‘rsatilmoqda.</div>}<div className="space-y-6"><Converter currencies={allCurrencies} amount={amount} setAmount={setAmount} from={from} setFrom={setFrom} to={to} setTo={setTo} onSwap={swap}/><RatesTable currencies={currencies} loading={loading} onRefresh={loadRates} lastUpdated={lastUpdated}/><CryptoSection/></div></main><footer className="border-t border-slate-200/70 py-6 text-center text-xs text-slate-400 dark:border-slate-800">Valyuta.uz · Kurslar O‘zbekiston Respublikasi Markaziy banki ma’lumotlari asosida</footer></div></div>
}
