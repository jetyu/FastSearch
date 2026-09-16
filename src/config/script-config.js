import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import pkg from '../../package.json'

const fileName = 'index.user.js'
const scriptUrl = `https://raw.githubusercontent.com/jetyu/all-search_plus/master/output/${fileName}`
const iconBase64 = readFileSync(resolve(process.cwd(), 'src/assets/all-search.svg')).toString('base64')

export default {
  name: pkg.displayName,
  namespace: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  icon: `data:image/svg+xml;base64,${iconBase64}`,
  // Prevent vite-plugin-monkey from adding homepage aliases from package.json.
  homepage: null,
  homepageURL: null,
  supportURL: pkg.bugs.url,
  updateURL: scriptUrl,
  downloadURL: scriptUrl,
  match: ['*://*/*'],
  noframes: true,
  'run-at': 'document-idle'
}
