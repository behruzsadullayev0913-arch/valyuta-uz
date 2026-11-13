import { useEffect, useRef, useState } from 'react'
import { ArrowDownUp, Calculator, Check, ChevronDown, Globe2, Search } from 'lucide-react'

const currencySymbols = {
  UZS: "so'm", USD: '$', EUR: '€', RUB: '₽', GBP: '£', KZT: '₸', CNY: '¥', AED: 'د.إ', JPY: '¥', TRY: '₺', CHF: 'CHF',
  AUD: 'A$', CAD: 'C$', INR: '₹', KRW: '₩', PLN: 'zł', SEK: 'kr', NOK: 'kr', DKK: 'kr',
}

const flagCountries = {
  UZS: 'uz', USD: 'us', EUR: 'eu', RUB: 'ru', GBP: 'gb', KZT: 'kz', CNY: 'cn', AED: 'ae', JPY: 'jp', TRY: 'tr', CHF: 'ch',
  AUD: 'au', AZN: 'az', BGN: 'bg', BHD: 'bh', BRL: 'br', BYN: 'by', CAD: 'ca', CZK: 'cz', DKK: 'dk', EGP: 'eg', GEL: 'ge', HKD: 'hk',
  HUF: 'hu', IDR: 'id', INR: 'in', IRR: 'ir', ISK: 'is', ILS: 'il', KRW: 'kr', KWD: 'kw', KGS: 'kg', LBP: 'lb', MYR: 'my', MDL: 'md',
  MXN: 'mx', NOK: 'no', NZD: 'nz', PHP: 'ph', PLN: 'pl', QAR: 'qa', RON: 'ro', SAR: 'sa', SEK: 'se', SGD: 'sg', TJS: 'tj', TMT: 'tm',
  THB: 'th', UAH: 'ua', VND: 'vn', ZAR: 'za',
}

export function CurrencyFlag({ code }) {
  const country = flagCountries[code]
  return country
    ? <img src={`https://flagcdn.com/w40/${country}.png`} alt={`${code} bayrog‘i`} className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-600" />
    : <span title={`${code} uchun bayroq mavjud emas`} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"><Globe2 size={12} /></span>
}

function formatAmount(value) {
  if (!value) return ''
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function CurrencySelect({ value, onChange, currencies }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const filtered = currencies.filter((currency) => `${currency.code} ${currency.name}`.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const closeOnOutsideClick = (event) => { if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false) }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const choose = (code) => { onChange(code); setQuery(''); setOpen(false) }

  return <div ref={containerRef} className="relative z-40 flex-1">
    <button type="button" onClick={() => setOpen((isOpen) => !isOpen)} aria-expanded={open} className="flex w-full items-center gap-2 rounded-xl bg-transparent py-1 pl-1 pr-0 text-left text-sm font-bold text-ink outline-none transition dark:text-white">
      <CurrencyFlag code={value} /><span>{value}</span><ChevronDown size={15} className={`ml-auto shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
    {open && <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/15 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30">
      <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"><Search size={15} className="shrink-0 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kod yoki nom bo‘yicha..." className="w-full bg-transparent text-xs text-ink outline-none placeholder:text-slate-400 dark:text-white" /></div>
      <div className="scrollbar-thin max-h-60 overflow-y-auto overscroll-contain">{filtered.map((currency) => <button type="button" key={currency.code} onClick={() => choose(currency.code)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-blue-50 dark:hover:bg-blue-500/10 ${currency.code === value ? 'bg-blue-50 text-brand dark:bg-blue-500/10' : 'text-ink dark:text-slate-200'}`}><CurrencyFlag code={currency.code} /><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{currency.code}</span><span className="block truncate text-[11px] text-slate-400">{currency.name}</span></span>{currency.code === value && <Check size={15} className="text-brand" />}</button>)}{filtered.length === 0 && <p className="px-3 py-5 text-center text-xs text-slate-400">Valyuta topilmadi</p>}</div>
    </div>}
  </div>
}

export default function Converter({ currencies, amount, setAmount, from, setFrom, to, setTo, onSwap }) {
  const byCode = Object.fromEntries(currencies.map((currency) => [currency.code, currency]))
  const fromRate = from === 'UZS' ? 1 : byCode[from]?.rate || 1
  const toRate = to === 'UZS' ? 1 : byCode[to]?.rate || 1
  const result = (Number(amount || 0) * fromRate / toRate).toLocaleString('uz-UZ', { maximumFractionDigits: 2 })
  const getName = (code) => code === 'UZS' ? 'O‘zbekiston so‘mi' : byCode[code]?.name || code

  return <section className="card relative z-30 overflow-visible"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-7"><div><div className="mb-1 flex items-center gap-2"><Calculator size={17} className="text-brand" /><h2 className="font-display text-lg font-bold text-ink dark:text-white">Valyuta konvertori</h2></div><p className="text-sm text-slate-500 dark:text-slate-400">Markaziy bankning rasmiy kurslari asosida</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand dark:bg-blue-500/10">UZS bazasi</span></div><div className="p-5 sm:p-7"><div className="grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="input-shell p-3"><label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Sizda bor</label><div className="flex items-center gap-3"><input value={formatAmount(amount)} onChange={(e) => setAmount(e.target.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''))} type="text" inputMode="numeric" pattern="[0-9 ]*" className="w-full min-w-0 bg-transparent text-2xl font-bold text-ink outline-none dark:text-white" placeholder="0" aria-label="Konvertatsiya qilinadigan summa"/><span className="shrink-0 text-lg font-bold text-slate-400 dark:text-slate-500">{currencySymbols[from] || from}</span><div className="flex min-w-[94px] items-center gap-1 rounded-xl bg-white px-2 py-2 shadow-sm dark:bg-slate-700"><CurrencySelect value={from} onChange={setFrom} currencies={currencies}/></div></div><p className="mt-2 truncate text-xs text-slate-400">{getName(from)}</p></div><button onClick={onSwap} aria-label="Valyutalarni almashtirish" className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand shadow-sm transition hover:rotate-180 hover:border-brand dark:border-slate-700 dark:bg-slate-800"><ArrowDownUp size={18}/></button><div className="input-shell border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/60 dark:bg-blue-500/10"><label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Natija</label><div className="flex items-center gap-3"><output className="w-full min-w-0 overflow-hidden text-2xl font-bold text-ink dark:text-white">{result}</output><span className="shrink-0 text-lg font-bold text-brand">{currencySymbols[to] || to}</span><div className="flex min-w-[94px] items-center gap-1 rounded-xl bg-white px-2 py-2 shadow-sm dark:bg-slate-700"><CurrencySelect value={to} onChange={setTo} currencies={currencies}/></div></div><p className="mt-2 truncate text-xs text-slate-400">{getName(to)}</p></div></div><p className="mt-5 text-center text-xs text-slate-400">Kurs: 1 {from} = {(fromRate / toRate).toLocaleString('uz-UZ', { maximumFractionDigits: 4 })} {to}</p></div></section>
}
