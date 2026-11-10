import { useState } from 'react'
import Icon from './Icon.jsx'

function slipText(t, docs, ticked, schemeNames) {
  const lines = [`${t.appName}: ${t.slipTitle}`, '']
  docs.forEach((d) => lines.push(`${ticked[d.id] ? '[x]' : '[ ]'} ${d.label}`))
  if (schemeNames.length) lines.push('', schemeNames.join(', '))
  return lines.join('\n')
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers and non-secure pages: use a hidden textarea instead.
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(area)
    return ok
  }
}

export default function Slip({ t, docs, ticked, onTick, schemeNames }) {
  const [copied, setCopied] = useState(false)
  const done = docs.filter((d) => ticked[d.id]).length
  const all = docs.length > 0 && done === docs.length
  const text = slipText(t, docs, ticked, schemeNames)

  const onCopy = async () => {
    if (await copyToClipboard(text)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <aside className="slip" aria-label={t.slipTitle}>
      <div className="slip-head">
        <span className="slip-logo">
          <Icon name="logo" size={22} />
        </span>
        <h2>{t.slipTitle}</h2>
      </div>
      {all && <span className="stamp">{t.ready}</span>}
      <div className="slip-tear" aria-hidden="true" />

      {docs.length === 0 ? (
        <p className="slip-empty">{t.slipEmpty}</p>
      ) : (
        <>
          <ul className="slip-list">
            {docs.map((d) => {
              const on = Boolean(ticked[d.id])
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    className={`slip-row ${on ? 'on' : ''}`}
                    onClick={() => onTick(d.id)}
                  >
                    <span className="slip-box">{on && <Icon name="check" size={16} strokeWidth={3.2} />}</span>
                    <span className="slip-label">
                      <span className="slip-doc">{d.label}</span>
                      <span className="slip-for">
                        {t.slipFor}: {d.forNames.join(', ')}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="slip-progress" aria-live="polite">
            <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={docs.length} aria-valuenow={done}>
              <i style={{ width: `${(done / docs.length) * 100}%` }} />
            </div>
            <p>{all ? t.slipDone : t.slipProgress(done, docs.length)}</p>
          </div>

          <div className="slip-actions">
            <button type="button" className="mini" onClick={onCopy}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              {copied ? t.copied : t.copy}
            </button>
            <a className="mini" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" size={16} />
              {t.whatsapp}
            </a>
            <button type="button" className="mini" onClick={() => window.print()}>
              <Icon name="printer" size={16} />
              {t.print}
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
