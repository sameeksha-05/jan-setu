import Icon from './Icon.jsx'
import { LANGS } from '../i18n.js'

export default function Header({ t, lang, onLang, canReset, onReset }) {
  return (
    <header className="top">
      <div className="wrap top-in">
        <button type="button" className="brand" onClick={onReset} aria-label={t.appName}>
          <span className="brand-mark">
            <Icon name="logo" size={26} />
          </span>
          <span className="brand-name">{t.appName}</span>
        </button>

        <div className="top-actions">
          {canReset && (
            <button type="button" className="link-btn" onClick={onReset}>
              <Icon name="refresh" size={16} />
              <span>{t.startOver}</span>
            </button>
          )}
          <div className="lang" role="radiogroup" aria-label={t.langLabel}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                role="radio"
                aria-checked={lang === l.code}
                className={lang === l.code ? 'on' : ''}
                onClick={() => onLang(l.code)}
                lang={l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
