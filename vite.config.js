import { defineConfig } from 'vite'
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import crx from 'vite-plugin-crx-mv3'
import externalGlobals from 'rollup-plugin-external-globals'
import monkey from 'vite-plugin-monkey'
import scriptConfig from './src/config/script-config'

export default defineConfig(({ mode }) => {
  if (mode === 'plugin' || process.env.FASTSEARCH_TARGET === 'chrome') {
    const outDir = 'extension-dist'
    return {
      resolve: {
        alias: {
          '$': resolve(process.cwd(), 'src/platform/chrome.mjs')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue(),
        crx({
          manifest: './src/manifest.json'
        }),
        {
          name: 'finalize-chrome-extension',
          closeBundle () {
            mkdirSync(outDir, { recursive: true })
            copyFileSync('LICENSE', `${outDir}/LICENSE`)

            // vite-plugin-crx-mv3 0.1.x mistakes Vue's SVG namespace for
            // a packaged asset URL. Restore the platform namespace and remove
            // the invalid manifest resource until the build plugin is replaced.
            const pending = [outDir]
            while (pending.length) {
              const directory = pending.pop()
              for (const entry of readdirSync(directory, { withFileTypes: true })) {
                const path = `${directory}/${entry.name}`
                if (entry.isDirectory()) pending.push(path)
                else if (entry.name.endsWith('.js')) {
                  const code = readFileSync(path, 'utf8')
                  const fixed = code.replaceAll(
                    'chrome.runtime.getURL("http://www.w3.org/2000/svg")',
                    '"http://www.w3.org/2000/svg"'
                  )
                  if (fixed !== code) writeFileSync(path, fixed)
                }
              }
            }
            const manifestPath = `${outDir}/manifest.json`
            const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
            manifest.web_accessible_resources = (manifest.web_accessible_resources || [])
              .map(item => ({
                ...item,
                resources: item.resources.filter(resource => resource !== 'http://www.w3.org/2000/svg')
              }))
              .filter(item => item.resources.length)
            writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
          }
        }
      ],
      build: {
        outDir,
        target: 'es2015',
        emptyOutDir: true,
        minify: 'esbuild'
      }
    }
  } else if (mode === 'script') {
    return {
      build: {
        outDir: 'output',
        // vite-plugin-monkey defaults userscript builds to unminified output.
        // Keep the metadata block readable while minifying the bundled code.
        minify: 'esbuild'
      },
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue(),
        monkey({
          entry: 'src/content-scripts/main.js',
          userscript: scriptConfig,
          build: {
            fileName: 'index.user.js',
            externalGlobals: {
              vue: ['Vue', () => `https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js`],
              '@popperjs/core': ['Popper', () => `https://registry.npmmirror.com/@popperjs/core/2.11.8/files/dist/umd/popper-lite.min.js`],
              // JSONEditor accounts for most of the bundle. Pin the CDN version so
              // userscript managers cache and execute the same reviewed build.
              jsoneditor: ['JSONEditor', () => `https://cdn.jsdelivr.net/npm/jsoneditor@9.10.5/dist/jsoneditor.min.js`]
            },
            cssSideEffects: () => {
              return (e) => {
                if (typeof window.GM_addStyle == 'function') {
                  window.GM_addStyle(e)
                  return
                }
                const styleNode = document.querySelector('#as-style-common')
                if (styleNode) {
                  styleNode.styleSheet.cssText += e
                } else {
                  const o = document.createElement('style')
                  o.classList.add('as-style')
                  o.id = 'as-style-common'
                  o.textContent = e
                  document.head.append(o)
                }
              }
            }
          }
        })
      ]
    }
  } else if (mode === 'site') {
    return {
      base: '/fast-search',
      outputDir: 'dist/',
      resolve: {
        alias: {
          '$': 'vite-plugin-monkey/dist/client'
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      },
      plugins: [
        vue()
      ],
      build: {
        rollupOptions: {
          plugins: [
            externalGlobals({
              vue: 'Vue',
              jsoneditor: 'JSONEditor',
              'element-plus': 'ElementPlus',
              '@element-plus/icons-vue': 'ElementPlusIconsVue'
            })
          ]
        }
      }
    }
  }
})
