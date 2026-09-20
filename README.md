[English](./README.md) | [简体中文](./README.zh-CN.md)

## Fast Search

> Quick search engine switching with support for displaying the menu on any website.

**Fast Search** is a search helper for Chrome, Tampermonkey and ScriptCat. It provides a fixed search menu, text-selection tools, global search, in-page URL management and configuration backup. It is based on Vue 3 and built with Vite.

Thanks to searchEngineJump for the idea and URL source.
Similar tools recommended.
[searchJumper Most powerful, Swiss army knife](https://greasyfork.org/zh-CN/scripts/445274-searchjumper)
[searchEngineJump Search engine quick jump Most users](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

#### Any needs, suggestions, question directly to Issues.<br>Doing this script is purely a personal interest, using love to generate electricity.<br>It's not easy to open source, so please encourage me, if you think it's good, go to GitHub and give it a ⭐ Star, or share it with people around you.

## GM userscript overview and installation

Switch search engines from a quick menu while reusing the current query, or select text to search using the selection toolbar or search popup. The script supports in-script URL management, custom categories and sorting, full configuration backup and restore, a new-tab preference, and automatic, dark, or light appearance modes.

### Install the Fast Search userscript

- [Greasy Fork installation page (recommended)](https://greasyfork.org/zh-CN/scripts/595932)
- [GitHub build: output/index.user.js](./output/index.user.js)

1. Install and enable the Tampermonkey or ScriptCat browser extension.
2. For the recommended method, open the Greasy Fork page above, click **Install this script**, and confirm the installation in your userscript manager. Future releases published there will be checked for updates automatically.
3. Alternatively, open the GitHub build and click **Raw**. If no installation page appears, create a new script in your userscript manager, replace the default contents with the complete file (including the opening `// ==UserScript==` metadata), then save and enable it.
4. Refresh a search results page to use the menu. Open **Settings → URL management → Open** to manage search entries, or **Settings → Configuration backup** to import or export the full configuration.

The script uses the `@name` value `Fast Search` and keeps the `fast-search` namespace for compatibility with existing installations and settings. The support link points to this repository. For GitHub installations, `@downloadURL` and `@updateURL` point to `output/index.user.js` on this repository's `master` branch. Publish the newly built script to that branch to make an update available.

### Install the Chrome extension

Run `corepack pnpm build:chrome`, open `chrome://extensions/`, enable Developer mode, choose **Load unpacked**, and select `extension-dist/`. Click the Fast Search toolbar icon or press `Ctrl+Shift+K` (`Command+Shift+K` on macOS) to open the search dialog.

The Chrome build stores settings in `chrome.storage.local`. Use configuration backup export/import to migrate settings between the userscript and the extension.

When a script is published and installed through Greasy Fork, the platform removes its embedded update URLs so it receives updates from Greasy Fork. See the [Greasy Fork metadata documentation](https://greasyfork.org/en/help/meta-keys).

## Settings

Open **设置 → 网址管理 → 打开** in the search menu. The dialog contains Configuration, JSON Editor and Selection Toolbar tabs. Configuration and Editor share a menu draft; the selection toolbar is saved separately. Each tab provides Save and Cancel buttons.

Use **设置 → 配置备份** for complete JSON backups. Use **网址管理 → 编辑 → 清除网址管理配置** to restore the built-in menu after confirmation. If the menu is unavailable, open **Fast Search：网址管理** from your userscript manager's menu. Everyday settings work inside the script without a separate configuration website.

### Built-in sites in 1.5.21

Version 1.5.21 removes the requested legacy sites and the default empty Personal category; adds Douyin, Xianyu, Vipshop, global Amazon, eBay, SOV2EX and Xiaohongshu; expands the Developer category; merges AI assistants into Search; and adds a Map category. The Drive category now contains Baidu Netdisk, PanSearch and Xiaokupan, News adds People.cn, CCTV, The Paper and China News, and Knowledge adds Baike.com. The catalog contains 13 categories and 87 entries.

The Search category includes 5 AI assistants, and every entry uses a query link: ChatGPT, Grok, Deepseek, Perplexity and Claude. Gemini, Doubao, Qianwen, Kimi and Zhipu Qingyan are removed because their entries did not include a `%s` search placeholder. All AI entries follow the new-tab preference. Wenxin and Tencent Yuanbao are also removed. The Developer category now includes Docker Hub, Hugging Face and Maven Central, while the Map category includes Amap, Baidu Maps and Google Maps. See the [Chinese README](./README.zh-CN.md#ai-搜索入口) for exact AI URLs and sources.

Every built-in site now uses HTTPS and contains at least one `%s` search placeholder. URLs with repeated placeholders are fully expanded with the encoded query.

The default selection toolbar contains Google, Baidu, Google Translate and ChatGPT, in that order.

Query links pass URL-encoded search text. Login and confirmation before sending are controlled by each destination. Existing saved menus take precedence over built-in defaults: export a backup and clear the custom menu to adopt the new catalog in full, or edit individual entries to retain your customizations.

## Features

- In-script URL management and complete configuration backup/restore
- Drag to change category sorting
- Support vertical and horizontal layout
- Click on a category to use the first URL of the category to open it
- A new-tab preference, plus middle-click or Ctrl + left-click to open a new tab
- Automatic, dark and light appearance modes; automatic mode follows the operating-system color scheme
- Provide mobile support
  - Scrolling is possible if the page width is insufficient
  - Mobile for click-triggered menu
- Auto-hide function, triggered by button, can also be changed to scroll up or down to trigger hide
- Auto-loading support for newly added URLs (i.e., those added by the user, can be displayed automatically)
- Adaptive style, no additional adaptations required
- Text selection toolbar
- Global pop-up search

## Todo list

- English support
- Shortcut open global pop-up search (TBD)
- Google Pluginization (TBD)

## Compatibility and Performance

- For Baidu style issues, instead of using performance-depleting timers, use hijacked Node.prototype.removeChild to achieve
- Listening for route switching for youtube's spf.js
- no compatibility issues with AC-baidu and other mainstream Tampermonkey scripts

## Contribute

#### Local development

Use pnpm 8.15.1 as specified in `package.json`:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev:script
```

Use `corepack pnpm dev:site` to develop the optional standalone configuration website. Run unit checks with `corepack pnpm test`; browser setup and manual test steps are documented in the [Chinese README](./README.zh-CN.md).

#### build scripts

The version number of the script references the version number in package.json, remember to modify

```
corepack pnpm build:script
```

Generates [`output/index.user.js`](./output/index.user.js) for Tampermonkey, replacing it on each build. The configuration website builds to `dist/` with `corepack pnpm build:site`, so the two outputs stay separate.

Build the Chrome Manifest V3 extension with `corepack pnpm build:chrome`. The unpacked extension is written to `extension-dist/`; all executable code is bundled locally rather than loaded from a CDN.

## Attribution and license

This script is released under the **GPL-3.0-only** license. See [LICENSE](./LICENSE) for the full terms. Report issues in [jetyu/FastSearch Issues](https://github.com/jetyu/FastSearch/issues).
