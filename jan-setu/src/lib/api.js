// The one place the app talks to a backend.
//
// With no VITE_API_URL set, the app runs on the offline matcher (demo mode).
// With VITE_API_URL set, it calls:   POST {VITE_API_URL}/ask
//   request : { "text": "I'm a farmer with two acres", "language": "en" | "hi" | "kn" }
//   response: { "reply": "optional sentence to show", "schemes": [ { "id": "pm-kisan", "why": "optional" } ] }
// `id` must match an id in src/data/schemes.js. A scheme may also be a full object
// (name, benefit, how, docs, url, level) as plain strings, if the backend owns the data.
// If the backend is down, the app quietly falls back to demo mode so the demo never breaks.
import { SCHEMES_BY_ID } from '../data/schemes.js'
import { matchSchemes } from './matcher.js'

const API_URL = (import.meta.env && import.meta.env.VITE_API_URL) || ''
export const usingBackend = Boolean(API_URL)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function askDemo({ text }) {
  await sleep(650 + Math.random() * 350) // a short pause so it feels like it is thinking
  return { reply: null, schemes: matchSchemes(text) }
}

function normalise(data) {
  const schemes = (data.schemes || [])
    .map((item) => {
      const scheme = typeof item === 'string' ? { id: item } : item
      return SCHEMES_BY_ID[scheme.id] || scheme.name ? scheme : null
    })
    .filter(Boolean)
  return { reply: data.reply || null, schemes }
}

export async function ask({ text, language }) {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL.replace(/\/$/, '')}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      })
      if (!res.ok) throw new Error(`Backend returned ${res.status}`)
      return normalise(await res.json())
    } catch (err) {
      console.warn('Backend unavailable, using demo data instead.', err)
    }
  }
  return askDemo({ text, language })
}
