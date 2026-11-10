import Icon from './Icon.jsx'
import { pick } from '../lib/text.js'
import { DOCS } from '../data/documents.js'

const docId = (d) => (typeof d === 'string' ? d : d.id)
export const docLabel = (id, lang) => (DOCS[id] ? pick(DOCS[id], lang) : id)

export default function SchemeCard({ scheme, lang, t, ticked, onTick }) {
  const why =
    scheme.why ||
    (scheme.whyProfiles && scheme.whyProfiles.length
      ? t.because(scheme.whyProfiles.map((p) => t.profile[p] || p).join(', '))
      : '')

  return (
    <article className="scheme">
      <header className="scheme-head">
        <h3>{pick(scheme.name, lang)}</h3>
        <span className={`level ${scheme.level === 'karnataka' ? 'state' : ''}`}>
          {scheme.level === 'karnataka' ? t.state : t.central}
        </span>
      </header>

      <p className="benefit">{pick(scheme.benefit, lang)}</p>
      {why && (
        <p className="why">
          <Icon name="check" size={16} strokeWidth={2.6} />
          <span>{why}</span>
        </p>
      )}

      <div className="docs">
        <h4>{t.docsTitle}</h4>
        <ul>
          {(scheme.docs || []).map((d) => {
            const id = docId(d)
            const on = Boolean(ticked[id])
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`doc ${on ? 'on' : ''}`}
                  aria-pressed={on}
                  onClick={() => onTick(id)}
                >
                  <span className="doc-box">{on && <Icon name="check" size={14} strokeWidth={3} />}</span>
                  {docLabel(id, lang)}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="how">
        <strong>{t.howApply}.</strong> {pick(scheme.how, lang)}
      </p>

      {scheme.url && (
        <a className="apply" href={scheme.url} target="_blank" rel="noopener noreferrer">
          {t.apply}
          <Icon name="external" size={16} />
        </a>
      )}
    </article>
  )
}
