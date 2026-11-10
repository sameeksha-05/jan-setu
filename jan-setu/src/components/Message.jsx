import { forwardRef } from 'react'
import Icon from './Icon.jsx'
import SchemeCard from './SchemeCard.jsx'

const Message = forwardRef(function Message(
  { msg, lang, t, ticked, onTick, onRead, speaking, canSpeak, onChip },
  ref,
) {
  if (msg.role === 'user') {
    return (
      <div className="msg user">
        <p>{msg.text}</p>
      </div>
    )
  }

  if (msg.pending) {
    return (
      <div className="msg bot" ref={ref}>
        <span className="avatar">
          <Icon name="logo" size={20} />
        </span>
        <p className="thinking" role="status">
          {t.thinking}
          <span className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>
    )
  }

  if (msg.error) {
    return (
      <div className="msg bot" ref={ref}>
        <span className="avatar">
          <Icon name="logo" size={20} />
        </span>
        <p role="alert">{t.errors.network}</p>
      </div>
    )
  }

  const has = msg.items.length > 0
  return (
    <div className="msg bot" ref={ref}>
      <span className="avatar">
        <Icon name="logo" size={20} />
      </span>
      <div className="bot-body">
        <p className="reply" aria-live="polite">
          {msg.reply || (has ? t.found(msg.items.length) : t.none)}
        </p>

        {has && <p className="hint">{t.foundHint}</p>}

        {canSpeak && (
          <button type="button" className={`read ${speaking ? 'on' : ''}`} onClick={() => onRead(msg)}>
            <Icon name={speaking ? 'stop' : 'speaker'} size={16} />
            {speaking ? t.stopRead : t.read}
          </button>
        )}

        {!has && (
          <div className="chips">
            {t.clarify.map((c) => (
              <button key={c.label} type="button" className="chip" onClick={() => onChip(c.text)}>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {has && (
          <div className="schemes">
            {msg.items.map((s) => (
              <SchemeCard key={s.id || pickKey(s)} scheme={s} lang={lang} t={t} ticked={ticked} onTick={onTick} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

const pickKey = (s) => (typeof s.name === 'string' ? s.name : s.name && s.name.en) || Math.random().toString(36)

export default Message
