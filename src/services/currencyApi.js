const CBU_URL = 'https://cbu.uz/uz/arkhiv-kursov-valyut/json/'

export const fallbackCurrencies = [
  { code: 'USD', name: 'AQSH dollari', rate: 12645.01, diff: 12.34, flag: '🇺🇸' },
  { code: 'EUR', name: 'Yevro', rate: 13782.65, diff: -18.12, flag: '🇪🇺' },
  { code: 'RUB', name: 'Rossiya rubli', rate: 138.2, diff: 0.42, flag: '🇷🇺' },
  { code: 'GBP', name: 'Angliya funti', rate: 15892.4, diff: 24.15, flag: '🇬🇧' },
  { code: 'KZT', name: 'Qozog‘iston tengesi', rate: 27.18, diff: -0.08, flag: '🇰🇿' },
  { code: 'CNY', name: 'Xitoy yuani', rate: 1745.33, diff: 1.25, flag: '🇨🇳' },
  { code: 'AED', name: 'BAA dirhami', rate: 3440.91, diff: 3.11, flag: '🇦🇪' },
]

const flags = { USD: '🇺🇸', EUR: '🇪🇺', RUB: '🇷🇺', GBP: '🇬🇧', KZT: '🇰🇿', CNY: '🇨🇳', AED: '🇦🇪', JPY: '🇯🇵', TRY: '🇹🇷', CHF: '🇨🇭' }

export async function fetchCurrencies() {
  const response = await fetch(CBU_URL)
  if (!response.ok) throw new Error(`CBU request failed: ${response.status}`)

  const data = await response.json()
  if (!Array.isArray(data) || data.length === 0) throw new Error('Empty CBU response')

  return data
    .filter((item) => item.Ccy && Number(item.Rate))
    .map((item) => ({
      code: item.Ccy,
      name: item.CcyNm_UZ || item.CcyNm_EN || item.Ccy,
      rate: Number(item.Rate),
      diff: Number(item.Diff) || 0,
      flag: flags[item.Ccy] || '🌐',
      date: item.Date,
    }))
}
