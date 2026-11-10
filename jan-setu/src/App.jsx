import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LANGS, T } from './i18n.js'
import { SCHEMES_BY_ID } from './data/schemes.js'
import { ask } from './lib/api.js'
import { pick } from './lib/text.js'
import { canListen, listen, canSpeak, speak, stopSpeaking, hasVoiceFor } from './lib/speech.js'
import Header from './components/Header.jsx'
import Composer from './components/Composer.jsx'
import Message from './components/Message.jsx'
import Slip from './components/Slip.jsx'
import { docLabel } from './components/SchemeCard.jsx'

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage can be blocked (private mode); the app still works */
  }
}

const startLang = () => {
  const stored = load('jansetu.lang', null)
  if (stored && T[stored]) return stored
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'en'
  if (nav.startsWith('hi')) return 'hi'
  if (nav.startsWith('kn')) return 'kn'
  return 'en'
}

const docIdOf = (d) => (typeof d === 'string' ? d : d.id)

function HeroArt() {
  return (
    <svg className="hero-art" viewBox="0 0 520 300" aria-hidden="true" focusable="false">
      <circle cx="400" cy="70" r="38" className="art-sun" />
      <g className="art-bridge" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 190h480" />
        <path d="M60 190C60 60 460 60 460 190" />
        <path d="M130 108v82M195 84v106M260 76v114M325 84v106M390 108v82" />
      </g>
      <g className="art-water" fill="none" strokeWidth="4" strokeLinecap="round">
        <path d="M20 224q20-14 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" />
        <path d="M20 254q20-14 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" />
      </g>
    </svg>
  )
}

