import pkg from '../../package.json'

const fileName = 'index.user.js'
const scriptUrl = `https://raw.githubusercontent.com/jetyu/all-search_plus/master/output/${fileName}`

export default {
  name: pkg.displayName,
  namespace: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  icon: 'https://raw.githubusercontent.com/jetyu/all-search_plus/master/src/assets/all-search.svg',
  homepage: pkg.homepage,
  homepageURL: pkg.homepage,
  supportURL: pkg.bugs.url,
  updateURL: scriptUrl,
  downloadURL: scriptUrl,
  match: ['*://*/*'],
  noframes: true,
  'run-at': 'document-idle'
}
