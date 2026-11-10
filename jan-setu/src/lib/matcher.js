// A small, offline "who is this person?" detector. It lets the demo work with no backend.
// The real backend (Gemini + schemes.json) replaces this, but the app calls it the same way.
import { SCHEMES } from '../data/schemes.js'

const KEYWORDS = {
  farmer: [
    'farmer', 'farm', 'kisan', 'acre', 'crop', 'agricultur', 'cultivat', 'paddy',
    'किसान', 'खेती', 'खेत', 'फसल', 'एकड़',
    'ರೈತ', 'ಕೃಷಿ', 'ಜಮೀನು', 'ಎಕರೆ', 'ಬೆಳೆ', 'ತೋಟ',
  ],
  student: [
    'student', 'college', 'school', 'scholarship', 'studying', 'engineering', 'degree',
    'विद्यार्थी', 'छात्र', 'पढ़', 'कॉलेज', 'स्कूल', 'छात्रवृत्ति',
    'ವಿದ್ಯಾರ್ಥಿ', 'ಕಾಲೇಜು', 'ಶಾಲೆ', 'ವಿದ್ಯಾರ್ಥಿವೇತನ', 'ಓದ',
  ],
  senior: [
    'senior', 'elderly', 'old age', 'old man', 'old woman', 'retired', 'pension', 'grandfather', 'grandmother',
    'बुज़ुर्ग', 'बुजुर्ग', 'वृद्ध', 'वरिष्ठ', 'पेंशन', 'दादा', 'दादी',
    'ಹಿರಿಯ', 'ವೃದ್ಧ', 'ಪಿಂಚಣಿ', 'ಅಜ್ಜ', 'ಅಜ್ಜಿ',
  ],
  woman: [
    'woman', 'women', 'lady', 'mother', 'wife', 'widow', 'housewife',
    'महिला', 'औरत', 'माँ', 'मां', 'विधवा', 'पत्नी',
    'ಮಹಿಳೆ', 'ತಾಯಿ', 'ವಿಧವೆ', 'ಹೆಂಡತಿ', 'ಗೃಹಿಣಿ',
  ],
  girlChild: [
    'daughter', 'girl child', 'baby girl',
    'बेटी', 'बच्ची',
    'ಮಗಳು', 'ಹೆಣ್ಣು ಮಗು',
  ],
  worker: [
    'daily wage', 'daily-wage', 'labour', 'laborer', 'labourer', 'worker', 'construction', 'driver', 'mason',
    'मजदूर', 'मज़दूर', 'दिहाड़ी', 'कामगार',
    'ಕೂಲಿ', 'ಕಾರ್ಮಿಕ', 'ದಿನಗೂಲಿ',
  ],
  business: [
    'business', 'shop', 'loan', 'self-employed', 'self employed', 'startup', 'trade', 'vendor',
    'दुकान', 'व्यापार', 'व्यवसाय', 'कर्ज़', 'कर्ज', 'लोन',
    'ಅಂಗಡಿ', 'ವ್ಯಾಪಾರ', 'ಉದ್ಯಮ', 'ಸಾಲ',
  ],
  houseless: [
    'house', 'home', 'housing', 'roof',
    'घर', 'मकान',
    'ಮನೆ',
  ],
  health: [
    'health', 'hospital', 'medical', 'treatment', 'surgery', 'illness', 'sick', 'insurance', 'doctor',
    'स्वास्थ्य', 'अस्पताल', 'इलाज', 'बीमार',
    'ಆರೋಗ್ಯ', 'ಆಸ್ಪತ್ರೆ', 'ಚಿಕಿತ್ಸೆ', 'ಅನಾರೋಗ್ಯ',
  ],
  food: [
    'ration', 'food', 'grain', 'rice', 'wheat', 'hunger',
    'राशन', 'अनाज', 'चावल',
    'ಪಡಿತರ', 'ಅಕ್ಕಿ', 'ಆಹಾರ',
  ],
  bank: [
    'bank account', 'savings account', 'zero balance', 'jan dhan', 'no bank',
    'बैंक खाता', 'जन धन',
    'ಬ್ಯಾಂಕ್ ಖಾತೆ', 'ಜನ್ ಧನ್',
  ],
  gas: [
    'lpg', 'cooking gas', 'gas connection', 'cylinder',
    'गैस', 'सिलेंडर',
    'ಗ್ಯಾಸ್', 'ಸಿಲಿಂಡರ್', 'ಅಡುಗೆ ಅನಿಲ',
  ],
  poor: [
    'poor', 'bpl', 'below poverty', 'low income', 'low-income', 'no income', 'unemployed',
    'गरीब', 'बीपीएल', 'कम आय',
    'ಬಡ', 'ಬಿಪಿಎಲ್', 'ಕಡಿಮೆ ಆದಾಯ',
  ],
  karnataka: [
    'karnataka', 'udupi', 'bengaluru', 'bangalore', 'mangaluru', 'mangalore', 'mysuru', 'mysore', 'hubli',
    'dharwad', 'belagavi', 'shivamogga',
    'कर्नाटक', 'उडुपी', 'बेंगलुरु',
    'ಕರ್ನಾಟಕ', 'ಉಡುಪಿ', 'ಬೆಂಗಳೂರು', 'ಮಂಗಳೂರು', 'ಮೈಸೂರು',
  ],
}

// Latin keywords match at the start of a word (so "agricultur" matches "agriculture");
// Hindi and Kannada keywords are matched as plain substrings.
const compiled = Object.fromEntries(
  Object.entries(KEYWORDS).map(([profile, list]) => [
    profile,
    list.map((w) => (/^[a-z0-9 -]+$/.test(w) ? new RegExp('\\b' + w.replace(/[-\s]+/g, '[-\\s]+')) : w)),
  ]),
)

const hit = (text, m) => (typeof m === 'string' ? text.includes(m) : m.test(text))

export function detectProfiles(raw) {
  const text = String(raw || '').toLowerCase()
  const found = new Set()
  for (const [profile, list] of Object.entries(compiled)) {
    if (list.some((m) => hit(text, m))) found.add(profile)
  }
  // "68 years", "68 साल", "ವಯಸ್ಸು 68", "aged 68"
  const ages = [
    ...[...text.matchAll(/(\d{2,3})\s*(?:years?|yrs?|y\/o|वर्ष|साल|ವರ್ಷ)/g)].map((m) => Number(m[1])),
    ...[...text.matchAll(/(?:\bage\b|\baged\b|\bam\b|\bis\b|उम्र|आयु|ವಯಸ್ಸು)\s*(\d{2,3})\b/g)].map((m) => Number(m[1])),
  ]
  if (ages.some((a) => a >= 60 && a <= 110)) found.add('senior')
  return found
}

export function matchSchemes(text, limit = 4) {
  const profiles = detectProfiles(text)
  const results = []
  SCHEMES.forEach((scheme, idx) => {
    if (scheme.needs && !profiles.has(scheme.needs)) return
    let score = 0
    const whyProfiles = []
    for (const [profile, weight] of Object.entries(scheme.weights)) {
      if (profiles.has(profile)) {
        score += weight
        whyProfiles.push(profile)
      }
    }
    if (score >= 2) results.push({ id: scheme.id, score, idx, whyProfiles })
  })
  results.sort((a, b) => b.score - a.score || a.idx - b.idx)
  return results.slice(0, limit).map(({ id, whyProfiles }) => ({ id, whyProfiles }))
}
