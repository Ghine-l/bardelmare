import React from 'react'

const items = [
  'Cocktail Artigianali', '✦', 'Cucina di Mare', '✦',
  'Live Music', '✦', 'QR Order', '✦',
  'Sunset Views', '✦', 'Beach Vibes', '✦',
  'Happy Hour 17–19', '✦', 'Piadina Romagnola', '✦',
  'Birre Artigianali', '✦', 'Estate Rimini', '✦',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/5 py-4 bg-sand-surface">
      <div className="flex gap-8 ticker-track whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className={`text-xs font-semibold tracking-widest uppercase ${
            item === '✦' ? 'text-wave' : 'text-salt/30'
          }`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
