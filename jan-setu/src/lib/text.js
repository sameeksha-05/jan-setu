// Pick the right language from a { en, hi, kn } object. Plain strings (e.g. from a backend) pass through.
export const pick = (value, lang) => {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.en || ''
}
