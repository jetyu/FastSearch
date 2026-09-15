![all-search](https://socialify.git.ci/all-search/all-search/image?description=1&font=Inter&forks=1&issues=1&language=1&owner=1&pattern=Plus&stargazers=1&theme=Light)

[English](./README.md) | [简体中文](./README.zh-CN.md)
## all-search 全搜，一个搜索引擎快捷跳转菜单

一个让你可以方便地在各个搜索引擎之间跳转的顶部固定菜单，基于 Vue 3，使用 Vite 构建。

感谢searchEngineJump提供的创意和网址来源。
同类工具推荐：
[搜索酱 功能最强，瑞士军刀](https://greasyfork.org/zh-CN/scripts/445274-searchjumper)
[searchEngineJump 搜索引擎快捷跳转 用户最多](https://greasyfork.org/zh-CN/scripts/2739-search-enginejump)

#### 有什么需求、建议、问题直接提 Issues。<br>做这个脚本纯粹是个人兴趣，用爱发电。<br>开源不易，多多鼓励，如果觉得还不错，就去 Github 点个⭐ Star 鼓励一下, 或者把脚本分享给身边的人。

## 脚本地址
油猴和脚本猫的脚本差异已经抹平
* [GitHub 地址](https://raw.github.com/all-search/all-search/release/index.user.js)
* [iQDNS/iQZone 地址](https://raw.iqiq.io/all-search/all-search/release/index.user.js)
* [KGitHub 地址](https://raw.kgithub.com/all-search/all-search/release/index.user.js)

### greasyFork
* [greasyfork地址](https://greasyfork.org/zh-CN/scripts/397993-all-search)

### 脚本猫
* [脚本猫ScriptCat地址](https://scriptcat.org/script-show-page/477)

## 设置地址
* [码云](https://endday.gitee.io/all-search/)
* [github](https://all-search.github.io/all-search/)

## 特色功能
* [图形界面添加网址](https://all-search.github.io/all-search/)
* 拖动改变分类排序
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

访问终端显示的本地地址下的 `/all-search/`。该网站用于编辑网址和划词工具栏；“新标签页打开”位于搜索页面内全搜菜单的“设置”侧栏。

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

#### 反馈与交流
[腾讯频道](https://pd.qq.com/s/2bmefcl98)

频道号 pd15449687
