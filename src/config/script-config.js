import pkg from '../../package.json'

const fileName = 'index.user.js'
const scriptUrl = `https://raw.githubusercontent.com/jetyu/all-search_mod/master/output/${fileName}`

export default {
  name: {
    '': pkg.displayName,
    'zh-CN': '全搜增强版'
  },
  namespace: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  license: pkg.license,
  homepage: pkg.homepage,
  homepageURL: pkg.homepage,
  supportURL: pkg.bugs.url,
  updateURL: scriptUrl,
  downloadURL: scriptUrl,
  match: ['*://*/*'],
  noframes: true,
  'run-at': 'document-idle'
}
