![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)
## All Search Plus

> An enhanced version of All Search with quick search engine switching and support for displaying the menu on any website.

**All Search Plus** is an independently maintained fork of [All Search](https://github.com/all-search/all-search), originally developed by endday and contributors. This version adds in-script URL management, complete configuration backups, a new-tab option, and a revised site catalog with AI search links. Thanks to the upstream author and contributors for their open-source work.

A top fixed menu that allows you to easily jump between search engines, based on Vue 3 and built using Vite.

Thanks to searchEngineJump for the idea and URL source.
Similar tools recommended.
[searchJumper Most powerful, Swiss army knife](https://greasyfork.org/zh-CN/scripts/445274-searchjumper)
[searchEngineJump Search engine quick jump Most users](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

#### Any needs, suggestions, question directly to Issues.<br>Doing this script is purely a personal interest, using love to generate electricity.<br>It's not easy to open source, so please encourage me, if you think it's good, go to GitHub and give it a ⭐ Star, or share it with people around you.

## GM userscript overview and installation

All Search Plus is a search helper userscript for Tampermonkey or ScriptCat. Switch search engines from a quick menu while reusing the current query, or select text to search using the selection toolbar or search popup. The enhanced version adds in-script URL management, custom categories and sorting, full configuration backup and restore, an option to open searches in a new tab, and fixes for some known bugs.

### Install All Search Plus

* [Greasy Fork installation page (recommended)](https://greasyfork.org/zh-CN/scripts/595932-all-search-plus-%E5%85%A8%E6%90%9C%E5%A2%9E%E5%BC%BA%E7%89%88-%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E5%BF%AB%E6%8D%B7%E8%B7%B3%E8%BD%AC-%E6%94%AF%E6%8C%81%E4%BB%BB%E6%84%8F%E7%BD%91%E7%AB%99%E5%B1%95%E7%A4%BA)
* [GitHub build: output/index.user.js](./output/index.user.js)

1. Install and enable the Tampermonkey or ScriptCat browser extension.
2. For the recommended method, open the Greasy Fork page above, click **Install this script**, and confirm the installation in your userscript manager. Future releases published there will be checked for updates automatically.
3. Alternatively, open the GitHub build and click **Raw**. If no installation page appears, create a new script in your userscript manager, replace the default contents with the complete file (including the opening `// ==UserScript==` metadata), then save and enable it.
4. Refresh a search results page to use the menu. Open **Settings → URL management → Open** to manage search entries, or **Settings → Configuration backup** to import or export the full configuration.

Enable only one all-search version at a time to avoid duplicate menus. The enhanced version uses the single `@name` value `All Search Plus (全搜增强版，搜索引擎快捷跳转，支持任意网站展示)` and the `@namespace` value `all-search-plus`. Homepage and support links point to this repository. For GitHub installations, `@downloadURL` and `@updateURL` point to `output/index.user.js` on this repository's `master` branch. Publish the newly built script to that branch to make an update available.

When a script is published and installed through Greasy Fork, the platform removes its embedded update URLs so it receives updates from Greasy Fork. See the [Greasy Fork metadata documentation](https://greasyfork.org/en/help/meta-keys).

### Original all-search links

The following links are release sources for the original all-search project. To install this repository's enhanced version, use **Install All Search Plus** above.

* [GitHub URL](https://raw.github.com/all-search/all-search/release/index.user.js)
* [iQDNS/iQZone URL](https://raw.iqiq.io/all-search/all-search/release/index.user.js)
* [KGitHub URL](https://raw.kgithub.com/all-search/all-search/release/index.user.js)

#### Greasy Fork
* [greasyfork URL](https://greasyfork.org/zh-CN/scripts/397993-all-search)

#### ScriptCat
* [ScriptCat ScriptCat URL](https://scriptcat.org/script-show-page/477)

## Settings

Open **设置 → 网址管理 → 打开** in the search menu. The dialog contains Configuration, JSON Editor and Selection Toolbar tabs. Configuration and Editor share a menu draft; the selection toolbar is saved separately. Each tab provides Save and Cancel buttons.

Use **设置 → 配置备份** for complete JSON backups. Use **网址管理 → 编辑 → 清除网址管理配置** to restore the built-in menu after confirmation. If the menu is unavailable, open **全搜：网址管理** from your userscript manager's menu. Everyday settings work inside the script without a separate configuration website.

### Built-in sites in 1.5.21

This version removes the requested legacy sites and the default empty Personal category; adds Douyin, Xianyu, Vipshop, global Amazon, eBay, SOV2EX and Xiaohongshu; expands the Developer category; merges AI assistants into Search; and adds a Map category. The catalog contains 13 categories and 85 entries.

The Search category includes 5 AI assistants, and every entry uses a query link: ChatGPT, Grok, Deepseek, Perplexity and Claude. Gemini, Doubao, Qianwen, Kimi and Zhipu Qingyan are removed because their entries did not include a `%s` search placeholder. All AI entries follow the new-tab preference. Wenxin and Tencent Yuanbao are also removed. The Developer category now includes Docker Hub, Hugging Face and Maven Central, while the Map category includes Amap, Baidu Maps and Google Maps. See the [Chinese README](./README.zh-CN.md#ai-搜索入口) for exact AI URLs and sources.

Every built-in site now uses HTTPS and contains at least one `%s` search placeholder. URLs with repeated placeholders are fully expanded with the encoded query.

The default selection toolbar contains Google, Baidu, Google Translate and ChatGPT, in that order.

Query links pass URL-encoded search text. Login and confirmation before sending are controlled by each destination. Existing saved menus take precedence over built-in defaults: export a backup and clear the custom menu to adopt the new catalog in full, or edit individual entries to retain your customizations.

## Features
* In-script URL management and complete configuration backup/restore
* Drag to change category sorting
* Support vertical and horizontal layout
* Click on a category to use the first URL of the category to open it
* A new-tab preference, plus middle-click or Ctrl + left-click to open a new tab
* Provide mobile support
  * Scrolling is possible if the page width is insufficient
  * Mobile for click-triggered menu
* Auto-hide function, triggered by button, can also be changed to scroll up or down to trigger hide
* Auto-loading support for newly added URLs (i.e., those added by the user, can be displayed automatically)
* Adaptive style, no additional adaptations required
* Text selection toolbar
* Global pop-up search

## Todo list
* English support
* Shortcut open global pop-up search (TBD)
* Google Pluginization (TBD)

## Compatibility and Performance
* For Baidu style issues, instead of using performance-depleting timers, use hijacked Node.prototype.removeChild to achieve
* Listening for route switching for youtube's spf.js
* no compatibility issues with AC-baidu and other mainstream Tampermonkey scripts

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

## Attribution and license

This fork is based on [all-search/all-search](https://github.com/all-search/all-search) and retains its attribution and **GPL-3.0-only** license. See [LICENSE](./LICENSE) for the full terms. Report issues with this version in [jetyu/all-search_plus Issues](https://github.com/jetyu/all-search_plus/issues).

#### Upstream feedback and communication
[Tencent Channel](https://pd.qq.com/s/2bmefcl98)

Channel No. pd15449687
