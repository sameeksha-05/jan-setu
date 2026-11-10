// Thin wrappers over the browser's Web Speech API (voice in, voice out).
// Voice input works in Chrome and Edge (desktop and Android). Safari support is partial.

const SR = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
export const canListen = Boolean(SR)
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

export function listen({ lang, onInterim, onError, onEnd }) {
  const rec = new SR()
  rec.lang = lang
  rec.interimResults = true
  rec.continuous = false
  rec.maxAlternatives = 1
  let finalText = ''
  let lastText = ''
  rec.onresult = (event) => {
    let interim = ''
    finalText = ''
    for (let i = 0; i < event.results.length; i++) {
      const result = event.results[i]
      if (result.isFinal) finalText += result[0].transcript
      else interim += result[0].transcript
    }
    lastText = (finalText + interim).trim()
    onInterim(lastText)
  }
  rec.onerror = (event) => onError(event.error)
  rec.onend = () => onEnd((finalText || lastText).trim())
  rec.start()
  return rec
}

// null = the browser has not loaded its voice list yet, so we cannot tell.
export function hasVoiceFor(code) {
  if (!canSpeak) return false
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  const wanted = code.toLowerCase()
  return voices.some((v) => {
    const l = v.lang.toLowerCase().replace('_', '-')
    return l === wanted || l.startsWith(wanted.slice(0, 2))
  })
}

function pickVoice(code) {
  const voices = window.speechSynthesis.getVoices()
  const wanted = code.toLowerCase()
  return (
    voices.find((v) => v.lang.toLowerCase().replace('_', '-') === wanted) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(wanted.slice(0, 2))) ||
    null
  )
}

export function speak(text, code, onEnd) {
  if (!canSpeak) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = code
  const voice = pickVoice(code)
  if (voice) utterance.voice = voice
  utterance.rate = 0.92
  utterance.onend = () => onEnd && onEnd()
  utterance.onerror = () => onEnd && onEnd()
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel()
}
