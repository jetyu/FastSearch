![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)
## All Search Plus

> 全搜增强版，搜索引擎快捷跳转，支持任意网站展示

**All Search Plus** 是基于 [All Search / 全搜](https://github.com/all-search/all-search) 进行二次修改的增强版本，由本仓库独立维护。在原有搜索引擎快捷跳转功能基础上，增加了脚本内网址管理、整份配置备份与恢复、新标签页打开设置，并调整了内置网址和 AI 搜索入口。感谢原作者 endday 及上游贡献者的开源工作。

一个让你可以方便地在各个搜索引擎之间跳转的顶部固定菜单，基于 Vue 3，使用 Vite 构建。

感谢searchEngineJump提供的创意和网址来源。
同类工具推荐：
[搜索酱 功能最强，瑞士军刀](https://greasyfork.org/zh-CN/scripts/445274-searchjumper)
[searchEngineJump 搜索引擎快捷跳转 用户最多](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

#### 有什么需求、建议、问题直接提 Issues。<br>做这个脚本纯粹是个人兴趣，用爱发电。<br>开源不易，多多鼓励，如果觉得还不错，就去 Github 点个⭐ Star 鼓励一下, 或者把脚本分享给身边的人。

## GM 用户脚本说明与安装地址

All Search Plus 是一款用于油猴（Tampermonkey）或脚本猫（ScriptCat）的搜索辅助脚本。在搜索结果页面中，通过快捷菜单切换搜索引擎，复用当前关键词；也可以选中文字后使用划词工具栏或搜索弹窗发起搜索。增强版支持脚本内网址管理、自定义分类与排序、整份配置备份与恢复，以及新标签页打开设置，并修复了部分已知 Bug。

### All Search Plus 安装入口

* [Greasy Fork 安装页（推荐）](https://greasyfork.org/zh-CN/scripts/595932-all-search-plus-%E5%85%A8%E6%90%9C%E5%A2%9E%E5%BC%BA%E7%89%88-%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E5%BF%AB%E6%8D%B7%E8%B7%B3%E8%BD%AC-%E6%94%AF%E6%8C%81%E4%BB%BB%E6%84%8F%E7%BD%91%E7%AB%99%E5%B1%95%E7%A4%BA)
* [GitHub 构建脚本：output/index.user.js](./output/index.user.js)

1. 在浏览器中安装并启用油猴或脚本猫扩展。
2. 推荐打开上方 Greasy Fork 安装页，点击 **安装此脚本**，然后在脚本管理器中确认安装。以后发布的新版本会由 Greasy Fork 自动检查更新。
3. 也可以打开 GitHub 构建脚本，在文件页面点击 **Raw** 安装；如果没有弹出安装页面，可在脚本管理器中新建脚本，将完整文件内容（包含开头的 `// ==UserScript==` 元信息）复制进去并保存、启用。
4. 刷新搜索结果页面，即可使用全搜菜单。通过 **设置 → 网址管理 → 打开** 管理搜索入口；通过 **设置 → 配置备份** 导入或导出整份配置。

同一时间只启用一个全搜版本，避免菜单重复。增强版只使用统一的 `@name`：`All Search Plus (全搜增强版，搜索引擎快捷跳转，支持任意网站展示)`，不再设置 `@name:zh-CN`；`@namespace` 保持为 `all-search-plus`。主页与反馈地址指向本仓库。通过 GitHub 安装时，`@downloadURL` 和 `@updateURL` 指向本仓库 `master` 分支下的 `output/index.user.js`；更新前需将新构建的脚本发布到该分支。

通过 Greasy Fork 发布并安装时，平台会移除脚本中自带的更新地址，让脚本从 Greasy Fork 获取更新，详见 [Greasy Fork 元信息说明](https://greasyfork.org/zh-CN/help/meta-keys)。

### 原项目 all-search 地址

以下为原版 all-search 的发布入口。安装本仓库的增强版，请使用上方 **All Search Plus 安装入口**。

* [GitHub 地址](https://raw.github.com/all-search/all-search/release/index.user.js)
* [iQDNS/iQZone 地址](https://raw.iqiq.io/all-search/all-search/release/index.user.js)
* [KGitHub 地址](https://raw.kgithub.com/all-search/all-search/release/index.user.js)

#### Greasy Fork
* [greasyfork地址](https://greasyfork.org/zh-CN/scripts/397993-all-search)

#### 脚本猫
* [脚本猫ScriptCat地址](https://scriptcat.org/script-show-page/477)

## 设置入口

在网页内全搜菜单点击 **设置 → 网址管理 → 打开**，进入脚本内的配置对话框。
在对话框内切换“配置”“编辑”“划词工具栏”三个 Tab。
没有显示全搜菜单时，可在油猴 / 脚本猫菜单中选择 **全搜：网址管理**。

对话框参照原配置网站，提供三个 Tab：

| Tab | 对应原页面 | 功能 |
| --- | --- | --- |
| 配置 | `/config/sites` | 横向分类标签、分类改名 / 排序 / 显隐、网址列表、拖拽排序、图标设置、添加到常用分类 |
| 编辑 | `/config/edit` | 原版 JSONEditor，提供代码、树形、预览模式及校验 |
| 划词工具栏 | `/config/toolbar` | 编辑划词搜索入口、拖拽排序、显示隐藏 |

“配置”和“编辑”共享菜单草稿；“划词工具栏”单独编辑和保存。所有页面都在脚本内运行，不需要部署或打开 GitHub 配置网站。

各 Tab 底部仅保留 **取消 / 保存**。取消会恢复到上次保存的内容；“配置”和“编辑”的菜单草稿会一起恢复，划词工具栏的草稿独立处理。

“编辑”页的 JSON 编辑器上方提供 **清除网址管理配置**。确认后立即删除已保存的自定义菜单配置及当前菜单草稿，恢复脚本内置网址，同步更新“配置”和“编辑”页，无需再点保存。划词工具栏、其他设置和图标缓存独立保留。需要保留自定义配置时，可先导出整份备份。

### 内置网址更新（1.5.20）

* 删除火山翻译、AcFun、niconico、苏宁、值得买、当当网、豆丁文档、爱问知识，以及默认的“常用”分类。
* 新增视频分类的抖音（`https://www.douyin.com/search/%s?type=video`），购物分类的闲鱼、唯品会、AliExpress、亚马逊（全球）和 eBay，社交分类的 SOV2EX 和小红书。`%s` 代表搜索关键词。
* 开发分类新增 npm、PyPI、Docker Hub、Hugging Face 和 Maven Central，并将误标为 W3C 的菜鸟教程入口改正。
* 新增高德地图、百度地图、谷歌地图组成的“地图”分类；更新后内置菜单共 14 个分类、98 个网址入口。
* 所有实际内置入口均改用 HTTPS 并包含至少一个 `%s`；同一网址中的多个 `%s` 现在都会替换为当前搜索词。
* 划词工具栏默认入口依次为 Google、百度、Google翻译、ChatGPT。

安装新版脚本并刷新页面后，未保存过自定义菜单的用户会直接使用新版内置网址。已有自定义配置时，仍优先使用已保存的内容；要完整采用新版内置列表，先导出备份，再进入 **网址管理 → 编辑 → 清除网址管理配置** 并确认。需要保留自定义网址时，可在“配置”中逐项修改后保存。

### AI 分类

AI 分类位于“搜索”之后，共 5 个入口，所有入口都会带入当前搜索词。

以下入口使用传词链接：

| AI | 网址模板 | 核对来源 |
| --- | --- | --- |
| ChatGPT | `https://chatgpt.com/?q=%s` | [OpenAI 社区的参数使用记录](https://community.openai.com/t/query-parameters-in-chatgpt/1027747) |
| Grok | `https://grok.com/?q=%s` | [原始研究中的链接说明](https://www.gabriel.urdhr.fr/2026/07/17/reprompt-lechat-grok/) |
| Deepseek | `https://chat.deepseek.com/?q=%s` | [官方页面](https://chat.deepseek.com/)引用的[前端脚本](https://fe-static.deepseek.com/chat/static/main.9199a2404f.js)会读取 `q` 或 `prompt` |
| Perplexity | `https://www.perplexity.ai/search?q=%s` | [官方 OpenSearch 描述](https://www.perplexity.ai/opensearch.xml) |
| Claude | `https://claude.ai/new?q=%s` | [Oasis 对网页预填参数的研究](https://www.oasis.security/blog/claude-ai-prompt-injection-data-exfiltration-vulnerability) |

`%s` 替换为经过 URL 编码的当前搜索词。链接传词不等于自动发送，登录、预填及发送确认由目标网站处理。

Gemini、豆包、千问、Kimi 和智谱清言因入口不含 `%s` 搜索占位符而移除。所有 AI 链接沿用“新标签页打开”设置。文心和腾讯元宝也已移除。

### 整份配置备份

在网页内 **设置 → 配置备份** 中使用 **导出 / 导入**：

* **导出**：下载 `all-search-backup-日期.json`，包含已保存的菜单网址、划词工具栏、全部设置（新标签页打开、布局、颜色等）和图标缓存。未保存的草稿不包含在备份中，请先保存再导出。
* **导入**：选择整份 JSON 备份，校验通过后确认覆盖全部配置，完成后自动刷新页面生效。写入失败时会尝试恢复原配置，并显示结果。
* 旧的单独网址数组不是整份备份；可将其粘贴到网址管理的“编辑”Tab 中，检查后保存。

## 特色功能
* 脚本内图形界面添加网址，三个 Tab 管理搜索菜单、JSON 配置和划词工具栏
* 拖动调整网址顺序，通过左右按钮调整分类顺序
* 支持垂直和横向布局
* 点击分类使用分类第一个地址打开
* 在网页内的“设置”侧栏开启“新标签页打开”，普通点击菜单、分类和搜索弹窗中的网址即可在新标签页打开；默认关闭，修改即时生效并自动保存
* 鼠标中键或 Ctrl + 鼠标左键点击菜单、分类和搜索弹窗中的网址，可以强制在新标签页打开
* 提供移动端支持
    * 若页面宽度不足，可以进行滚动，
    * 移动端为点击触发菜单
* 自动隐藏功能，通过按钮触发，亦可更改为向上或向下滚动触发隐藏
* 新添加的网址支持自动加载（即用户自行添加的，都可以自动展示）
* 自适应样式，无需要额外适配
* 文字选中工具栏
* 全局弹窗搜索

## 待完成
* 英语支持
* 快捷键唤起全局弹窗搜索（待定）
* 谷歌插件化（待定）

## 兼容和性能
* 针对百度样式问题，没有使用损耗性能的定时器，采用劫持Node.prototype.removeChild来实现
* 针对youtube的spf.js的路由切换进行监听
* 与AC-baidu等主流油猴脚本无兼容问题

## 贡献

#### 本地开发

项目使用 `package.json` 指定的 pnpm 8.15.1。本次本地验证环境为 Node.js 22.22.1、pnpm 8.15.1。

在仓库根目录安装依赖：

```sh
corepack pnpm install --frozen-lockfile
```

开发独立的菜单配置网站：

```sh
corepack pnpm dev:site
```

访问终端显示的本地地址下的 `/all-search/`。独立配置网站仍然保留；日常管理网址可直接使用脚本内对话框。“新标签页打开”位于搜索页面内全搜菜单的“设置”侧栏。

开发油猴脚本：

```sh
corepack pnpm dev:script
```

脚本开发模式由 `vite-plugin-monkey` 提供。仅需手动验证改动时，可以按下面的步骤构建并安装脚本，无需保持开发服务器运行。

#### 构建油猴脚本

```sh
corepack pnpm build:script
```

生成可安装的脚本：[`output/index.user.js`](./output/index.user.js)。每次构建都会更新这个文件。脚本版本号来自 `package.json`；正式发布新版本时需要更新版本号。

独立配置网站的构建命令为 `corepack pnpm build:site`，输出到 `dist/`。油猴脚本单独输出到 `output/`，两种构建互不覆盖。

#### 浏览器手动测试

1. 在油猴或脚本猫的脚本编辑器中打开已有的全搜脚本；首次安装时新建一个脚本。
2. 将 `output/index.user.js` 的完整内容（包含开头的 `// ==UserScript==` 元信息）复制到编辑器，替换原内容并保存、启用。同一时间只启用一个全搜版本。
3. 打开或刷新百度、必应等搜索结果页面，在全搜菜单右侧点击“设置”。
4. 找到“新标签页打开”，切换“开启 / 关闭”。此设置自动保存，无需额外点击保存。
5. 按下表验证。打开搜索弹窗的方法是：选中页面文字，在划词工具栏中点击“更多”图标。

| 测试场景 | 预期结果 |
| --- | --- |
| 尚未保存过该设置 | 默认选中“关闭” |
| 关闭时，普通点击菜单网址或搜索弹窗中的网址 | 在当前标签页打开 |
| 开启时，普通点击菜单网址或搜索弹窗中的网址 | 在新标签页打开，原页面保留 |
| 开启时，点击包含其他搜索引擎的分类标题 | 在新标签页执行搜索 |
| 开启后立即关闭，再普通点击网址 | 恢复在当前标签页打开 |
| 开启或关闭时，Ctrl + 左键或鼠标中键点击菜单、分类或弹窗网址 | 始终在新标签页打开 |
| 修改开关后刷新页面，或重新打开搜索结果页面 | 保留已保存的设置 |
| 普通点击划词工具栏中的搜索图标 | 沿用原有行为，在新标签页打开 |

每次修改源码后，重新执行 `corepack pnpm build:script`，更新脚本管理器中的代码，并刷新待测页面。

#### 网址管理对话框测试（1.5.20）

1. 安装 `output/index.user.js`，刷新搜索结果页，打开“设置 → 网址管理 → 打开”，确认标题显示 `1.5.20`，有“配置 / 编辑 / 划词工具栏”三个 Tab，各 Tab 底部只有“取消 / 保存”。
2. 在“配置”中改名、新增或删除分类 / 网址。网址以 `%s` 代表关键词。拖动左侧手柄排序，也可聚焦手柄后按上下方向键。
3. 切换到“编辑”，确认图形界面的修改出现在 JSON 中。可以在代码 / 树形 / 预览模式间切换；有效 JSON 修改切回“配置”后会同步。JSON 无效时提示错误，保留原草稿。
4. 点击“保存”，看到“保存成功，当前页面已生效”后，当前菜单立即更新。刷新后配置保留；其他已打开页面需要刷新。
5. “划词工具栏”单独保存，不会同时保存搜索菜单的草稿。点击“取消”会恢复当前范围上次保存的内容，另一个范围的草稿保留；关闭对话框时，有未保存的修改会提示是否放弃。
6. 在“编辑”中输入无效 JSON 后点击“取消”，确认恢复已保存的菜单，也能切回“配置”。
7. 关闭对话框，在“设置 → 配置备份”中导出 JSON，确认文件同时包含 `sites`、`toolbar`、`settings` 和 `iconCache`。修改并保存配置后，导入该备份，确认覆盖后页面自动刷新、整份配置恢复。
8. 在“编辑”中点击“清除网址管理配置”，先取消确认，检查原配置和草稿保留；再次点击并确认，检查菜单及编辑器恢复内置网址，刷新后仍使用内置网址，划词工具栏和其他设置保留。

继续使用原有的 `__allSearch__sites` 和 `__allSearch__toolbar` 存储，保留已有配置。旧 JSON 中没有 `data.visible` 时默认显示；保存空列表 `[]` 后刷新仍为空，可通过脚本管理器菜单重新进入管理。
写入失败或发现其他页面已修改配置时会显示错误，保留草稿；发现其他页面的修改时，先复制保留需要的草稿内容，再关闭并重新打开网址管理。

自动检查：

```sh
corepack pnpm test
corepack pnpm build:script
# 首次运行浏览器测试时安装测试用 Chromium：
corepack pnpm exec cross-env PLAYWRIGHT_BROWSERS_PATH=./node_modules/.cache/ms-playwright playwright install chromium --only-shell
corepack pnpm test:browser
```

浏览器测试运行生成的脚本，使用模拟 GM 存储，覆盖三个 Tab、JSON 模式、草稿同步、拖拽、保存 / 取消、整份备份恢复、导入失败回退及移动端布局。实际油猴 / 脚本猫环境仍需按上述步骤手动验证。

## 来源与许可

本版基于 [all-search/all-search](https://github.com/all-search/all-search) 二次修改，保留上游归属说明，并沿用 **GPL-3.0-only** 许可证，完整条款见 [LICENSE](./LICENSE)。本版问题请提交到 [jetyu/all-search_plus Issues](https://github.com/jetyu/all-search_plus/issues)。