export default function App() {
  const [lang, setLang] = useState(startLang)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [listening, setListening] = useState(false)
  const [notice, setNotice] = useState(null)
  const [speakingId, setSpeakingId] = useState(null)
  const [ticked, setTicked] = useState(() => load('jansetu.ticked', {}))

  const recRef = useRef(null)
  const lastBotRef = useRef(null)
  const submitRef = useRef(null)

  const t = T[lang]
  const langInfo = LANGS.find((l) => l.code === lang)

  // keep <html lang> and the tab title in step with the chosen language
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${t.appName} | ${t.tagline}`
    save('jansetu.lang', lang)
  }, [lang, t])

  useEffect(() => save('jansetu.ticked', ticked), [ticked])

  // browsers load their voice list lazily
  useEffect(() => {
    if (!canSpeak) return undefined
    const warm = () => window.speechSynthesis.getVoices()
    warm()
    window.speechSynthesis.addEventListener('voiceschanged', warm)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', warm)
  }, [])

  const reset = useCallback(() => {
    if (recRef.current) {
      try {
        recRef.current.abort()
      } catch {
        /* already stopped */
      }
    }
    stopSpeaking()
    setSpeakingId(null)
    setListening(false)
    setMessages([])
    setInput('')
    setNotice(null)
    window.scrollTo({ top: 0 })
  }, [])

  const changeLang = (code) => {
    if (code === lang) return
    if (recRef.current) {
      try {
        recRef.current.abort()
      } catch {
        /* already stopped */
      }
    }
    stopSpeaking()
    setSpeakingId(null)
    setListening(false)
    setNotice(null)
    setLang(code)
  }

  const submit = useCallback(
    async (raw) => {
      const text = String(raw || '').trim()
      if (!text || busy) return
      stopSpeaking()
      setSpeakingId(null)
      setNotice(null)
      setInput('')
      const id = Date.now()
      setMessages((m) => [...m, { id, role: 'user', text }, { id: id + 1, role: 'bot', pending: true }])
      setBusy(true)
      try {
        const res = await ask({ text, language: lang })
        const items = res.schemes.map((item) => ({ ...(SCHEMES_BY_ID[item.id] || {}), ...item }))
        setMessages((m) => m.map((x) => (x.id === id + 1 ? { id: id + 1, role: 'bot', reply: res.reply, items } : x)))
      } catch (err) {
        console.error(err)
        setMessages((m) => m.map((x) => (x.id === id + 1 ? { id: id + 1, role: 'bot', error: true, items: [] } : x)))
      } finally {
        setBusy(false)
      }
    },
    [busy, lang],
  )
  submitRef.current = submit

  const toggleMic = () => {
    if (!canListen) {
      setNotice('micUnsupported')
      return
    }
    if (listening) {
      if (recRef.current) recRef.current.stop()
      return
    }
    stopSpeaking()
    setSpeakingId(null)
    setNotice(null)
    setInput('')
    setListening(true)
    try {
      recRef.current = listen({
        lang: langInfo.speech,
        onInterim: setInput,
        onError: (code) => {
          if (code === 'not-allowed' || code === 'service-not-allowed') setNotice('micDenied')
          else if (code === 'no-speech') setNotice('noSpeech')
          else if (code !== 'aborted') setNotice('micError')
        },
        onEnd: (text) => {
          setListening(false)
          if (text) submitRef.current(text)
        },
      })
    } catch {
      setListening(false)
      setNotice('micError')
    }
  }

  const toggleTick = (id) => setTicked((prev) => ({ ...prev, [id]: !prev[id] }))

  // the most recent answer that actually found schemes drives the carry slip
  const latest = useMemo(
    () => [...messages].reverse().find((m) => m.role === 'bot' && !m.pending && m.items && m.items.length),
    [messages],
  )

  const slipDocs = useMemo(() => {
    const map = new Map()
    ;((latest && latest.items) || []).forEach((s) => {
      ;(s.docs || []).forEach((d) => {
        const id = docIdOf(d)
        if (!map.has(id)) map.set(id, { id, label: docLabel(id, lang), forNames: [] })
        map.get(id).forNames.push(pick(s.name, lang))
      })
    })
    return [...map.values()].sort((a, b) => b.forNames.length - a.forNames.length)
  }, [latest, lang])

  const schemeNames = useMemo(
    () => ((latest && latest.items) || []).map((s) => pick(s.name, lang)),
    [latest, lang],
  )

  const readAloud = (msg) => {
    if (!canSpeak) return
    if (speakingId === msg.id) {
      stopSpeaking()
      setSpeakingId(null)
      return
    }
    const parts = [msg.reply || (msg.items.length ? t.found(msg.items.length) : t.none)]
    msg.items.forEach((s) => parts.push(`${pick(s.name, lang)}. ${pick(s.benefit, lang)}`))
    if (msg.items.length && slipDocs.length) {
      parts.push(`${t.docsTitle}: ${slipDocs.map((d) => d.label).join(', ')}.`)
    }
    setNotice(hasVoiceFor(langInfo.speech) === false ? 'noVoice' : null)
    setSpeakingId(msg.id)
    speak(parts.join(' '), langInfo.speech, () => setSpeakingId((cur) => (cur === msg.id ? null : cur)))
  }

  // bring the newest answer into view
  const lastBotId = [...messages].reverse().find((m) => m.role === 'bot')?.id
  useEffect(() => {
    if (!lastBotRef.current) return
    const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lastBotRef.current.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
  }, [lastBotId, messages.length])

  const started = messages.length > 0
  const noticeText = notice ? t.errors[notice] : null

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <Header t={t} lang={lang} onLang={changeLang} canReset={started} onReset={reset} />

      <main id="main">
        {!started ? (
          <>
            <section className="hero">
              <div className="wrap hero-in">
                <div className="hero-copy">
                  <h1>{t.heroTitle}</h1>
                  <p className="hero-sub">{t.heroSub}</p>
                  <Composer
                    t={t}
                    variant="hero"
                    value={input}
                    onChange={setInput}
                    onSubmit={submit}
                    listening={listening}
                    onMic={toggleMic}
                    disabled={busy}
                  />
                  {noticeText && (
                    <p className="notice" role="status">
                      {noticeText}
                    </p>
                  )}
                  <div className="try">
                    <p>{t.tryTitle}</p>
                    <div className="chips">
                      {t.examples.map((ex) => (
                        <button key={ex} type="button" className="chip" onClick={() => submit(ex)}>
                          {ex}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <HeroArt />
              </div>
            </section>

            <section className="how-section" aria-labelledby="how-title">
              <div className="wrap">
                <h2 id="how-title">{t.howTitle}</h2>
                <ol className="steps">
                  {t.steps.map((s, i) => (
                    <li key={s.t}>
                      <span className="step-n">{i + 1}</span>
                      <div>
                        <h3>{s.t}</h3>
                        <p>{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </>
        ) : (
          <div className="wrap stage">
            <div className="thread">
              {messages.map((m, i) => (
                <Message
                  key={m.id}
                  msg={m}
                  lang={lang}
                  t={t}
                  ticked={ticked}
                  onTick={toggleTick}
                  onRead={readAloud}
                  speaking={speakingId === m.id}
                  canSpeak={canSpeak}
                  onChip={submit}
                  ref={m.role === 'bot' && m.id === lastBotId ? lastBotRef : null}
                />
              ))}
            </div>
            <div className="slipcol">
              <Slip t={t} docs={slipDocs} ticked={ticked} onTick={toggleTick} schemeNames={schemeNames} />
            </div>
          </div>
        )}
      </main>

      {started && (
        <div className="dock">
          <div className="wrap">
            {noticeText && (
              <p className="notice" role="status">
                {noticeText}
              </p>
            )}
            <Composer
              t={t}
              variant="dock"
              value={input}
              onChange={setInput}
              onSubmit={submit}
              listening={listening}
              onMic={toggleMic}
              disabled={busy}
            />
          </div>
        </div>
      )}
    </>
  )
}
