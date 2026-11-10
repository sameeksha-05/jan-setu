import Icon from './Icon.jsx'

export default function Composer({ t, variant, value, onChange, onSubmit, listening, onMic, disabled }) {
  return (
    <form
      className={`composer ${variant}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
    >
      <button
        type="button"
        className={`mic ${listening ? 'on' : ''}`}
        onClick={onMic}
        aria-pressed={listening}
        aria-label={listening ? t.micStop : t.micStart}
      >
        <Icon name="mic" size={variant === 'hero' ? 30 : 24} />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={listening ? t.listening : t.placeholder}
        aria-label={t.placeholder}
        autoComplete="off"
        enterKeyHint="send"
      />
      <button type="submit" className="send" disabled={disabled || !value.trim()} aria-label={t.send}>
        <Icon name="send" size={22} />
      </button>
    </form>
  )
}
