// Vérifie que toutes les langues ont exactement les clés de fr.json (source),
// les mêmes placeholders {x}, et aucun caractère interprété par vue-i18n (@ { } |).
// Usage : pnpm check:i18n
import { readdirSync, readFileSync } from 'node:fs'

const dir = new URL('../i18n/locales/', import.meta.url)
const load = file => JSON.parse(readFileSync(new URL(file, dir), 'utf8'))
const flatten = (obj, prefix = '') => Object.entries(obj).flatMap(([k, v]) =>
  v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]])
const placeholders = s => (s.match(/\{\w+\}/g) ?? []).sort().join()

const source = new Map(flatten(load('fr.json')))
const errors = []

for (const file of readdirSync(dir).filter(f => f.endsWith('.json'))) {
  const target = new Map(flatten(load(file)))
  for (const [key, value] of source) {
    const t = target.get(key)
    if (t === undefined) errors.push(`${file}: clé manquante ${key}`)
    if (typeof value !== 'string' || typeof t !== 'string') continue
    if (placeholders(value) !== placeholders(t)) errors.push(`${file}: placeholders différents ${key}`)
    if (/[@|]/.test(t) || /[{}]/.test(t.replace(/\{\w+\}/g, ''))) errors.push(`${file}: caractère @ { } | interdit ${key}`)
  }
  for (const key of target.keys()) if (!source.has(key)) errors.push(`${file}: clé en trop ${key}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log('i18n OK')
