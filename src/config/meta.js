import path from 'path'
import pkg from '../../package.json'

const fileName = 'index.user.js'
export const localFileName = 'index.local.js'
export const devFileName = 'index.dev.js'
const scriptUrl = `https://raw.githubusercontent.com/jetyu/FastSearch/master/output/${fileName}`

const meta = `// @name         ${pkg.displayName}
// @namespace    ${pkg.name}
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @license      ${pkg.license}
// @homepage     ${pkg.homepage}
// @homepageURL  ${pkg.homepage}
// @updateURL    ${scriptUrl}
// @downloadURL  ${scriptUrl}
// @supportURL   ${pkg.bugs.url}
// @noframes
// @include      *
// @require      https://unpkg.com/vue@3.3.4/dist/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper-lite.min.js
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
`

export const proMeta = `// ==UserScript==
${meta}
// ==/UserScript==
`

export const devMeta = `// ==UserScript==
${meta}
// @require      file:///${path.join(__dirname, `/dist/${localFileName}`)}
// ==/UserScript==
`
