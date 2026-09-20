// ==UserScript==
// @name         Fast Search
// @namespace    fast-search
// @version      1.6.0
// @author       jetyu
// @description  快速切换搜索引擎，支持划词搜索、全局搜索和自定义搜索入口
// @license      GPL-3.0-only
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4IiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGl0bGUgZGVzY3JpcHRpb24iPgogIDx0aXRsZSBpZD0idGl0bGUiPkZhc3QgU2VhcmNoPC90aXRsZT4KICA8ZGVzYyBpZD0iZGVzY3JpcHRpb24iPkEgc2ltcGxlIG1hZ25pZnlpbmcgZ2xhc3Mgd2l0aCBhIGZvcndhcmQgYXJyb3c8L2Rlc2M+CiAgPHJlY3QgeD0iNiIgeT0iNiIgd2lkdGg9IjExNiIgaGVpZ2h0PSIxMTYiIHJ4PSIyNyIgZmlsbD0iIzE2NzdGRiIvPgogIDxjaXJjbGUgY3g9IjQ5IiBjeT0iNDgiIHI9IjI1IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMTAiLz4KICA8cGF0aCBkPSJNNjcgNjZMOTcgOTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIxMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTM2IDQ4SDYyTTUzIDM5TDYyIDQ4TDUzIDU3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkQxNjYiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=
// @source       https://github.com/jetyu/FastSearch.git
// @supportURL   https://github.com/jetyu/FastSearch/issues
// @downloadURL  https://raw.githubusercontent.com/jetyu/FastSearch/master/output/index.user.js
// @updateURL    https://raw.githubusercontent.com/jetyu/FastSearch/master/output/index.user.js
// @match        *://*/*
// @require      https://registry.npmmirror.com/vue/3.4.15/files/dist/vue.global.prod.js
// @require      https://registry.npmmirror.com/@popperjs/core/2.11.8/files/dist/umd/popper-lite.min.js
// @require      https://cdn.jsdelivr.net/npm/jsoneditor@9.10.5/dist/jsoneditor.min.js
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @run-at       document-idle
// @noframes
// ==/UserScript==

(r=>{if(typeof window.GM_addStyle=="function"){window.GM_addStyle(r);return}const o=document.querySelector("#as-style-common");if(o)o.styleSheet.cssText+=r;else{const a=document.createElement("style");a.classList.add("as-style"),a.id="as-style-common",a.textContent=r,document.head.append(a)}})(' @charset "UTF-8";@media screen and (max-width: 750px){.as-title-horizontal{display:none}}.as-title-horizontal{width:32px;min-width:32px;height:30px;margin:0 4px}.as-title-vertical{width:100%;padding:8px 0}.as-title{display:flex;align-items:center;justify-content:center;text-decoration:none!important;box-sizing:border-box}.as-title-icon{display:block;width:22px;height:22px;border-radius:5px;cursor:pointer}.as-title-vertical .as-title-icon{width:32px;height:32px;border-radius:8px}:root{--as-text-color-secondary: #909399}.as-scrollbar{--as-scrollbar-opacity: .3;--as-scrollbar-background-color: var(--as-text-color-secondary);--as-scrollbar-hover-opacity: .5;--as-scrollbar-hover-background-color: var(--as-text-color-secondary);overflow:hidden;position:relative;height:100%}.as-scrollbar__wrap{overflow:auto;height:100%}.as-scrollbar__wrap--hidden-default{scrollbar-width:none}.as-scrollbar__wrap--hidden-default::-webkit-scrollbar{display:none}.as-scrollbar__thumb{position:relative;display:block;width:0;height:0;cursor:pointer;border-radius:inherit;background-color:var(--as-scrollbar-background-color, var(--as-text-color-secondary));transition:var(--as-transition-duration) background-color;opacity:var(--as-scrollbar-opacity, .3)}.as-scrollbar__thumb:hover{background-color:var(--as-scrollbar-hover-background-color, var(--as-text-color-secondary));opacity:var(--as-scrollbar-hover-opacity, .5)}.as-scrollbar__bar{position:absolute;right:2px;bottom:2px;z-index:1;border-radius:4px}.as-scrollbar__bar.is-vertical{width:6px;top:2px}.as-scrollbar__bar.is-vertical>div{width:100%}.as-scrollbar__bar.is-horizontal{height:6px;left:2px}.as-scrollbar__bar.is-horizontal>div{height:100%}.as-scrollbar-fade-enter-active{transition:opacity .34s ease-out}.as-scrollbar-fade-leave-active{transition:opacity .12s ease-out}.as-scrollbar-fade-enter-from,.as-scrollbar-fade-leave-active{opacity:0}.as-popover-content{--background-color: white;--border-color: lightgray;display:none;pointer-events:none;opacity:0;z-index:99999;position:relative}.as-popover-content .arrow,.as-popover-content .arrow:before{width:0;height:0;border-style:solid}.as-popover-content .arrow:before{content:"";position:absolute}.as-popover-content[data-show=true]{opacity:1;pointer-events:initial}.as-popover-content[data-initialized=true]{display:block}.slide-fade-enter-active{transition:all .3s ease-out}.slide-fade-leave-active{transition:all .8s cubic-bezier(1,.5,.8,1)}.slide-fade-enter-from,.slide-fade-leave-to{transform:translate(20px);opacity:0}.as-icon{font-size:20px;width:1em;height:1em;vertical-align:-.15em;fill:currentColor;overflow:hidden;margin:.25px 4px 0 0;display:inline-block}.as-img-icon{border:none;position:relative;font-size:0}.as-img-icon img{width:100%;height:100%;border:none;vertical-align:top}.as-img-icon img.error{display:inline-block;transform:scale(1);content:"";color:transparent}.as-img-icon img.error:before{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:#f5f5f5 no-repeat center/50% 50%}.as-img-icon img.error:after{content:attr(alt);position:absolute;left:0;bottom:0;width:100%;line-height:2;background-color:#00000080;color:#fff;font-size:12px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.as-menu-item.horizontal{position:relative;padding:0 16px}.as-menu-item.horizontal:after{content:"";transform:scaleX(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;right:0;left:0;bottom:0;border-bottom:2px solid var(--as-primary-color)}.as-menu-item.horizontal:hover:after{transform:scaleX(1);opacity:1}@media screen and (max-width: 750px){.as-menu-item.horizontal{padding:0 10px}}.as-menu-item.vertical{margin:5px 0;position:relative}.as-menu-item.vertical:after{content:"";transform:scaleY(0);opacity:0;transition:transform .15s cubic-bezier(.645,.045,.355,1),opacity .15s cubic-bezier(.645,.045,.355,1);position:absolute;top:0;bottom:0;right:0;border-right:2.5px solid var(--as-primary-color)}.as-menu-item.vertical:hover:after{transform:scaleY(1);opacity:1}.as-menu-item.vertical .as-menu-item-title{margin-right:6px}.as-menu-item.no-underline{text-decoration:none}.as-menu-item:visited{color:var(--as-primary-text-color)}a.as-menu-item{height:30px;line-height:30px;list-style:none;position:relative;color:var(--as-primary-text-color);transition:color .3s cubic-bezier(.645,.045,.355,1),border-color .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1);box-sizing:border-box;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}a.as-menu-item:hover{border-color:var(--as-primary-color)}a.as-menu-item:hover .as-menu-item-icon,a.as-menu-item:hover .as-menu-item-title{color:var(--as-primary-color)}.as-menu-item-icon{color:var(--as-primary-text-color)}.as-url-icon{width:16px;height:16px;margin-right:10px}.as-subMenu-container{background:var(--as-bg-color);border:1px solid var(--as-border-color);box-shadow:0 0 12px var(--as-shadow-color);border-radius:4px}.as-subMenu{list-style:none;padding:0;min-width:90px;box-sizing:border-box;margin:4px 0}.as-subMenu li{overflow:hidden;box-sizing:border-box}.as-subMenu li a{display:flex;align-items:center;height:34px;padding:0 16px;text-decoration:none}.as-subMenu li:hover{background-color:var(--as-secondary-background-color);color:var(--as-primary-color)}.as-subMenu .as-subMenu-text{flex:1;font-size:14px;text-overflow:ellipsis;color:var(--as-primary-text-color);white-space:nowrap;margin:0;line-height:34px;font-weight:400;text-align:left}.as-menu-container{flex:1;display:flex}.as-menu{padding:0;margin:0;white-space:nowrap;border:0;box-shadow:none;background-color:var(--as-bg-color);display:flex}.as-horizontal .as-menu{flex-direction:row}.as-vertical .as-menu{flex-direction:column}.as-vertical .as-scrollbar__wrap{height:auto}.as-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:999991;height:100%;background-color:var(--as-overlay-color);overflow:auto}label.as-radio{color:var(--as-primary-text-color);font-weight:500;line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;font-size:14px;-webkit-user-select:none;-moz-user-select:none;user-select:none}label.as-radio+label.as-radio{margin-left:14px}label.as-radio input{position:absolute;opacity:0;visibility:hidden}label.as-radio .as-radio-icon{display:inline-block;position:relative;width:12px;height:12px;background:var(--as-bg-color);border:1px solid var(--as-control-border-color);border-radius:50%;vertical-align:-2px}label.as-radio input:checked+.as-radio-icon:after{position:absolute;content:"";width:6px;height:6px;background-color:var(--as-bg-color);border-radius:50%;top:3px;left:3px}label.as-radio input:checked+.as-radio-icon{background:var(--as-primary-color);border:1px solid var(--as-primary-color)}label.as-radio input:disabled+.as-radio-icon{background-color:var(--as-muted-background-color);border:solid 1px var(--as-control-border-color)}label.as-radio input:disabled:checked+.as-radio-icon:after{background-color:var(--as-muted-text-color)}label.as-radio.as-radio-animate .as-radio-icon{transition:background-color ease-out .3s}label.as-radio .as-radio-label{margin-left:6px;font-size:14px}.as-label{vertical-align:middle;float:left;font-size:14px;color:var(--as-primary-text-color);line-height:40px;padding:0 12px 0 0;box-sizing:border-box}.as-content{line-height:40px;position:relative;font-size:14px}.as-button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:var(--as-surface-color);border:1px solid var(--as-control-border-color);color:var(--as-primary-text-color);text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;-webkit-user-select:none;-moz-user-select:none;user-select:none;padding:12px 20px;font-size:14px;border-radius:4px}.as-button.as-button__text{border-color:transparent;color:var(--as-primary-color);background:transparent;padding-left:0;padding-right:0}.as-button.as-button__primary{color:#fff;background-color:var(--as-primary-color);border-color:var(--as-primary-color)}.as-color-set .as-color-label{line-height:1;position:relative;cursor:pointer;display:inline-block;white-space:nowrap;outline:none;vertical-align:middle}.as-color-set .input\u2014color{width:30px;height:30px;padding:4px;border:1px solid #e6e6e6;border-radius:4px;background-color:var(--as-secondary-background-color);box-sizing:border-box}.as-color-set .input\u2014color::-webkit-color-swatch{border:0}.as-color-set .input\u2014color::-webkit-color-swatch-wrapper{padding:0}.as-color-set .reset-btn{margin-left:20px}.as-config-backup .as-button+.as-button[data-v-32e62a8b]{margin-left:12px}.as-config-backup .as-button[data-v-32e62a8b]:disabled{opacity:.45;cursor:default}.as-config-backup input[hidden][data-v-32e62a8b]{display:none}#fast-search .as-backup-message[data-v-32e62a8b]{margin:0 0 10px;font-size:12px;color:#606266;line-height:1.5;overflow-wrap:anywhere}#fast-search .as-backup-message.failed[data-v-32e62a8b]{color:#c45656}.as-setting{position:relative}.as-setting.horizontal{box-shadow:-4px 0 10px #0000001f;display:flex}.as-setting-btn{line-height:30px;padding:0 14px;position:relative;margin:0;white-space:nowrap;cursor:pointer;font-size:14px;color:var(--as-primary-text-color);text-align:center}.as-setting-btn:hover{color:var(--as-primary-color);background-color:var(--as-secondary-background-color)}.as-side-bar{width:20vw;min-width:300px;right:0;height:100%;top:0;bottom:0;position:absolute;box-sizing:border-box;background:var(--as-panel-background);display:flex;flex-direction:column;box-shadow:0 8px 10px -5px #0003,0 16px 24px 2px #00000024,0 6px 30px 5px #0000001f;overflow:hidden}.as-side-bar>header{font-size:16px;align-items:center;color:var(--as-primary-text-color);display:flex;padding:32px 24px}.as-side-bar>section{overflow-y:auto;min-height:0;padding:10px 24px;margin:0 12px;height:100%;flex:1;border-radius:4px;border:1px solid var(--as-border-color);background:var(--as-translucent-surface-color)}.as-side-bar>footer{display:flex;flex-wrap:wrap;gap:10px 16px;padding:10px 24px 30px}.as-side-bar>footer .link{cursor:pointer;color:var(--as-primary-text-color);background:none;border:0;padding:0;font-size:14px;text-decoration:none}.as-side-bar>footer .link:visited{color:var(--as-primary-text-color)}.as-theme-setting .as-radio+.as-radio{margin-left:6px}.overlay-enter-active,.overlay-leave-active{transition:opacity .3s}.overlay-enter-from,.overlay-leave-to{opacity:0}.overlay-enter-active .as-side-bar{animation:rtl-drawer-animation .3s linear reverse}.overlay-leave-active .as-side-bar{animation:rtl-drawer-animation .3s linear}@keyframes rtl-drawer-animation{0%{transform:translate(0)}to{transform:translate(100%)}}.as-hover-btn[data-v-9dbab039]{position:fixed;z-index:99999;font-weight:600;font-size:17px;color:var(--as-primary-color);background:#fff;box-shadow:0 1px 4px #00152914;border:1px var(--as-border-color) solid;opacity:.6;cursor:pointer}.as-hover-btn-horizontal[data-v-9dbab039]{top:0;left:50%;transform:translateY(0) translate(-50%);padding:0 16px;height:28px;line-height:28px}.as-hover-btn-vertical[data-v-9dbab039]{left:0;top:50%;transform:translateY(-200%) translate(0) rotate(90deg);transform-origin:0 100%;padding:0 16px;height:28px;line-height:28px}.hover-btn.as-hide[data-v-9dbab039]{transition:transform .2s;transform:translateY(-100%) translate(-50%)}.bar-container[data-v-1d452dee]{display:flex;padding:2px;max-width:300px;position:absolute;z-index:99999;background-color:var(--as-surface-color);color:var(--as-primary-text-color);box-shadow:0 0 0 1px var(--as-border-color),0 2px 3px 0 var(--as-shadow-color);border-radius:2px;cursor:pointer;white-space:nowrap}.tool-bar-item[data-v-1d452dee]{margin:0;padding:2px;width:20px;height:20px;border:1px solid var(--as-surface-color);cursor:pointer;box-sizing:content-box}.tool-bar-item[data-v-1d452dee]:hover{border-color:var(--as-border-color)}.as-more-icon[data-v-1d452dee]{display:block;font-size:20px}.as-dialog{position:fixed;top:0;right:0;bottom:0;left:0;margin:0;z-index:99999}.as-dialog__mask{position:fixed;left:0;top:0;width:100%;height:100%;background:var(--as-overlay-color);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.as-dialog-container{position:relative;background:var(--as-dialog-background-color);border-radius:10px;box-shadow:0 1px 3px var(--as-shadow-color);box-sizing:border-box;min-width:50%;max-width:80%;z-index:99;margin:40vh auto 50px;transform:translateY(-40%);overflow:hidden;-webkit-backdrop-filter:saturate(3) blur(20px);backdrop-filter:saturate(3) blur(20px)}.as-dialog__header{position:relative}.as-dialog__body{color:var(--as-primary-text-color);font-size:14px;word-break:break-all}.as-dialog__footer{padding:10px 20px 20px;text-align:right;box-sizing:border-box}.as-dialog__close{display:inline-block;position:absolute;top:16px;right:24px;padding:0;background:transparent;cursor:pointer;font-size:16px;color:var(--as-muted-text-color)}.as-dialog__close:before{content:"\u2716"}.se-header{padding:15px 20px;box-shadow:0 1px 6px 0 var(--as-shadow-color);background:var(--as-panel-background)}.se-input-box{border:1px solid var(--as-control-border-color);background-color:var(--as-translucent-surface-color);overflow:hidden;display:flex;border-radius:6px;height:40px;align-items:center;transition:.2s;color:var(--as-primary-text-color)}.se-input-box:hover{border-color:var(--as-primary-color);box-shadow:0 1px 6px var(--as-shadow-color)}.se-input-box:active{border-color:var(--as-primary-color)}.se-input-box .se-input{color:var(--as-primary-text-color);background-color:transparent;font-size:16px;height:100%;width:100%;line-height:20px;margin:0 20px;outline:none;border:none}.se-scrollbar-container{height:50vh;padding:0 20px 20px;background:var(--as-panel-background)}.se-container{margin-top:10px;display:flex;border-radius:6px;flex-wrap:wrap}.cate-container{flex:0 0 150px;margin:0 10px 10px 0;border:1px solid var(--as-border-color);background:var(--as-translucent-surface-color);padding:6px}.cate-name{padding:0 10px;height:36px;line-height:36px;font-size:16px;display:flex;align-items:center}.cate-list{list-style:none;min-width:110px;box-sizing:border-box;padding:0}.cate-list .cate-item{box-sizing:border-box;padding:0 10px}.cate-list .cate-item .as-subMenu-text{margin:0}.cate-list .cate-item a{display:flex;align-items:center;height:34px;text-decoration:none;color:var(--as-primary-text-color)}.cate-list .cate-item:hover{background-color:var(--as-secondary-background-color);color:var(--as-primary-color)}#fast-search .sm-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000002;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--as-overlay-color);color:var(--as-primary-text-color);font-size:14px;text-align:left}#fast-search .sm-overlay *,#fast-search .sm-overlay *:before,#fast-search .sm-overlay *:after{box-sizing:border-box}#fast-search .sm-overlay .sm-dialog{display:flex;flex-direction:column;width:1080px;max-width:100%;height:min(760px,88vh);background:var(--as-surface-color);border-radius:4px;box-shadow:0 12px 32px var(--as-shadow-color);overflow:hidden}#fast-search .sm-overlay .sm-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px 12px;flex-shrink:0}#fast-search .sm-overlay h2{margin:0;font-size:18px;font-weight:500;line-height:26px;color:var(--as-heading-color)}#fast-search .sm-overlay h2 span{font-size:12px;color:var(--as-muted-text-color);margin-left:12px}#fast-search .sm-overlay button:where(:not(.jsoneditor *)){-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 15px;min-height:32px;font:inherit;line-height:1;white-space:nowrap;border:1px solid var(--as-control-border-color);border-radius:4px;color:var(--as-primary-text-color);background:var(--as-surface-color);cursor:pointer}#fast-search .sm-overlay button:where(:not(.jsoneditor *)):hover:not(:disabled){border-color:var(--as-primary-soft-border-color);color:var(--as-primary-color);background:var(--as-hover-background-color)}#fast-search .sm-overlay button:where(:not(.jsoneditor *)):disabled{opacity:.45;cursor:default}#fast-search .sm-overlay button:where(:not(.jsoneditor *)):focus-visible,#fast-search .sm-overlay input:where(:not(.jsoneditor *)):focus-visible,#fast-search .sm-overlay select:where(:not(.jsoneditor *)):focus-visible{outline:2px solid var(--as-primary-color);outline-offset:2px}#fast-search .sm-overlay .sm-icon-button{width:34px;min-width:34px;height:32px;padding:7px}#fast-search .sm-overlay .sm-icon-button svg{width:16px;height:16px;fill:currentColor}#fast-search .sm-overlay .sm-close{border:0;background:transparent;color:var(--as-muted-text-color)}#fast-search .sm-overlay .sm-primary{color:#fff;background:var(--as-primary-color);border-color:var(--as-primary-color)}#fast-search .sm-overlay .sm-success{color:#fff;background:#67c23a;border-color:#67c23a}#fast-search .sm-overlay .sm-primary:hover:not(:disabled){color:#fff;background:#79bbff}#fast-search .sm-overlay .sm-success:hover:not(:disabled){color:#fff;background:#95d475;border-color:#95d475}#fast-search .sm-overlay .sm-plain-primary{color:var(--as-primary-color);background:var(--as-hover-background-color);border-color:var(--as-primary-soft-border-color)}#fast-search .sm-overlay .sm-plain-danger{color:#f56c6c;background:var(--as-danger-soft-background-color);border-color:var(--as-danger-soft-border-color)}#fast-search .sm-overlay .sm-plain-danger:hover:not(:disabled){color:#fff;background:#f56c6c;border-color:#f56c6c}#fast-search .sm-overlay .sm-plain-muted{color:var(--as-muted-text-color);background:var(--as-muted-background-color);border-color:var(--as-control-border-color)}#fast-search .sm-overlay .sm-tabs{display:flex;gap:26px;margin:0 24px;border-bottom:2px solid var(--as-border-color);flex-shrink:0}#fast-search .sm-overlay .sm-tabs button{position:relative;border:0;border-radius:0;height:44px;padding:0 4px;background:transparent;font-weight:500}#fast-search .sm-overlay .sm-tabs button[aria-selected=true]{color:var(--as-primary-color)}#fast-search .sm-overlay .sm-tabs button[aria-selected=true]:after{content:"";position:absolute;height:2px;bottom:-2px;left:0;right:0;background:var(--as-primary-color)}#fast-search .sm-overlay .sm-body{min-height:0;flex:1;overflow:auto;padding:24px;background:var(--as-secondary-background-color);overscroll-behavior:contain}#fast-search .sm-overlay fieldset{margin:0;padding:0;border:0;min-width:0}#fast-search .sm-overlay input:where(:not([type=file],.jsoneditor *)),#fast-search .sm-overlay select:where(:not(.jsoneditor *)){height:32px;font:inherit;color:var(--as-primary-text-color);background:var(--as-surface-color);border:1px solid var(--as-control-border-color);border-radius:4px;padding:0 11px;min-width:0;box-shadow:none}#fast-search .sm-overlay input:where(:not([type=file],.jsoneditor *)){width:100%}#fast-search .sm-overlay input::-moz-placeholder{color:var(--as-muted-text-color)}#fast-search .sm-overlay input::placeholder{color:var(--as-muted-text-color)}#fast-search .sm-overlay .sm-category-tabs{display:flex;align-items:flex-start;gap:12px;margin-bottom:20px}#fast-search .sm-overlay .sm-category-group{flex:1;display:flex;flex-wrap:wrap;gap:0}#fast-search .sm-overlay .sm-category-group button{border-radius:0;margin-left:-1px;height:40px;padding:12px 19px}#fast-search .sm-overlay .sm-category-group button:first-child{margin-left:0;border-radius:4px 0 0 4px}#fast-search .sm-overlay .sm-category-group button:last-child{border-radius:0 4px 4px 0}#fast-search .sm-overlay .sm-category-group button[aria-pressed=true]{color:#fff;border-color:var(--as-primary-color);background:var(--as-primary-color);z-index:1}#fast-search .sm-overlay .sm-add-category{margin-top:4px}#fast-search .sm-overlay .sm-category-row{display:flex;gap:20px;align-items:center;padding:12px 20px;background:var(--as-surface-color);border-bottom:1px solid var(--as-border-color)}#fast-search .sm-overlay .sm-category-row>input{flex:1}#fast-search .sm-overlay .sm-row-tools{display:flex;align-items:center;gap:10px;flex-shrink:0}#fast-search .sm-overlay .sm-button-group{display:flex}#fast-search .sm-overlay .sm-button-group button{border-radius:0}#fast-search .sm-overlay .sm-button-group button:first-child{border-radius:4px 0 0 4px}#fast-search .sm-overlay .sm-button-group button:last-child{margin-left:-1px;border-radius:0 4px 4px 0}#fast-search .sm-overlay .sm-url-item{background:var(--as-surface-color);border-bottom:1px solid var(--as-border-color)}#fast-search .sm-overlay .sm-url-item:hover{background:var(--as-secondary-background-color)}#fast-search .sm-overlay .sm-url-line{display:flex;align-items:center;gap:10px;padding:12px 20px 12px 10px}#fast-search .sm-overlay .sm-name-input{flex:1}#fast-search .sm-overlay .sm-url-input{flex:3}#fast-search .sm-overlay .sm-drag{border:0;background:transparent;color:var(--as-muted-text-color);cursor:grab;touch-action:none}#fast-search .sm-overlay .sm-drag:active{cursor:grabbing}#fast-search .sm-overlay .sm-row-tools select{width:48px;padding:0 5px}#fast-search .sm-overlay .sm-is-hidden .sm-name-input,#fast-search .sm-overlay .sm-is-hidden .sm-url-input{color:var(--as-muted-text-color)}#fast-search .sm-overlay .sm-add-url{padding:12px 20px;background:var(--as-surface-color)}#fast-search .sm-overlay .sm-help{display:block;color:var(--as-muted-text-color);font-size:12px;line-height:1.6}#fast-search .sm-overlay p.sm-help{margin:14px 0 0}#fast-search .sm-overlay .sm-empty{padding:35px;text-align:center;color:var(--as-muted-text-color)}#fast-search .sm-overlay .sm-icon-editor{display:flex;align-items:center;flex-wrap:wrap;gap:12px;padding:0 20px 14px 54px}#fast-search .sm-overlay .sm-icon-editor>label:first-of-type{flex:1;min-width:160px}#fast-search .sm-overlay .sm-icon-editor label{font-size:12px;line-height:1.8}#fast-search .sm-overlay .sm-icon-editor img{width:32px;height:32px;-o-object-fit:contain;object-fit:contain}#fast-search .sm-overlay .sm-upload input{display:block;max-width:190px;font-size:12px}#fast-search .sm-overlay .sm-footer{padding:14px 24px;background:var(--as-surface-color);box-shadow:0 -2px 8px var(--as-shadow-color);flex-shrink:0}#fast-search .sm-overlay .sm-feedback{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:4px 14px;line-height:1.5;margin-bottom:10px;min-height:18px;font-size:13px}#fast-search .sm-overlay .sm-error{color:#f56c6c}#fast-search .sm-overlay .sm-footer-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px}#fast-search .sm-overlay .sm-body-json{display:flex;padding:16px 24px}#fast-search .sm-overlay .sm-body-json fieldset{width:100%;display:flex;flex-direction:column;min-height:0}#fast-search .sm-overlay .sm-editor-actions{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px}#fast-search .sm-overlay .sm-json-editor{flex:1;width:100%;min-height:280px;text-align:left}@media (max-width: 700px){#fast-search .sm-overlay{padding:8px}#fast-search .sm-overlay .sm-dialog{height:calc(100dvh - 16px)}#fast-search .sm-overlay .sm-header{padding:12px 16px 6px}#fast-search .sm-overlay .sm-tabs{margin:0 16px}#fast-search .sm-overlay .sm-body{padding:14px 12px}#fast-search .sm-overlay .sm-category-group button{height:34px;padding:8px 12px}#fast-search .sm-overlay .sm-category-tabs{gap:8px;margin-bottom:12px}#fast-search .sm-overlay .sm-category-row{gap:8px;padding:12px 10px}#fast-search .sm-overlay .sm-row-tools{gap:6px}#fast-search .sm-overlay .sm-category-row .sm-row-tools{flex-wrap:wrap}#fast-search .sm-overlay .sm-url-line{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px;padding:12px 10px}#fast-search .sm-overlay .sm-drag{grid-row:1/3;width:28px;min-width:28px}#fast-search .sm-overlay .sm-name-input,#fast-search .sm-overlay .sm-url-input,#fast-search .sm-overlay .sm-url-line .sm-row-tools{grid-column:2}#fast-search .sm-overlay .sm-url-line .sm-row-tools{justify-content:flex-end}#fast-search .sm-overlay .sm-icon-editor{padding-left:46px}#fast-search .sm-overlay .sm-footer{padding:10px 12px}#fast-search .sm-overlay .sm-footer-actions{gap:8px}#fast-search .sm-overlay .sm-footer-actions button{padding:7px 10px}#fast-search .sm-overlay .sm-json-editor{min-height:220px}}#fast-search[data-as-theme=dark] .sm-overlay .jsoneditor{background:var(--as-surface-color);border-color:var(--as-primary-color)}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-tree,#fast-search[data-as-theme=dark] .sm-overlay textarea.jsoneditor-text,#fast-search[data-as-theme=dark] .sm-overlay pre.jsoneditor-preview{background:var(--as-surface-color);color:var(--as-primary-text-color)}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-field,#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-value,#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-readonly,#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor td,#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor th,#fast-search[data-as-theme=dark] .sm-overlay pre.jsoneditor-preview{color:var(--as-primary-text-color)}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-value.jsoneditor-string{color:#8fca8f}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-value.jsoneditor-number{color:#ff8a78}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-value.jsoneditor-boolean{color:#f5b85c}#fast-search[data-as-theme=dark] .sm-overlay div.jsoneditor-value.jsoneditor-null{color:#78a9ff}#fast-search[data-as-theme=dark] .sm-overlay tr.jsoneditor-highlight,#fast-search[data-as-theme=dark] .sm-overlay tr.jsoneditor-selected{background-color:var(--as-secondary-background-color)}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor{background-color:var(--as-surface-color);color:var(--as-primary-text-color)}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_gutter{background:var(--as-bg-color);color:var(--as-muted-text-color)}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_marker-layer .ace_active-line,#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_gutter-active-line{background:var(--as-secondary-background-color)}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_marker-layer .ace_selection{background:#31547a}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_cursor{color:var(--as-primary-text-color)}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_string{color:#8fca8f}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_constant.ace_numeric{color:#ff8a78}#fast-search[data-as-theme=dark] .sm-overlay .ace-jsoneditor .ace_variable{color:#7dcfff}#fast-search .row,.fast-search-config .row{display:flex}#fast-search .column,.fast-search-config .column{display:flex;flex-direction:column}#fast-search .col,.fast-search-config .col{flex:1}#fast-search .row.items-center,#fast-search .column.items-center,.fast-search-config .row.items-center,.fast-search-config .column.items-center{align-items:center}#fast-search .row.items-end,#fast-search .column.items-end,.fast-search-config .row.items-end,.fast-search-config .column.items-end{align-items:flex-end}#fast-search .row.items-stretch,#fast-search .column.items-stretch,.fast-search-config .row.items-stretch,.fast-search-config .column.items-stretch{align-items:stretch}#fast-search .row.justify-center,#fast-search .column.justify-center,.fast-search-config .row.justify-center,.fast-search-config .column.justify-center{justify-content:center}#fast-search .row.justify-end,#fast-search .column.justify-end,.fast-search-config .row.justify-end,.fast-search-config .column.justify-end{justify-content:flex-end}#fast-search .row.justify-between,#fast-search .column.justify-between,.fast-search-config .row.justify-between,.fast-search-config .column.justify-between{justify-content:space-between}#fast-search .row.flex-wrap,.fast-search-config .row.flex-wrap{flex-wrap:wrap}#fast-search .row.content-center,.fast-search-config .row.content-center{align-content:center}#fast-search .row.content-end,.fast-search-config .row.content-end{align-content:end}#fast-search p,.fast-search-config p{margin:0}.body-horizontal{height:30px;width:100%}.body-horizontal+body [data-as-margin-top]{margin-top:30px!important}.body-horizontal+body [data-as-transform]{transform:translateY(30px)}.body-horizontal+body [data-as-border-top]{border-top:rgba(0,0,0,0) 30px solid;box-sizing:content-box}.body-horizontal+body [data-as-has-set]{transition-duration:0s}.body-vertical{height:100%;width:90px;position:fixed;z-index:999999}.body-vertical+body{margin-left:90px!important}body,#fast-search{--as-horizontal-height: $height;--as-primary-color: #1890ff;--as-bg-color: #ffffff;--as-surface-color: #ffffff;--as-translucent-surface-color: rgba(255, 255, 255, .67);--as-panel-background: #ffffff radial-gradient(#eff4f9 75%, #f3f3f3 100%) no-repeat fixed;--as-primary-text-color: #606266;--as-heading-color: #303133;--as-muted-text-color: #909399;--as-secondary-background-color: #f5f7fa;--as-border-color: #e8e8e8;--as-control-border-color: #dcdfe6;--as-hover-background-color: #ecf5ff;--as-primary-soft-border-color: #a0cfff;--as-danger-soft-background-color: #fef0f0;--as-danger-soft-border-color: #fab6b6;--as-muted-background-color: #f4f4f5;--as-dialog-background-color: rgba(243, 243, 243, .85);--as-overlay-color: rgba(0, 0, 0, .5);--as-shadow-color: rgba(0, 0, 0, .16)}#fast-search{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"}#fast-search[data-as-theme=dark]{--as-bg-color: #17191e;--as-surface-color: #20242b;--as-translucent-surface-color: rgba(32, 36, 43, .88);--as-panel-background: radial-gradient(circle at top, #252a32 0, #17191e 72%) no-repeat fixed;--as-primary-text-color: #e5e7eb;--as-heading-color: #f3f4f6;--as-muted-text-color: #9ca3af;--as-secondary-background-color: #2b3038;--as-border-color: #3a404a;--as-control-border-color: #4b5260;--as-hover-background-color: #26384d;--as-primary-soft-border-color: #326899;--as-danger-soft-background-color: #482b30;--as-danger-soft-border-color: #82464d;--as-muted-background-color: #30353e;--as-dialog-background-color: rgba(27, 31, 38, .94);--as-overlay-color: rgba(0, 0, 0, .68);--as-shadow-color: rgba(0, 0, 0, .55)}.as-horizontal{height:30px;width:100%;top:0;border-bottom:1px var(--as-border-color) solid;flex-direction:row;transition:transform .1s}.as-horizontal.as-hide{transform:translateY(-100%)}.as-horizontal.as-show{transform:translateY(0)}.as-vertical{height:100%;width:90px;top:0;left:0;border-right:1px var(--as-border-color) solid;flex-direction:column;transition:transform .1s}.as-vertical.as-hide{transform:translate(-100%)}.as-vertical.as-show{transform:translate(0)}.as-container{opacity:1!important;position:fixed;display:flex;background-color:var(--as-bg-color);z-index:999990} ');

(function (vue, core, Gi) {
  'use strict';

  var pt=(()=>typeof GM_deleteValue<"u"?GM_deleteValue:void 0)(),ft=(()=>typeof GM_getValue<"u"?GM_getValue:void 0)(),lo=(()=>typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0)(),co=(()=>typeof GM_setValue<"u"?GM_setValue:void 0)();const Wi="fast-search",Yi="Fast Search",Xi="1.6.0",Ki=["tamperMonkey","user-script","tool","web","javascript","vue3"],Ji="快速切换搜索引擎，支持划词搜索、全局搜索和自定义搜索入口",Qi="jetyu ",er="https://github.com/jetyu/FastSearch",nr={url:"https://github.com/jetyu/FastSearch/issues"},tr="GPL-3.0-only",or={type:"git",url:"git+https://github.com/jetyu/FastSearch.git"},ir=["dist","extension-dist","output","lib"],rr="output/index.user.js",ar="output/index.user.js",sr="pnpm@8.15.1",lr={test:"node --test tests/*.test.mjs","test:browser":"cross-env PLAYWRIGHT_BROWSERS_PATH=./node_modules/.cache/ms-playwright node node_modules/@playwright/test/cli.js test",lint:"vue-cli-service lint",format:"prettier --write .","format:check":"prettier --check .",prepare:"husky install","dev:script":"vite --mode script","build:script":"vite build --mode script","dev:chrome":"vite build --mode plugin --watch","build:chrome":"cross-env FASTSEARCH_TARGET=chrome vite build --mode production","dev:site":"vite dev --mode site","build:site":"vite build --mode site"},cr={"@element-plus/icons-vue":"^2.0.4","@popperjs/core":"^2.9.2","core-js":"^3.9.1","element-plus":"^2.2.22",jsoneditor:"^9.9.0","resize-observer-polyfill":"^1.5.1",vue:"^3.3.4","vue-draggable-next":"^2.0.1","vue-router":"^4.0.5"},dr={"@babel/eslint-parser":"^7.19.1","@commitlint/cli":"^17.1.2","@commitlint/config-conventional":"^17.1.0","@playwright/test":"1.55.1","@vitejs/plugin-vue":"^4.3.4","@vue/compiler-sfc":"^3.0.7",autoprefixer:"^10.4.7","babel-plugin-import":"^1.13.3","cross-env":"^7.0.3",eslint:"^7.32.0","eslint-plugin-vue":"^7.7.0",husky:"^8.0.1","lint-staged":"^13.1.0",minimist:"^1.2.7",postcss:"^8.4.13",prettier:"3.9.7","rollup-plugin-external-globals":"^0.6.1",sass:"^1.32.8","sass-loader":"^10.1.1",vite:"^4.4.9","vite-plugin-crx-mv3":"^0.1.5","vite-plugin-monkey":"^3.5.0"},ur={name:Wi,displayName:Yi,version:Xi,keywords:Ki,description:Ji,author:Qi,homepage:er,bugs:nr,license:tr,repository:or,files:ir,unpkg:rr,jsdelivr:ar,packageManager:sr,scripts:lr,dependencies:cr,devDependencies:dr},Zt=ur.version;function pr(e,n){n=n||window.location.href;const o=new RegExp("(\\?|#|&)"+e+"=([^&#]*)(&|#|$)"),t=n.match(o);return decodeURIComponent(t?t[2]:"")}function fr(){let e=0;return new Promise((n,o)=>{if(document&&document.body)n();else {const t=setInterval(function(){e+=1,document&&document.body&&(clearInterval(t),n()),e===50&&(clearInterval(t),o(new Error("timeOut")));},200);["complete","loaded","interactive"].includes(document.readyState)?document&&document.body&&(clearInterval(t),n()):document.addEventListener("DOMContentLoaded",function(){document&&document.body&&(clearInterval(t),n());});}})}function Sn(e){return e?`__fastSearch__${e}`:null}function Po(e){return e?["__all","Search__",e].join(""):null}function hr(e){if(typeof e!="string")return !1;const n=e.charAt(0);if(n!=="["&&n!=="{")return !1;try{return typeof JSON.parse(e)=="object"}catch{return !1}}function mr(e){if(hr(e))try{return JSON.parse(e)}catch{return e}return e}function gr(e,n,o){const t=n/1e3*60;let i=0;if(o===!0&&e())return;function r(){i<t?(i++,requestAnimationFrame(r)):e()||(i=0,requestAnimationFrame(r));}requestAnimationFrame(r);}function $o(e){try{if(typeof e=="string"){let n=document.querySelectorAll(e);for(let o=0;o<n.length;o++)n[o].remove();}else typeof e=="function"?e():console.log("未知命令："+e);}catch(n){console.log(n);}}function vr(e,n,o,t=!1){gr(function(){let i=document.querySelector(o);if(typeof o>"u"&&(i=document.body||document.head||document.documentElement||document),typeof o>"u"||typeof o<"u"&&document.querySelector(o)!==null){if(t)$o("."+n);else if(!t&&document.querySelector("."+n)!==null)return !0;let r=document.createElement("style");n&&(r.className=n),r.setAttribute("type","text/css"),r.innerHTML=e;try{i.appendChild(r);}catch(a){console.log(a.message);}return !0}},20,!0);}function on(){return document.getElementById("fast-search")}function br(){const e=document.createElement("div");return e.id="fast-search",e}const Bo=function(){return /mobile|android|webos|iphone|ipod|blackberry|iphone os|ipad/i.test(navigator.userAgent)};function uo(e){e.dataset&&(delete e.dataset.asMarginTop,delete e.dataset.asTransform,delete e.dataset.asBorderTop);}function yr(e){let n=e,o=!0;for(;o&&n.offsetParent;)n.offsetParent.tagName==="BODY"?o=!1:n=n.offsetParent;return window.getComputedStyle(n).position!=="fixed"?null:n}function po(e){if(!e||!Zo(e))return null;const n=window.getComputedStyle(e);return n.display==="none"?null:n.position==="fixed"?e:n.position==="absolute"?yr(e):null}function Zo(e){return e&&e instanceof Element&&e.nodeType===1&&e.tagName!==void 0}function qo(e){if(!e||!Zo(e))return;const n=window.getComputedStyle(e),o=e.computedStyleMap&&e.computedStyleMap();if((o?o.get("top").value:null)==="auto"||(n.top==="0px"&&(e.style.top="0px"),e.dataset.asMarginTop||e.dataset.asTransform||e.dataset.asBorderTop))return;const i=n.marginTop,r=n.transform,a=n.transition;i==="0px"&&!a.includes("margin")?(e.dataset.asHasSet="asMarginTop",e.dataset.asMarginTop="1"):r==="none"?(e.dataset.asHasSet="asTransform",e.dataset.asTransform="1"):(e.dataset.asHasSet="asBorderTop",e.dataset.asBorderTop="1");}function Ho(e,n=!1){const o=new WeakSet,t=[];return e.filter(r=>r).map(r=>(uo(r),n&&Array.from(r.querySelectorAll("*")).map(a=>(uo(a),po(a))).filter(a=>a).forEach(a=>{o.has(a)||(t.push(a),o.add(a));}),po(r))).filter(r=>r).forEach(r=>{o.has(r)||(t.push(r),o.add(r));}),t}function wr(){fr().then(()=>{const e=Array.from(document.body.querySelectorAll("*")).filter(n=>n.tagName!=="STYLE");Ho(e).forEach(n=>{qo(n);});});}function xr(){const e=document.body,n={attributes:!0,childList:!0,subtree:!0,attributeFilter:["style","class"]},o=function(i){const r=on(),a=i.filter(s=>["BODY","STYLE"].includes(s.target.tagName)||r.contains(s.target)?!1:s.type==="attributes"?["style","class","id"].includes(s.attributeName):s.type==="childList"?s.addedNodes.length>0:!1).map(s=>s.target);Ho(a,!0).forEach(s=>{qo(s);});};new MutationObserver(o).observe(e,n);}function _r(){wr(),xr();}function kr(e,n){return function(){if(n.apply(this,arguments)!==!1)return e.apply(this,arguments)}}function fo(e,n){return function(){const o=e.apply(this,arguments);return n.apply(this,arguments),o}}const jr=(e,n,o)=>{if($o(".as-custom-style"),!(n.invisible||o)&&n.style){let t="";n.style[1]&&e==="horizontal"?t=n.style[1]:n.style[2]&&e==="vertical"&&(t=n.style[2]),t&&vr(t,"as-custom-style");}},Sr=function(){Node.prototype.__as_hooks__||(Node.prototype.removeChild=kr(Node.prototype.removeChild,e=>e&&e.tagName==="STYLE"?!(e.classList.contains("as-icon")||e.classList.contains("as-style")||e.classList.contains("elPopover")||e.classList.contains("elScrollbar")):!0),Node.prototype.__as_hooks__=!0);},Er=function(e,n=!0){const o=on();o.classList.remove("body-vertical","body-horizontal"),n||o.classList.add(`body-${e}`);},Cr=[{nameZh:"百度",url:"https://www.baidu.com/s?wd=%s&ie=utf-8",icon:"https://www.baidu.com/favicon.ico"},{nameZh:"谷歌",url:"https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",icon:"https://www.google.com/favicon.ico"},{nameZh:"必应",url:"https://cn.bing.com/search?q=%s",icon:"https://cn.bing.com/favicon.ico"},{nameZh:"搜狗",url:"https://www.sogou.com/web?query=%s",icon:"https://www.sogou.com/favicon.ico"},{nameZh:"DuckDuckGo",url:"https://duckduckgo.com/?q=%s",icon:"https://duckduckgo.com/favicon.ico"},{nameZh:"ChatGPT",url:"https://chatgpt.com/?q=%s",icon:"https://chatgpt.com/favicon.ico"},{nameZh:"Deepseek",url:"https://chat.deepseek.com/?q=%s",icon:"https://deepseek.com/favicon.ico"},{nameZh:"Grok",url:"https://grok.com/?q=%s",icon:"https://grok.com/images/favicon.svg"},{nameZh:"Perplexity",url:"https://www.perplexity.ai/search?q=%s",icon:"https://www.perplexity.ai/favicon.ico"},{nameZh:"Claude",url:"https://claude.ai/new?q=%s",icon:"https://claude.com/favicon.ico"}],zr=[{nameZh:"谷歌翻译",url:"https://translate.google.com/?q=%s",icon:"https://translate.google.com/favicon.ico"},{nameZh:"百度翻译",url:"https://fanyi.baidu.com/#auto/zh/%s",icon:"https://fanyi.baidu.com/favicon.ico"},{nameZh:"必应翻译",url:"https://cn.bing.com/dict/search?q=%s",icon:"https://cn.bing.com/favicon.ico"},{nameZh:"有道词典",url:"https://dict.youdao.com/search?q=%s",icon:"https://shared.ydstatic.com/images/favicon.ico"}],Tr=[{nameZh:"高德地图",url:"https://uri.amap.com/search?keyword=%s",icon:"https://www.amap.com/favicon.ico"},{nameZh:"谷歌地图",url:"https://www.google.com/maps/search/%s",icon:"https://www.google.com/favicon.ico"},{nameZh:"百度地图",url:"https://map.baidu.com/search/%s",icon:"https://map.baidu.com/favicon.ico"}],Mr=[{nameZh:"GitHub",url:"https://github.com/search?utf8=✓&q=%s",icon:"https://github.com/favicon.ico"},{nameZh:"Hugging Face",url:"https://huggingface.co/search/full-text?q=%s",icon:"https://huggingface.co/favicon.ico"},{nameZh:"MDN",url:"https://developer.mozilla.org/zh-CN/search?q=%s",icon:"https://developer.mozilla.org/favicon.ico"},{nameZh:"Stack Overflow",url:"https://stackoverflow.com/search?q=%s",icon:"https://stackoverflow.com/favicon.ico"},{nameZh:"菜鸟教程",url:"https://www.runoob.com/?s=%s",icon:"https://www.runoob.com/favicon.ico"},{nameZh:"掘金",url:"https://juejin.cn/search?query=%s",icon:"https://juejin.cn/favicon.ico"},{nameZh:"Docker Hub",url:"https://hub.docker.com/search?q=%s",icon:"https://hub.docker.com/favicon.ico"},{nameZh:"GreasyFork",url:"https://greasyfork.org/zh-CN/scripts?q=%s&utf8=✓",icon:"https://greasyfork.org/favicon.ico"}],Dr=[{nameZh:"YouTube",url:"https://www.youtube.com/results?search_query=%s",icon:"https://www.youtube.com/favicon.ico"},{nameZh:"哔哩哔哩",url:"https://search.bilibili.com/all?keyword=%s",icon:"https://www.bilibili.com/favicon.ico"},{nameZh:"抖音",url:"https://www.douyin.com/search/%s?type=video",icon:"https://www.douyin.com/favicon.ico"},{nameZh:"腾讯视频",url:"https://v.qq.com/x/search/?q=%s",icon:"https://v.qq.com/favicon.ico"},{nameZh:"爱奇艺",url:"https://so.iqiyi.com/so/q_%s",icon:"https://www.iqiyi.com/favicon.ico"},{nameZh:"优酷视频",url:"https://www.soku.com/search_video/q_%s",icon:"https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png"}],Ar=[{nameZh:"QQ音乐",url:"https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s",icon:"https://y.qq.com/favicon.ico"},{nameZh:"网易音乐",url:"https://music.163.com/#/search/m/?s=%s",icon:"https://s1.music.126.net/style/favicon.ico"},{nameZh:"酷我音乐",url:"https://kuwo.cn/search/list?key=%s",icon:"https://kuwo.cn/favicon.ico"},{nameZh:"酷狗音乐",url:"https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=%s",icon:"https://www.kugou.com/favicon.ico"}],Or=[{nameZh:"谷歌中文",url:"https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",icon:"https://www.google.com/favicon.ico"},{nameZh:"凤凰新闻",url:"https://so.ifeng.com/?q=%s&c=1",icon:"https://so.ifeng.com/favicon.ico"},{nameZh:"今日头条",url:"https://www.toutiao.com/search/?keyword=%s",icon:"https://www.toutiao.com/favicon.ico"},{nameZh:"路透社",url:"https://www.reuters.com/site-search/?query=%s",icon:"https://www.reuters.com/favicon.ico"},{nameZh:"CNN",url:"https://edition.cnn.com/search/?q=%s",icon:"https://edition.cnn.com/favicon.ico"},{nameZh:"BBC",url:"https://www.bbc.co.uk/search?q=%s",icon:"https://www.bbc.co.uk/favicon.ico"},{nameZh:"美联社",url:"https://apnews.com/search?q=%s",icon:"https://apnews.com/favicon.ico"},{nameZh:"德国之声",url:"https://www.dw.com/search/en?searchNavigationId=9097&languageCode=en&item=%s",icon:"https://www.dw.com/favicon.ico"},{nameZh:"NHK",url:"https://www3.nhk.or.jp/nhkworld/en/search/?q=%s",icon:"https://www3.nhk.or.jp/favicon.ico"}],Lr=[{nameZh:"知乎",url:"https://www.zhihu.com/search?q=%s&type=content",icon:"https://www.zhihu.com/favicon.ico"},{nameZh:"小红书",url:"https://www.xiaohongshu.com/search_result?keyword=%s&source=web_search_result_notes",icon:"https://www.xiaohongshu.com/favicon.ico"},{nameZh:"SOV2EX",url:"https://www.sov2ex.com/?q=%s",icon:"https://www.sov2ex.com/assets/favicon/favicon-32x32.png"},{nameZh:"豆瓣",url:"https://www.douban.com/search?source=suggest&q=%s",icon:"https://www.douban.com/favicon.ico"},{nameZh:"百度贴吧",url:"https://tieba.baidu.com/f?kw=%s&ie=utf-8",icon:"https://tieba.baidu.com/favicon.ico"},{nameZh:"微信",url:"https://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s",icon:"https://weixin.sogou.com/favicon.ico"},{nameZh:"新浪微博",url:"https://s.weibo.com/weibo?q=%s",icon:"https://s.weibo.com/favicon.ico"},{nameZh:"X",url:"https://twitter.com/search/%s",icon:"https://twitter.com/favicon.ico"},{nameZh:"Facebook",url:"https://www.facebook.com/search/results.php?q=%s",icon:"https://www.facebook.com/favicon.ico"}],Ir=[{nameZh:"维基百科",url:"https://zh.wikipedia.org/wiki/%s",icon:"https://zh.wikipedia.org/favicon.ico"},{nameZh:"百度百科",url:"https://baike.baidu.com/search/word?pic=1&sug=1&word=%s",icon:"https://baike.baidu.com/favicon.ico"},{nameZh:"快懂百科",url:"https://www.baike.com/search?keyword=%s",icon:"https://www.baike.com/favicon.ico"}],Vr=[{nameZh:"谷歌图片",url:"https://www.google.com/search?q=%s&tbm=isch",icon:"https://www.google.com/favicon.ico"},{nameZh:"百度图片",url:"https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s",icon:"https://image.baidu.com/favicon.ico"},{nameZh:"必应图片",url:"https://www.bing.com/images/search?q=%s",icon:"https://www.bing.com/favicon.ico"},{nameZh:"搜狗图片",url:"https://pic.sogou.com/pics?query=%s",icon:"https:/www.sogou.com/favicon.ico"},{nameZh:"Pixiv",url:"https://www.pixiv.net/search.php?word=%s",icon:"https://www.pixiv.net/favicon.ico"},{nameZh:"Flickr",url:"https://www.flickr.com/search/?q=%s",icon:"https://www.flickr.com/favicon.ico"},{nameZh:"花瓣",url:"https://huaban.com/search/?q=%s",icon:"https://huaban.com/favicon.ico"},{nameZh:"Pinterest",url:"https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta",icon:"https://www.pinterest.com/favicon.ico"},{nameZh:"Pixabay",url:"https://pixabay.com/images/search/%s/",icon:"https://pixabay.com/favicon-32x32.png"},{nameZh:"Unsplash",url:"https://unsplash.com/s/photos/%s",icon:"https://unsplash.com/favicon.ico"}],Nr=[{nameZh:"京东",url:"https://search.jd.com/search?keyword=%s&enc=utf-8",icon:"https://www.jd.com/favicon.ico"},{nameZh:"淘宝",url:"https://s.taobao.com/search?q=%s",icon:"https://www.taobao.com/favicon.ico"},{nameZh:"闲鱼",url:"https://www.goofish.com/search?q=%s",icon:"https://www.goofish.com/favicon.ico"},{nameZh:"亚马逊（全球）",url:"https://www.amazon.com/s?k=%s",icon:"https://www.amazon.com/favicon.ico"},{nameZh:"1688",url:"https://s.1688.com/selloffer/offer_search.htm?keywords=%s",icon:"https://s.1688.com/favicon.ico"},{nameZh:"eBay",url:"https://www.ebay.com/sch/i.html?_nkw=%s",icon:"https://www.ebay.com/favicon.ico"}],Rr=[{nameZh:"百度网盘",url:"https://pan.baidu.com/disk/main#/index?category=all&search=%s",icon:"https://pan.baidu.com/favicon.ico"},{nameZh:"PanSearch",url:"https://www.pansearch.me/search?keyword=%s",icon:"https://www.pansearch.me/favicon.ico"},{nameZh:"小酷盘",url:"https://xiaokupan.com/s/%s",icon:"https://xiaokupan.com/favicon.ico"}],Pr=[{nameZh:"谷歌学术",url:"https://scholar.google.com/scholar?hl=zh-CN&q=%s",icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=="},{nameZh:"百度学术",url:"https://xueshu.baidu.com/s?wd=%s",icon:"https://xueshu.baidu.com/favicon.ico"},{nameZh:"JSTOR",url:"https://www.jstor.org/action/doBasicSearch?Query=%s",icon:"https://www.jstor.org/favicon.ico"},{nameZh:"Springer",url:"https://link.springer.com/search?query=%s",icon:"https://link.springer.com/favicon.ico"},{nameZh:"国家图书馆",url:"https://find.nlc.cn/search/doSearch?query=%s&secQuery=&actualQuery=%s&searchType=2&docType=%E5%85%A8%E9%83%A8&isGroup=isGroup&targetFieldLog=%E5%85%A8%E9%83%A8%E5%AD%97%E6%AE%B5&orderBy=RELATIVE",icon:"https://find.nlc.cn/favicon.ico"}],qt=[{nameZh:"搜索",name:"search",list:Cr},{nameZh:"翻译",name:"translate",list:zr},{nameZh:"地图",name:"map",list:Tr},{nameZh:"视频",name:"video",list:Dr},{nameZh:"购物",name:"shopping",list:Nr},{nameZh:"音乐",name:"music",list:Ar},{nameZh:"开发",name:"developer",list:Mr},{nameZh:"新闻",name:"news",list:Or},{nameZh:"社交",name:"social",list:Lr},{nameZh:"百科",name:"knowledge",list:Ir},{nameZh:"图片",name:"image",list:Vr},{nameZh:"网盘",name:"disk",list:Rr},{nameZh:"学术",name:"scholar",list:Pr}].map(e=>({...e,data:{visible:!0},list:e.list.map(n=>({...n,data:{visible:!0}}))})),ke=e=>JSON.parse(JSON.stringify(e)),Ht=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Fo=e=>({...Ht(e)?e:{},visible:(e==null?void 0:e.visible)!==!1});function Un(e,n){if(typeof e!="string"||!e.trim())throw Error(`${n}不能为空`);return e.trim()}function Ft(e){if(!Array.isArray(e))throw Error("网址列表必须是数组");return e.map((n,o)=>{if(!Ht(n))throw Error(`第 ${o+1} 个网址必须是对象`);const t=ke(n),i=Un(t.nameZh,`第 ${o+1} 个网址名称`),r=Un(t.url,`“${i}”的地址`);let a;try{a=new URL(r);}catch{throw Error(`“${i}”的网址格式不正确`)}if(!["http:","https:"].includes(a.protocol)||a.username||a.password)throw Error(`“${i}”请使用不包含账号密码的 http 或 https 网址`);if(t.icon&&(typeof t.icon!="string"||!/^(https?:\/\/|data:image\/)/i.test(t.icon)))throw Error(`“${i}”的图标应为图片链接或 data:image 数据`);return {...t,nameZh:i,url:r,data:Fo(t.data)}})}function tt(e){if(!Array.isArray(e))throw Error("根节点必须是分类数组");const n=new Set;return e.map((o,t)=>{if(!Ht(o))throw Error(`第 ${t+1} 个分类必须是对象`);const i=ke(o),r=Un(i.name,`第 ${t+1} 个分类标识`),a=Un(i.nameZh,`第 ${t+1} 个分类名称`);if(n.has(r))throw Error(`分类标识“${r}”重复`);return n.add(r),{...i,name:r,nameZh:a,list:Ft(i.list),data:Fo(i.data)}})}function $r({defaults:e,normalize:n,read:o,write:t,remove:i,onChange:r}){let a=n(e),s,c=!1,l=null,d=!1;const u=()=>ke(a);function p(_,m){return a=_,s=JSON.stringify(m),c=!0,r(u()),u()}function b(){return d?Promise.reject(Error("正在处理配置，请稍后重试")):l||(l=(async()=>{const _=await o();return p(n(_===void 0?e:_),_)})().finally(()=>{l=null;}),l)}async function f(_,m,A){if(d||(l&&await l,c||await b(),d))throw Error("正在处理配置，请稍后重试");d=!0;try{if(JSON.stringify(await o())!==s)throw Error("配置已在其他页面修改，本次操作已取消。请保留需要的草稿内容，关闭并重新打开网址管理后重试。");return await A(),p(_,m)}finally{d=!1;}}async function g(_){const m=n(_);return f(m,m,()=>t(ke(m)))}async function v(){return f(n(e),void 0,i)}return {reload:b,save:g,clear:v,snapshot:u}}vue.reactive({tmVersion:""});async function Uo(e,n){if(!ft)throw Error("没有找到 GM_getValue");let o=await ft(Sn(e));if(o===void 0&&(o=await ft(Po(e))),o===void 0){if(arguments.length>1)return n;throw Error("没有已保存的配置："+e)}return mr(o)}async function Go(e,n){if(n===void 0)throw Error("缺少要保存的配置");if(!co)throw Error("没有找到 GM_setValue");return await co(Sn(e),n),n}async function Wo(e){if(!pt)throw Error("没有找到 GM_deleteValue");return await pt(Sn(e)),await pt(Po(e)),!0}let ot=Uo,it=Go,Ut=Wo;const Br=Sn("script-loaded"),Zr=Sn("page-loaded");function qr(){const e=function(){document.dispatchEvent(new CustomEvent(Br,{detail:{version:Zt,getStorage:Uo,setStorage:Go,delStorage:Wo}}));};document.addEventListener(Zr,e),e();}function Yo(e,n,o){const t=vue.ref(ke(n)),i=vue.ref(""),r=$r({defaults:n,normalize:o,read:()=>ot(e,void 0),write:s=>it(e,s),remove:()=>Ut(e),onChange:s=>{t.value=s,i.value="";}});async function a(){try{return await r.reload()}catch(s){throw i.value=s.message||String(s),s}}return a().catch(()=>{}),{list:t,error:i,reload:a,save:r.save,clear:r.clear}}const Fe=Yo("sites",qt,tt);async function Hr(){if(window.confirm("确认要重置所有网址吗？"))try{await Fe.save(qt);}catch(e){window.alert(e.message||String(e));}}function rt(e){return {sites:vue.computed(()=>e==="tm"?Fe.list.value.filter(n=>n.data.visible).map(n=>({...n,show:!1,list:n.list.filter(o=>o.data.visible)})).filter(n=>n.list.length):Fe.list.value),error:Fe.error,reloadSites:Fe.reload,saveSites:Fe.save,clearSites:Fe.clear,resetSites:Hr}}const Dn=100,Fr=[{url:/\/\/www\.google\.com(.hk)?\/search/},{url:/\/\/www\.baidu\.com\/(s|baidu)\?/,style:{1:".selected-search-box { transform: translateY(-30px);}"}},{url:/\/\/[^.]*\.bing\.com\/search/},{url:/\/\/duckduckgo\.com\/*/},{url:/\/\/searx\.me\/\?q/},{url:/\/\/www\.sogou\.com\/(?:web|s)/,selectors:"#upquery"},{url:/\/\/yandex\.com\/search/},{url:/\/\/google\.infinitynewtab\.com\/\?q/},{url:/\/\/baike\.baidu\.com\/item/},{url:/\/\/baike\.baidu\.com\/search/},{url:/\/\/wenku\.baidu\.com\/search/},{url:/\/\/zhidao\.baidu\.com\/search/},{url:/\/\/\D{2,5}\.wikipedia\.org\/wiki/},{url:/\/\/www\.zhihu\.com\/search\?/},{url:/\/\/www\.so\.com\/s/},{url:/\/\/so\.baike\.com\/doc/},{url:/\/\/www\.baike\.com\/wiki/},{url:/\/\/www\.docin\.com\/search\.do/},{url:/\/\/zhihu\.sogou\.com\/zhihu/,selectors:"#upquery"},{url:/\/\/weixin\.sogou\.com\/weixin\?/,style:{2:".headsearch#scroll-header { left:unset; }"}},{url:/\/\/www\.quora\.com\/search\?/},{url:/\/\/stackoverflow\.com\/search\?/,style:{2:`.top-bar._fixed { right: ${Dn}px }`}},{url:/\/\/search\.bilibili\.com\/all/,selectors:".search-input-el"},{url:/\/\/www\.acfun\.cn\/search/,selectors:".search-text--standalone"},{url:/\/\/www\.youtube\.com\/results/,style:{2:`ytd-app {margin-left:${Dn}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${Dn}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`}},{url:/\/\/www\.nicovideo\.jp\/search\//},{url:/\/\/so\.iqiyi\.com\/so\/q/},{url:/\/\/v\.qq\.com\/x\/search/},{url:/\/\/music\.baidu\.com\/search/},{url:/\/\/so\.1ting\.com\/all\.do/},{url:/\/\/s\.music\.qq\.com/},{url:/\/\/music\.163\.com\/.*?#\/search/},{url:/\/\/image\.baidu\.com\/search/},{url:/\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/},{url:/\/\/.*\.bing\.com\/images\/search/},{url:/\/\/www\.flickr\.com\/search\//},{url:/^http:\/\/www\.pixiv\.net\/search\.php/},{url:/\/\/huaban\.com\/search\?/},{url:/\/\/www\.pinterest\.com\/search\//},{url:/\/\/thepiratebay\.org\/search/},{url:/\/\/subhd\.tv\/search/},{url:/\/\/translate\.google(?:\.\D{1,4}){1,2}/},{url:/\/\/fanyi\.baidu\.com/},{url:/\/\/.*\.bing\.com\/dict\/search\?q=/},{url:/\/\/dict\.youdao\.com\/search/},{url:/\/\/dict\.youdao\.com\/w/},{url:/\/\/dict\.cn\/./},{url:/\/\/s\.taobao\.com\/search/},{url:/\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/},{url:/\/\/list\.tmall\.com\/search_product\.htm/},{url:/\/\/search\.jd\.com\/search/},{url:/\/\/search\.suning\.com/},{url:/\/\/search\.smzdm\.com\/\?/},{url:/\/\/s\.weibo\.com\/weibo\?q=/},{url:/\/\/tieba\.baidu\.com\/f\/search/},{url:/\/\/(movie|music|book)\.douban\.com\/subject_search?/},{url:/\/\/www\.douban\.com\/search/},{url:/\/\/xueshu\.baidu\.com\/(?:s|baidu)/,style:{2:`#left_menu_content { left: ${Dn}px !important;}`}},{url:/\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/},{url:/\/\/github\.com\/search/},{url:/\/\/www\.startpage\.com\/sp\/search/}],Ur=e=>{history.pushState=fo(history.pushState,e),history.replaceState=fo(history.replaceState,e),window.addEventListener("popstate",e),window.addEventListener("yt-navigate-finish",e),window.addEventListener("hashchange",e);},{sites:Xo}=rt("tm");function Gr(){let e=null,n=null;const o=new URL(window.location.href);if(Xo.value.some(t=>{t.list.find(i=>{const r=new URL(i.url);return r.hostname===o.hostname&&r.pathname===o.pathname?(e=i,n=r,!0):!1});}),n)for(const t of n.searchParams.keys())o.searchParams.has(t)||(e=null);return e}function Ko(){const e=Fr.find(o=>o.url.test(window.location.href.toLowerCase())),n=Gr();return e?{url:e.url,invisible:!!e.invisible,disabled:!!e.disabled,style:e.style,selectors:e.selectors,query:e.query}:n?{url:n.url,invisible:!1,disabled:!1,style:n.style,selectors:n.selectors,query:n.query}:{url:"",invisible:!0,disabled:!0,style:{},selectors:null,query:null}}vue.watch(Xo,()=>{Jo();});function Jo(){const e=Ko();Object.keys(Re).forEach(n=>{Re[n]=e[n]||"";});}Ur(()=>{Jo();});let Re=vue.reactive(Ko());const ho=vue.ref(!1);function Qo(){return document.fullscreen||document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement}function Wr(e){const n=function(){Qo()||e();};return document.addEventListener("fullscreenchange",e),document.addEventListener("webkitfullscreenchange",e),document.addEventListener("mozfullscreenchange",e),document.addEventListener("MSFullscreenChange",e),document.addEventListener("resize",n),()=>{document.removeEventListener("fullscreenchange",e),document.removeEventListener("webkitfullscreenchange",e),document.removeEventListener("mozfullscreenchange",e),document.removeEventListener("MSFullscreenChange",e),document.removeEventListener("resize",n);}}function Yr(){const e=Wr(()=>{ho.value=Qo();});return vue.onUnmounted(()=>{e();}),{isFullScreen:ho}}const Nn=e=>e!=null;async function Xr(e,n,o=""){try{const t=await ot(e);return o&&o.test(t)||Nn(t)?t:n}catch{return n}}function je(e){const{name:n,initVal:o,defaultVal:t,reg:i}=e;let r="";Nn(o)?r=o:Nn(t)&&(r=t);const a=vue.ref(r);return Xr(n,t,i).then(s=>{a.value=s;}),vue.computed({get:()=>a.value,set:s=>{a.value=s,it(n,Nn(s)?s:t);}})}const Kr=je({name:"mode",defaultVal:"horizontal",reg:/[vertical|horizontal]/});function Gt(){return {value:Kr}}function Jr(e,n=500){let o=!0;return function(){o&&(o=!1,setTimeout(()=>{e.apply(this,arguments),o=!0;},n));}}const ht=vue.ref(0),mo=vue.ref("");function Qr(e,n,o){return e<n-o?"top":e>n+o?"bottom":"mid"}function ea(e=0){const n=Jr(function(o){const i=(o.target===document?o.target.documentElement:o.target).scrollTop,r=Qr(i,ht.value,e);vue.nextTick().then(()=>{mo.value=r;}),ht.value=i;},200);return window&&window.addEventListener("scroll",n),vue.onBeforeUnmount(()=>{window&&window.removeEventListener("scroll",n);}),{y:ht,direction:mo}}const na=vue.reactive(new Map([["none","关闭"],["top","向上"],["bottom","向下"],["all","滚动"]])),Mt=je({name:"switchShow",defaultVal:1,initVal:2,reg:/[1|2]/}),ei=je({name:"scrollHide",defaultVal:"none",reg:/[none|top|bottom|all]/}),{direction:ta}=ea(100);vue.watch([ta,ei],([e,n])=>{Mt.value&&n!=="none"&&(e===n||n==="all")&&(Mt.value=2);});function Wt(){return {show:Mt,scrollHide:ei,options:na}}const oa="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD3UlEQVR4nMSXa2wUVRTHfzOlBRdqWexDSMEKKrQJCtGGgLZBXEhjTAhGicIHYizaRjRRefgkTfwA6ytqiCZIjIiGgEYlRgKKimB9kCgCgbZCbWKgSB9AKY/Sdmc4d263+5qWnbKFf3J37p5z557/Pefce88M4RpjiKu0yjZHtTPJTGOqCbeIxGBgsC04YoXYezKTWqoMK35AwsQ3vGhPM0OsNwwmkkLYNjUyZ3lT0PjVncATdnrOSF6T3lIZmMYgQEiExGKw+RRVrDW6lKw3BLl+im1YJozM+BczhM6kG6XliYeGQ10T1ByH42fwBLUwsfFCbhZbZYpqR6Z+8pbawy2TfTJgQvxLj9wJq+aCLyNxwp2HYckmaD6LJ4gn6pt9FElOdDqr7TaZHW98qPhm7QJ492F34wozbxUSz8Ld4/EEZSu7gxmq74RA3FAQP+jlMph7u+43tEpsvtSub++AsX6YNwWemwXZEpJPFkHJ29DYRtII2zR7GBVEK9WKnrxH93cdgVnvwO56aGqHC5I6LW1nCX4HCz923MmIofDefDxBNmRBhIDN6WhlZal+qtg+/imc74rolhRuo/qBlRSOPMaOWgh+r+UlEsCi0XiG6SacfrN+btgDZzpidTsaJ8setfg68CZF/qOs+TmiK74Jz0g4CSdka5cqHJKt9lTRdgKjD8SMaevyMW5EK1/d9xZztr3Evy05jJf3isfB+t+5MgLRMCVTJvv/Y0beYVd9htlNZvoFLFv/TzPxjAQC9S065r50HdOK7YupqF7cq5+Y1ciWwBtO/8EfnqfhXL6zeoUDjXiGK+eDPRMtuAuyrovVzR6zX1ZsOsYPnc6nskR7SmH/MVJD4P1d+pmbCesWgt8X0a2pKaP02yrH+LIArJij5XuPwm8NpIbA1oN6ByiUymW8Zzk8PVPyYYwmM/22TDY+JrdWIPKOckJ6KnIgjFe/0bth3h1w/TB4pUy3vjAlHzaXw/x10NFN0uiTszrxKjbKwbMZznW6j1Gn5DOiD/WUGdMK4AvJ12H97q1YXHbo53/Bln36Oi6UNkpCUHtC2v+R67j9os4VtQ3VYaRIPPRhcp5IKmqdIZ3hm/6ED3bDT//E1gIqZ8o/i3giTCIZTwwgbdwxUBIpIzBQEikl0BeJlffTPwHLkJJ5EEm4IWzTcY6crH9jkVIoEo9+BFPHSmn3S6LesUlUWZ6z3P5RKqN7uQqQy3Nnc9BwbJlRwkr5uchgQ2xIGVcR/ttLoOV1o04eqxl8rO6x5SDh0yx3ha3K5Q3SPBbb/UNWXWelsah1lfFHtNz9o/NafpxebVwCAAD//+U/FBUAAAAGSURBVAMA3P48eqaZ0kgAAAAASUVORK5CYII=";const W=(e,n)=>{const o=e.__vccOpts||e;for(const[t,i]of n)o[t]=i;return o},ia={name:"logo",props:{mode:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].indexOf(e)>-1}},setup(){return {isMobile:Bo(),iconUrl:oa}}},ra=["src"];function aa(e,n,o,t,i,r){return t.isMobile?vue.createCommentVNode("",!0):(vue.openBlock(),vue.createElementBlock("a",{key:0,class:vue.normalizeClass(["as-title",`as-title-${o.mode}`]),href:"https://github.com/jetyu/FastSearch",target:"_blank","aria-label":"Fast Search",title:"Fast Search"},[vue.createElementVNode("img",{class:"as-title-icon",src:t.iconUrl,alt:"","aria-hidden":"true"},null,8,ra)],2))}const sa=W(ia,[["render",aa]]);var ni=function(){if(typeof Map<"u")return Map;function e(n,o){var t=-1;return n.some(function(i,r){return i[0]===o?(t=r,!0):!1}),t}return function(){function n(){this.__entries__=[];}return Object.defineProperty(n.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),n.prototype.get=function(o){var t=e(this.__entries__,o),i=this.__entries__[t];return i&&i[1]},n.prototype.set=function(o,t){var i=e(this.__entries__,o);~i?this.__entries__[i][1]=t:this.__entries__.push([o,t]);},n.prototype.delete=function(o){var t=this.__entries__,i=e(t,o);~i&&t.splice(i,1);},n.prototype.has=function(o){return !!~e(this.__entries__,o)},n.prototype.clear=function(){this.__entries__.splice(0);},n.prototype.forEach=function(o,t){t===void 0&&(t=null);for(var i=0,r=this.__entries__;i<r.length;i++){var a=r[i];o.call(t,a[1],a[0]);}},n}()}(),Dt=typeof window<"u"&&typeof document<"u"&&window.document===document,Gn=function(){return typeof global<"u"&&global.Math===Math?global:typeof self<"u"&&self.Math===Math?self:typeof window<"u"&&window.Math===Math?window:Function("return this")()}(),la=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(Gn):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),ca=2;function da(e,n){var o=!1,t=!1,i=0;function r(){o&&(o=!1,e()),t&&s();}function a(){la(r);}function s(){var c=Date.now();if(o){if(c-i<ca)return;t=!0;}else o=!0,t=!1,setTimeout(a,n);i=c;}return s}var ua=20,pa=["top","right","bottom","left","width","height","size","weight"],fa=typeof MutationObserver<"u",ha=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=da(this.refresh.bind(this),ua);}return e.prototype.addObserver=function(n){~this.observers_.indexOf(n)||this.observers_.push(n),this.connected_||this.connect_();},e.prototype.removeObserver=function(n){var o=this.observers_,t=o.indexOf(n);~t&&o.splice(t,1),!o.length&&this.connected_&&this.disconnect_();},e.prototype.refresh=function(){var n=this.updateObservers_();n&&this.refresh();},e.prototype.updateObservers_=function(){var n=this.observers_.filter(function(o){return o.gatherActive(),o.hasActive()});return n.forEach(function(o){return o.broadcastActive()}),n.length>0},e.prototype.connect_=function(){!Dt||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),fa?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0);},e.prototype.disconnect_=function(){!Dt||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1);},e.prototype.onTransitionEnd_=function(n){var o=n.propertyName,t=o===void 0?"":o,i=pa.some(function(r){return !!~t.indexOf(r)});i&&this.refresh();},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),ti=function(e,n){for(var o=0,t=Object.keys(n);o<t.length;o++){var i=t[o];Object.defineProperty(e,i,{value:n[i],enumerable:!1,writable:!1,configurable:!0});}return e},rn=function(e){var n=e&&e.ownerDocument&&e.ownerDocument.defaultView;return n||Gn},oi=at(0,0,0,0);function Wn(e){return parseFloat(e)||0}function go(e){for(var n=[],o=1;o<arguments.length;o++)n[o-1]=arguments[o];return n.reduce(function(t,i){var r=e["border-"+i+"-width"];return t+Wn(r)},0)}function ma(e){for(var n=["top","right","bottom","left"],o={},t=0,i=n;t<i.length;t++){var r=i[t],a=e["padding-"+r];o[r]=Wn(a);}return o}function ga(e){var n=e.getBBox();return at(0,0,n.width,n.height)}function va(e){var n=e.clientWidth,o=e.clientHeight;if(!n&&!o)return oi;var t=rn(e).getComputedStyle(e),i=ma(t),r=i.left+i.right,a=i.top+i.bottom,s=Wn(t.width),c=Wn(t.height);if(t.boxSizing==="border-box"&&(Math.round(s+r)!==n&&(s-=go(t,"left","right")+r),Math.round(c+a)!==o&&(c-=go(t,"top","bottom")+a)),!ya(e)){var l=Math.round(s+r)-n,d=Math.round(c+a)-o;Math.abs(l)!==1&&(s-=l),Math.abs(d)!==1&&(c-=d);}return at(i.left,i.top,s,c)}var ba=function(){return typeof SVGGraphicsElement<"u"?function(e){return e instanceof rn(e).SVGGraphicsElement}:function(e){return e instanceof rn(e).SVGElement&&typeof e.getBBox=="function"}}();function ya(e){return e===rn(e).document.documentElement}function wa(e){return Dt?ba(e)?ga(e):va(e):oi}function xa(e){var n=e.x,o=e.y,t=e.width,i=e.height,r=typeof DOMRectReadOnly<"u"?DOMRectReadOnly:Object,a=Object.create(r.prototype);return ti(a,{x:n,y:o,width:t,height:i,top:o,right:n+t,bottom:i+o,left:n}),a}function at(e,n,o,t){return {x:e,y:n,width:o,height:t}}var _a=function(){function e(n){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=at(0,0,0,0),this.target=n;}return e.prototype.isActive=function(){var n=wa(this.target);return this.contentRect_=n,n.width!==this.broadcastWidth||n.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var n=this.contentRect_;return this.broadcastWidth=n.width,this.broadcastHeight=n.height,n},e}(),ka=function(){function e(n,o){var t=xa(o);ti(this,{target:n,contentRect:t});}return e}(),ja=function(){function e(n,o,t){if(this.activeObservations_=[],this.observations_=new ni,typeof n!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=n,this.controller_=o,this.callbackCtx_=t;}return e.prototype.observe=function(n){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(n instanceof rn(n).Element))throw new TypeError('parameter 1 is not of type "Element".');var o=this.observations_;o.has(n)||(o.set(n,new _a(n)),this.controller_.addObserver(this),this.controller_.refresh());}},e.prototype.unobserve=function(n){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element>"u"||!(Element instanceof Object))){if(!(n instanceof rn(n).Element))throw new TypeError('parameter 1 is not of type "Element".');var o=this.observations_;o.has(n)&&(o.delete(n),o.size||this.controller_.removeObserver(this));}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this);},e.prototype.gatherActive=function(){var n=this;this.clearActive(),this.observations_.forEach(function(o){o.isActive()&&n.activeObservations_.push(o);});},e.prototype.broadcastActive=function(){if(this.hasActive()){var n=this.callbackCtx_,o=this.activeObservations_.map(function(t){return new ka(t.target,t.broadcastRect())});this.callback_.call(n,o,n),this.clearActive();}},e.prototype.clearActive=function(){this.activeObservations_.splice(0);},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),ii=typeof WeakMap<"u"?new WeakMap:new ni,ri=function(){function e(n){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var o=ha.getInstance(),t=new ja(n,o,this);ii.set(this,t);}return e}();["observe","unobserve","disconnect"].forEach(function(e){ri.prototype[e]=function(){var n;return (n=ii.get(this))[e].apply(n,arguments)};});var Sa=function(){return typeof Gn.ResizeObserver<"u"?Gn.ResizeObserver:ri}();const Ea=Array.isArray,ai=e=>typeof e=="string",Ca=e=>{let n={};return e.map(o=>{n[o.key]=o.value;}),n},za="MElScrollbar",At=e=>typeof e=="number"&&!isNaN(e),Ot=(...e)=>{console.error(...e);},Ta=e=>{for(const n of e){const o=n.target.__resizeListeners__||[];o.length&&o.forEach(t=>{t();});}},Ma=(e,n)=>{e.__resizeListeners__||(e.__resizeListeners__=[],e.__ro__=new Sa(Ta),e.__ro__.observe(e)),e.__resizeListeners__.push(n);},Da=(e,n)=>{!e||!e.__resizeListeners__||(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(n),1),e.__resizeListeners__.length||e.__ro__.disconnect());},We=e=>ai(e)?e:At(e)?e+"px":(Ot(za,"属性 value 必须是 string 或 number 类型"),""),An=(e,n,o,t=!1)=>{e&&n&&o&&e.addEventListener(n,o,t);},cn=(e,n,o,t=!1)=>{e&&n&&o&&e.removeEventListener(n,o,t);},Aa={vertical:{offset:"offsetHeight",scroll:"scrollTop",scrollSize:"scrollHeight",size:"height",key:"vertical",axis:"Y",client:"clientY",direction:"top"},horizontal:{offset:"offsetWidth",scroll:"scrollLeft",scrollSize:"scrollWidth",size:"width",key:"horizontal",axis:"X",client:"clientX",direction:"left"}},Oa=({move:e,size:n,bar:o})=>{const t={},i=`translate${o.axis}(${e}%)`;return t[o.size]=n,t.transform=i,t.msTransform=i,t.webkitTransform=i,t},La=vue.defineComponent({props:{vertical:Boolean,size:{type:String,default:""},move:{type:Number,default:0},ratio:{type:Number,default:0},always:Boolean},setup(e){const n=vue.ref(!1),o=vue.reactive({});let t=!1,i=!1;const r=vue.ref(null),a=vue.ref(null);let s=null;const{proxy:c}=vue.getCurrentInstance(),l=c.$parent,d=vue.computed(()=>Aa[e.vertical?"vertical":"horizontal"]),u=vue.computed(()=>a.value[d.value.offset]**2/l.wrap[d.value.scrollSize]/e.ratio/r.value[d.value.offset]),p=vue.computed(()=>Oa({size:e.size,move:e.move,bar:d.value})),b=D=>{if(t===!1)return;const $=o[d.value.axis];if(!$)return;const R=(a.value.getBoundingClientRect()[d.value.direction]-D[d.value.client])*-1,B=r.value[d.value.offset]-$,F=(R-B)*100*u.value/a.value[d.value.offset];l.wrap[d.value.scroll]=F*l.wrap[d.value.scrollSize]/100;},f=()=>{t=!1,o[d.value.axis]=0,cn(document,"mousemove",b),cn(document,"mouseup",f),document.onselectstart=s,i&&(n.value=!1);},g=D=>{D.stopImmediatePropagation(),t=!0,An(document,"mousemove",b),An(document,"mouseup",f),s=document.onselectstart,document.onselectstart=()=>!1;},v=D=>{D.stopPropagation(),!(D.ctrlKey||[1,2].includes(D.button))&&(window.getSelection().removeAllRanges(),g(D),o[d.value.axis]=D.currentTarget[d.value.offset]-(D[d.value.client]-D.currentTarget.getBoundingClientRect()[d.value.direction]));},_=D=>{const $=Math.abs(D.target.getBoundingClientRect()[d.value.direction]-D[d.value.client]),R=r[d.value.offset]/2,B=($-R)*100*u.value/a[d.value.offset];l.wrap[d.value.scroll]=B*l.wrap[d.value.scrollSize]/100;},m=()=>{i=!1,n.value=!!e.size;},A=()=>{i=!0,n.value=t;};return vue.onMounted(()=>{vue.nextTick(()=>{An(l.scrollbar,"mousemove",m),An(l.scrollbar,"mouseleave",A);});}),vue.onBeforeUnmount(()=>{cn(document,"mouseup",f),cn(l.scrollbar,"mousemove",m),cn(l.scrollbar,"mouseleave",A);}),{clickThumbHandler:v,clickTrackHandler:_,thumbStyle:p,bar:d,visible:n,instance:a,thumb:r}}});function Ia(e,n,o,t,i,r){return vue.openBlock(),vue.createBlock(vue.Transition,{name:"as-scrollbar-fade"},{default:vue.withCtx(()=>[vue.withDirectives(vue.createElementVNode("div",{ref:"instance",class:vue.normalizeClass(["as-scrollbar__bar","is-"+e.bar.key]),onMousedown:n[1]||(n[1]=(...a)=>e.clickTrackHandler&&e.clickTrackHandler(...a))},[vue.createElementVNode("div",{ref:"thumb",class:"as-scrollbar__thumb",style:vue.normalizeStyle(e.thumbStyle),onMousedown:n[0]||(n[0]=(...a)=>e.clickThumbHandler&&e.clickThumbHandler(...a))},null,36)],34),[[vue.vShow,e.always||e.visible]])]),_:1})}const Va=W(La,[["render",Ia]]);const Na=vue.defineComponent({components:{Bar:Va},props:{height:{type:[String,Number],default:""},maxHeight:{type:[String,Number],default:""},native:{type:Boolean,default:!1},wrapStyle:{type:[String,Array],default:""},wrapClass:{type:[String,Array],default:""},viewClass:{type:[String,Array],default:""},viewStyle:{type:[String,Array],default:""},noresize:Boolean,tag:{type:String,default:"div"},always:{type:Boolean,default:!1},minSize:{type:Number,default:20}},emits:["scroll"],setup(e,{emit:n}){const o=vue.ref("0"),t=vue.ref("0"),i=vue.ref(0),r=vue.ref(0),a=vue.ref(null),s=vue.ref(null),c=vue.ref(null),l=vue.ref(1),d=vue.ref(1),u="AScrollbar",p=4,b=vue.computed(()=>{let m=e.wrapStyle;return Ea(m)?(m=Ca(m),m.height=We(e.height),m.maxHeight=We(e.maxHeight)):ai(m)&&(m+=We(e.height)?`height: ${We(e.height)};`:"",m+=We(e.maxHeight)?`max-height: ${We(e.maxHeight)};`:""),m}),f=()=>{if(!s.value)return;const m=s.value.offsetHeight-p,A=s.value.offsetWidth-p,D=m**2/s.value.scrollHeight,$=A**2/s.value.scrollWidth,R=Math.max(D,e.minSize),B=Math.max($,e.minSize);l.value=D/(m-D)/(R/(m-R)),d.value=$/(A-$)/(B/(A-B)),t.value=R+p<m?R+"px":"",o.value=B+p<A?B+"px":"";},g=()=>{if(s.value){const m=s.value.offsetHeight-p,A=s.value.offsetWidth-p;r.value=s.value.scrollTop*100/m*l.value,i.value=s.value.scrollLeft*100/A*d.value,n("scroll",{scrollTop:s.value.scrollTop,scrollLeft:s.value.scrollLeft});}},v=m=>{if(!At(m)){Ot(u,"value must be a number");return}s.value.scrollTop=m;},_=m=>{if(!At(m)){Ot(u,"value must be a number");return}s.value.scrollLeft=m;};return vue.onMounted(()=>{e.native||vue.nextTick(f),e.noresize||(Ma(c.value,f),addEventListener("resize",f));}),vue.onBeforeUnmount(()=>{e.noresize||(Da(c.value,f),removeEventListener("resize",this.update));}),vue.onUpdated(()=>f()),{scrollbar:a,wrap:s,resize:c,moveX:i,moveY:r,ratioX:d,ratioY:l,sizeWidth:o,sizeHeight:t,update:f,handleScroll:g,scrollTo,setScrollTop:v,setScrollLeft:_,renderWrapStyle:b}}}),Ra={ref:"scrollbar",class:"as-scrollbar"};function Pa(e,n,o,t,i,r){const a=vue.resolveComponent("bar");return vue.openBlock(),vue.createElementBlock("div",Ra,[vue.createElementVNode("div",{ref:"wrap",class:vue.normalizeClass([e.wrapClass,"as-scrollbar__wrap",e.native?"":"as-scrollbar__wrap--hidden-default"]),style:vue.normalizeStyle(e.renderWrapStyle),onScroll:n[0]||(n[0]=(...s)=>e.handleScroll&&e.handleScroll(...s))},[(vue.openBlock(),vue.createBlock(vue.resolveDynamicComponent(e.tag),{ref:"resize",class:vue.normalizeClass(["as-scrollbar__view",e.viewClass]),style:vue.normalizeStyle(e.viewStyle)},{default:vue.withCtx(()=>[vue.renderSlot(e.$slots,"default")]),_:3},8,["class","style"]))],38),e.native?vue.createCommentVNode("",!0):(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:0},[vue.createVNode(a,{move:e.moveX,ratio:e.ratioX,size:e.sizeWidth,always:e.always},null,8,["move","ratio","size","always"]),vue.createVNode(a,{move:e.moveY,ratio:e.ratioY,size:e.sizeHeight,vertical:"",always:e.always},null,8,["move","ratio","size","always"])],64))],512)}const si=W(Na,[["render",Pa]]);function $a(){let e;const n=(t,i)=>{o(),e=window.setTimeout(t,i);},o=()=>window.clearTimeout(e);return {registerTimeout:n,cancelTimeout:o}}function Ba(e,n,o){const{ignore:t,capture:i=!0}=o;if(!window)return;const r=vue.ref(!0);let a;const s=c=>{window.clearTimeout(a);const l=e,d=c.composedPath();!l||l===c.target||d.includes(l)||!r.value||t&&t.length>0&&t.some(u=>{const p=u;return p&&(c.target===p||d.includes(p))})||n(c);};return window.addEventListener("click",s,{passive:!0,capture:i}),window.addEventListener("pointerdown",s,{passive:!0}),()=>{window.removeEventListener("click",s),window.removeEventListener("pointerdown",s);}}const Za={props:{placement:{type:String,default:"auto"},strategy:{type:String,default:"fixed"},popperClass:{type:String,default:""}},setup(e){const n=vue.ref(!1),o=vue.ref(!1),t=vue.ref(null),i=vue.ref(null),r=vue.ref(null),{registerTimeout:a,cancelTimeout:s}=$a();function c(f){if(r.value){n.value=!0;return}r.value=core.createPopper(f,i.value,{strategy:e.strategy,placement:e.placement});}function l(){r.value&&(r.value.destroy(),r.value=null);}let d;function u(f){d||(d=Ba(f,b,{ignore:[i.value]}));}vue.onUnmounted(()=>{d&&d();});function p(f){o.value=!0,n.value=!0,c(f),s(),u(f);}function b(){a(()=>{n.value=!1,l();},50);}return {visible:n,loaded:o,trigger:t,popover:i,popperInstance:r,show:p,hide:b}}},qa=["data-show","data-initialized"];function Ha(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock(vue.Fragment,null,[vue.renderSlot(e.$slots,"trigger",vue.mergeProps({ref:"trigger"},{show:t.show,hide:t.hide})),vue.createVNode(vue.Transition,{name:"slide-fade"},{default:vue.withCtx(()=>[(vue.openBlock(),vue.createBlock(vue.Teleport,{to:"#fast-search"},[vue.withDirectives(vue.createElementVNode("div",{class:vue.normalizeClass([o.popperClass,"as-popover-content"]),ref:"popover","data-show":t.visible,"data-initialized":t.popperInstance!==null,style:{display:"none"},onMouseenter:n[0]||(n[0]=(...a)=>t.show&&t.show(...a)),onMouseleave:n[1]||(n[1]=(...a)=>t.hide&&t.hide(...a))},[t.loaded?vue.renderSlot(e.$slots,"default",{key:0}):vue.createCommentVNode("",!0)],42,qa),[[vue.vShow,t.visible]])]))]),_:3})],64)}const Fa=W(Za,[["render",Ha]]);function vo(e){return [].find.call(e,n=>Je(n))}function Je(e){return Ua(e)&&Ga(e)}function Ua(e){return ["input","textarea"].includes(e.nodeName.toLowerCase())?["text","search","textarea"].includes(e.type):!0}function Ga(e){const n=getComputedStyle(e);return !!e.getClientRects().length&&n.visibility!=="hidden"&&n.width!==0&&n.height!==0&&n.opacity!==0}function Wa(){const e=document.querySelector("input[type=search],input[type=text][autocomplete=off],input[autocomplete=off]:not([type])")||document.querySelector("input[type=text][name][value],input[name][value]:not([type])");if(e&&Je(e))return e;const n=document.querySelector("input[autofocus],input[type=search]");if(n&&Je(n))return n;const o=document.querySelectorAll("input[id*=search],input[class*=search]");if(o.length){const l=vo(o);if(l&&Je(l))return l}const t=document.querySelectorAll("input[placeholder*=search],input[placeholder*=搜索]");if(t.length){const l=vo(t);if(l&&Je(l))return l}const r=["hidden","button","checkbox","color","file","image","radio","range","reset","submit"].map(l=>`[type=${l}]`).join(","),a=document.querySelector(`input:not(${r}), textarea`);if(a&&Je(a))return a;const s=document.getElementsByTagName("input"),c=[].find.call(s,l=>{if(l.value&&decodeURI(window.location.pathname+window.location.search).includes(l.value))return l});if(c)return c}function li(){const e=Wa();if(e){let n="";return ["INPUT","TEXTAREA"].includes(e.nodeName)?n=e.value:n=e.textContent,encodeURIComponent(n)}console.log("没有找到搜索关键字");}const Ya={name:"icon",props:{name:{type:String,default:""}}},Xa={class:"as-icon as-menu-item-icon","aria-hidden":"true"},Ka=["xlink:href"];function Ja(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("svg",Xa,[vue.createElementVNode("use",{"xlink:href":`#icon-${o.name}`},null,8,Ka)])}const Yt=W(Ya,[["render",Ja]]);let ye=document.createElement("a");const Qa=function(e){const n=e.toLowerCase(),o=["http://","https://","ftp://","files://"];for(let t=0;t<o.length;t++)if(n.indexOf(o[t])===0)return e.replace(/.*\/\//,"//");return e};function es(e){let n=e;if(n.indexOf("//")<0)n=`//${n}`;else if(n.indexOf("//")>-1)n=Qa(n);else return ye;return ye.href=n,{href:ye.href,origin:ye.origin,protocol:ye.protocol,host:ye.host,hostname:ye.hostname,port:ye.port,pathname:ye.pathname,search:ye.search,hash:ye.hash}}const ns=je({name:"favicon",defaultVal:1,reg:/[1|2]/});function ts(){window.confirm("确认要清除图标的缓存吗")&&Ut("iconCache").then(()=>{console.log("清除成功");});}function ci(){return {favicon:ns,clearIconCache:ts}}const un=vue.reactive({});ot("iconCache",{}).then(e=>{Object.assign(un,e);}).catch(()=>{});const os={name:"favicon",props:{url:{type:String,default:""},icon:{type:String,default:""}},setup(e){const n=vue.ref(!1),{hostname:o,origin:t}=es(e.url),i=vue.computed(()=>e.icon&&r.value===0&&!n.value?e.icon:un[o]?un[o]:n.value?"":s.value),r=vue.ref(0),a=vue.computed(()=>[e.icon,t?t+"/favicon.ico":""].filter(Boolean)),s=vue.computed(()=>a.value[r.value]||""),{favicon:c}=ci();function l(p){const b=document.createElement("canvas");return b.width=p.width,b.height=p.height,b.getContext("2d").drawImage(p,0,0,p.width,p.height),b.toDataURL("image/png",1)}async function d(p){if(!(e.icon||!o)&&!n.value&&i.value&&!i.value.startsWith("data:image"))try{const b=l(p.target);b&&(un[o]=b,await it("iconCache",un));}catch{}}function u(p){p.currentTarget.src===s.value&&(r.value===a.value.length-1&&(n.value=!0),r.value++);}return {img:i,favicon:c,handleLoad:d,handleError:u,isError:n}}},is={key:0,class:"as-img-icon"},rs=["src"];function as(e,n,o,t,i,r){return t.favicon===1&&t.img?(vue.openBlock(),vue.createElementBlock("div",is,[vue.createElementVNode("img",{class:vue.normalizeClass({error:t.isError}),src:t.img,alt:"",loading:"lazy",decoding:"async",referrerpolicy:"no-referrer",onError:n[0]||(n[0]=(...a)=>t.handleError&&t.handleError(...a)),onLoad:n[1]||(n[1]=(...a)=>t.handleLoad&&t.handleLoad(...a))},null,42,rs)])):vue.createCommentVNode("",!0)}const Xt=W(os,[["render",as]]),ss=(e,n)=>{let o=0,t=0;const i=200;let r=0,a=0,s=0,c=0;const l=15;let d=!1,u=!1;function p(g){o=g.timeStamp;const v=g.changedTouches[0];r=v.clientX,a=v.clientY,d=!1;}function b(g){const v=g.changedTouches[0];s=v.clientX,c=v.clientY,(Math.abs(s-r)>l||Math.abs(c-a)>l)&&(d=!0);}function f(g){t=g.timeStamp,!d&&t-o<=i&&n(g);}vue.watch(e,g=>{g&&!u&&(g.addEventListener("touchstart",p),g.addEventListener("touchmove",b),g.addEventListener("touchend",f),u=!0);}),vue.onUnmounted(()=>{const g=vue.unref(e);g&&(g.removeEventListener("touchstart",p),g.removeEventListener("touchmove",b),g.removeEventListener("touchend",f));});},xe=vue.ref(""),ls=je({name:"openInNewTab",defaultVal:!1});function Kt(){return {openInNewTab:ls}}let bo=!1;const cs={name:"menuItem",components:{popperComp:Fa,icon:Yt,favicon:Xt},props:{item:{type:Object},mode:{type:String,default:"horizontal"}},setup(e){const{openInNewTab:n}=Kt(),o=vue.ref(null),t=Re,i=vue.computed(()=>e.mode==="horizontal"?"horizontal":"vertical"),r=vue.computed(()=>e.mode==="horizontal"?"bottom-start":"right-start"),a=(d,u)=>{u.show=d;},s=()=>{if(xe&&xe.value)return encodeURIComponent(xe.value);let d=li();const u=t.selectors,p=t.query;if(d===void 0)if(u){const b=document.querySelector(u);d=b?encodeURIComponent(b.value):"";}else p&&p.some(b=>{const f=pr(b);return d=encodeURIComponent(f),!!f});return d||""},c=(d,u)=>{if(bo)return;const p=d.list.filter(f=>f.data.visible),b=p.find(f=>new URL(f.url).hostname!==window.location.hostname)||p[0];return l(b,u)},l=(d,u)=>{if(!d)return;const p=s();return u||n.value?window.open(d.url.split("%s").join(p)):window.location.href=d.url.split("%s").join(p),!1};return ss(o,()=>{bo=!0;}),{placement:r,classList:i,handleMenuShow:a,handleClick:l,handleCateClick:c,categoryRef:o}}},ds=["onMouseenter","onMouseleave"],us=["textContent"],ps={class:"as-subMenu"},fs=["onClick","onMouseup"],hs=["textContent"];function ms(e,n,o,t,i,r){const a=vue.resolveComponent("icon"),s=vue.resolveComponent("favicon"),c=vue.resolveComponent("popper-comp");return vue.openBlock(),vue.createBlock(c,{placement:t.placement,"popper-class":"as-subMenu-container"},{trigger:vue.withCtx(({show:l,hide:d})=>[vue.createElementVNode("a",{class:vue.normalizeClass(["as-menu-item no-underline",t.classList]),ref:"categoryRef",onMouseenter:u=>l(u.target),onMouseleave:d,href:"javascript:void 0",onClick:[n[0]||(n[0]=vue.withModifiers(u=>t.handleCateClick(o.item,!1),["exact"])),n[1]||(n[1]=vue.withModifiers(u=>t.handleCateClick(o.item,!0),["ctrl","exact"]))],onMouseup:n[2]||(n[2]=vue.withModifiers(u=>t.handleCateClick(o.item,!0),["middle","exact"]))},[vue.createVNode(a,{name:o.item.name},null,8,["name"]),vue.createElementVNode("span",{class:"as-menu-item-title",textContent:vue.toDisplayString(o.item.nameZh)},null,8,us)],42,ds)]),default:vue.withCtx(()=>[vue.createElementVNode("ul",ps,[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(o.item.list,(l,d)=>vue.withDirectives((vue.openBlock(),vue.createElementBlock("li",{key:`${o.item.name}_${d}`},[vue.createElementVNode("a",{href:"javascript:void 0",onClick:[vue.withModifiers(u=>t.handleClick(l),["exact"]),vue.withModifiers(u=>t.handleClick(l,!0),["ctrl","exact"])],onMouseup:vue.withModifiers(u=>t.handleClick(l,!0),["middle","exact"])},[(vue.openBlock(),vue.createBlock(s,{key:`${l.url}-${l.icon||""}`,class:"as-url-icon",url:l.url,icon:l.icon},null,8,["url","icon"])),vue.createElementVNode("p",{class:"as-subMenu-text",textContent:vue.toDisplayString(l.nameZh)},null,8,hs)],40,fs)])),[[vue.vShow,l.data.visible]])),128))])]),_:1},8,["placement"])}const gs=W(cs,[["render",ms]]),vs=je({name:"align",defaultVal:"flex-start",reg:/[flex\-start|center|flex\-end]/}),bs=new Map([["flex-start","开始"],["center","居中"],["flex-end","末尾"]]);function di(){return {list:bs,value:vs}}const ys={name:"as-menu",components:{scrollbar:si,menuItem:gs},props:{mode:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].indexOf(e)>-1}},setup(e){const{sites:n}=rt("tm"),{value:o}=di(),t=vue.reactive({showTimeout:50,hideTimeout:200}),i=vue.computed(()=>({"as-horizontal":e.mode==="horizontal","as-vertical":e.mode==="vertical"}));return {sites:n,data:t,align:o,menuClass:i}}},ws={class:"as-menu"};function xs(e,n,o,t,i,r){const a=vue.resolveComponent("menu-item"),s=vue.resolveComponent("scrollbar");return vue.openBlock(),vue.createBlock(s,{class:vue.normalizeClass(["as-menu-container",t.menuClass]),style:vue.normalizeStyle({justifyContent:t.align}),noresize:""},{default:vue.withCtx(()=>[vue.createElementVNode("ul",ws,[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(t.sites,c=>(vue.openBlock(),vue.createBlock(a,{key:c.name,item:c,mode:o.mode},null,8,["item","mode"]))),128))])]),_:1},8,["class","style"])}const _s=W(ys,[["render",xs]]),st=/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/;function mt(e,n,o){const t=document.getElementById("fast-search");t&&(st.test(n)&&n.toLowerCase()!==o.toLowerCase()?t.style.setProperty(`--as-${e}`,n):t.style.removeProperty(`--as-${e}`));}const yo=je({name:"primaryColor",defaultVal:"#1890ff",reg:st}),wo=je({name:"bgColor",defaultVal:"#ffffff",reg:st}),xo=je({name:"primaryTextColor",defaultVal:"#606266",reg:st});function ks(){return vue.watchEffect(()=>{mt("primary-color",yo.value,"#1890ff");}),vue.watchEffect(()=>{mt("bg-color",wo.value,"#ffffff");}),vue.watchEffect(()=>{mt("primary-text-color",xo.value,"#606266");}),{primaryColor:yo,bgColor:wo,primaryTextColor:xo}}const ui=[{nameZh:"Google",url:"https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8"},{nameZh:"百度",url:"https://www.baidu.com/s?wd=%s&ie=utf-8"},{nameZh:"Google翻译",url:"https://translate.google.com/?q=%s"},{nameZh:"ChatGPT",url:"https://chatgpt.com/?q=%s"}].map(e=>({...e,data:{visible:!0}})),dn=Yo("toolbar",ui,Ft),js=je({name:"showToolbar",defaultVal:1,reg:/[1|2]/});function lt(e){return {visible:js,error:dn.error,list:vue.computed(()=>e==="tm"?dn.list.value.filter(n=>n.data.visible):dn.list.value),reloadToolbar:dn.reload,saveToolbar:dn.save}}const Rn=je({name:"theme",defaultVal:"auto",reg:/^(auto|dark|light)$/}),Pe=typeof window.matchMedia=="function"?window.matchMedia("(prefers-color-scheme: dark)"):null,pi=vue.ref(!!(Pe!=null&&Pe.matches));function _o(e){pi.value=e.matches;}Pe&&(typeof Pe.addEventListener=="function"?Pe.addEventListener("change",_o):typeof Pe.addListener=="function"&&Pe.addListener(_o));const gt=vue.computed(()=>Rn.value==="dark"||Rn.value==="light"?Rn.value:pi.value?"dark":"light");function fi(){return vue.watchEffect(()=>{const e=on();e&&(e.dataset.asTheme=gt.value,e.style.colorScheme=gt.value);}),{theme:Rn,resolvedTheme:gt}}const vt=vue.ref(!1),ko=vue.ref("sites");function ct(){function e(n="sites"){vt.value||(ko.value=n,vt.value=!0);}return {managerVisible:vt,managerTab:ko,openManager:e}}const Ss={name:"overlay",setup(e,{emit:n}){let o=!1,t=!1;return {onMouseDown:s=>{o=s.target===s.currentTarget;},onMouseUp:s=>{t=s.target===s.currentTarget;},onMaskClick:s=>{o&&t&&n("click",s),o=t=!1;}}}};function Es(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("div",{class:"as-overlay",onMousedown:n[0]||(n[0]=(...a)=>t.onMouseDown&&t.onMouseDown(...a)),onMouseup:n[1]||(n[1]=(...a)=>t.onMouseUp&&t.onMouseUp(...a)),onClick:n[2]||(n[2]=(...a)=>t.onMaskClick&&t.onMaskClick(...a))},[vue.renderSlot(e.$slots,"default")],32)}const Cs=W(Ss,[["render",Es]]);const zs={name:"as-radio",props:{modelValue:{type:[String,Number,Boolean]},label:{type:[String,Number,Boolean],default:""}},setup(e,n){return {model:vue.computed({get(){return e.modelValue},set(t){n.emit("update:modelValue",t);}})}}},Ts={class:"as-radio as-radio-animate"},Ms=["value"],Ds=vue.createElementVNode("i",{class:"as-radio-icon"},null,-1),As={class:"as-radio-label"};function Os(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("label",Ts,[vue.withDirectives(vue.createElementVNode("input",{type:"radio",value:o.label,"onUpdate:modelValue":n[0]||(n[0]=a=>t.model=a)},null,8,Ms),[[vue.vModelRadio,t.model]]),Ds,vue.createElementVNode("span",As,[vue.renderSlot(e.$slots,"default")])])}const Ls=W(zs,[["render",Os]]);const Is={name:"form-item",props:{labelWidth:{type:[String,Number],default:80},label:{type:[String,Number],default:""}},setup(e){const n=vue.computed(()=>({width:`${e.labelWidth}px`})),o=vue.computed(()=>({marginLeft:`${e.labelWidth}px`}));return {labelStyle:n,contentStyle:o}}},Vs=["textContent"];function Ns(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("div",null,[vue.createElementVNode("label",{class:"as-label",style:vue.normalizeStyle(t.labelStyle),textContent:vue.toDisplayString(o.label)},null,12,Vs),vue.createElementVNode("div",{class:"as-content",style:vue.normalizeStyle(t.contentStyle)},[vue.renderSlot(e.$slots,"default")],4)])}const hi=W(Is,[["render",Ns]]);const Rs={name:"xButton",props:{type:{type:String,default:"primary"}}};function Ps(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("button",{class:vue.normalizeClass(["as-button",`as-button__${o.type}`])},[vue.renderSlot(e.$slots,"default")],2)}const Yn=W(Rs,[["render",Ps]]);const $s={name:"color",components:{asButton:Yn},props:{modelValue:{type:[String,Number]}},setup(e,n){const o=vue.computed({get(){return e.modelValue},set(i){n.emit("update:modelValue",i);}});return {model:o,reset:()=>{o.value="";}}}},Bs={class:"as-color-set"},Zs={class:"as-color-label"};function qs(e,n,o,t,i,r){const a=vue.resolveComponent("asButton");return vue.openBlock(),vue.createElementBlock("div",Bs,[vue.createElementVNode("label",Zs,[vue.withDirectives(vue.createElementVNode("input",{class:"input—color",type:"color","onUpdate:modelValue":n[0]||(n[0]=s=>t.model=s)},null,512),[[vue.vModelText,t.model]])]),vue.createVNode(a,{class:"reset-btn",type:"text",onClick:t.reset},{default:vue.withCtx(()=>[vue.createTextVNode(" 重置 ")]),_:1},8,["onClick"])])}const Hs=W($s,[["render",qs]]),Jt=Object.freeze({openInNewTab:!1,theme:"auto",showToolbar:1,mode:"horizontal",align:"flex-start",switchShow:1,scrollHide:"none",favicon:1,primaryColor:"#1890ff",bgColor:"#ffffff",primaryTextColor:"#606266"}),jo={openInNewTab:[!0,!1],showToolbar:[1,2],switchShow:[1,2],favicon:[1,2],theme:["auto","dark","light"],mode:["horizontal","vertical"],align:["flex-start","center","flex-end"],scrollHide:["none","top","bottom","all"]},bt=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),Fs=e=>typeof e=="string"&&(!e||/^(https?:\/\/|data:image\/)/i.test(e)),Qt=Object.keys(Jt),gn=["sites","toolbar",...Qt,"iconCache"],Us=["fast-search-backup",["all","search","backup"].join("-")];function eo(e){if(!bt(e)||!Us.includes(e.format)||e.schemaVersion!==1)throw Error("请选择 Fast Search 的整份 JSON 配置备份。单独的网址数组可以粘贴到“编辑”Tab 中。");if(!bt(e.settings))throw Error("备份缺少完整的设置数据");const n={};for(const o of Qt){const t=o==="theme"&&e.settings[o]===void 0?Jt.theme:e.settings[o];if(jo[o]?!jo[o].includes(t):typeof t!="string"||!/^(|#[a-f\d]{3}|#[a-f\d]{6})$/i.test(t))throw Error(`备份中的设置“${o}”缺失或格式不正确`);n[o]=t;}if(!bt(e.iconCache)||Object.values(e.iconCache).some(o=>!Fs(o)))throw Error("备份中的图标数据格式不正确");return {format:"fast-search-backup",schemaVersion:1,scriptVersion:typeof e.scriptVersion=="string"?e.scriptVersion:"",exportedAt:typeof e.exportedAt=="string"?e.exportedAt:"",sites:tt(e.sites),toolbar:Ft(e.toolbar),settings:n,iconCache:ke(e.iconCache)}}async function Gs({read:e,defaultSites:n,defaultToolbar:o,scriptVersion:t}){const i=await Promise.all(gn.map(a=>e(a))),r=Object.fromEntries(gn.map((a,s)=>[a,i[s]]));return eo({format:"fast-search-backup",schemaVersion:1,scriptVersion:t,exportedAt:new Date().toISOString(),sites:r.sites===void 0?n:r.sites,toolbar:r.toolbar===void 0?o:r.toolbar,settings:Object.fromEntries(Qt.map(a=>[a,r[a]===void 0?Jt[a]:r[a]])),iconCache:r.iconCache===void 0?{}:r.iconCache})}async function Ws(e,{read:n,write:o,remove:t}){const i=eo(e),r={sites:i.sites,toolbar:i.toolbar,...i.settings,iconCache:i.iconCache},a=await Promise.all(gn.map(l=>n(l))),s=Object.fromEntries(gn.map((l,d)=>[l,a[d]===void 0?void 0:ke(a[d])])),c=[];try{for(const l of gn)c.push(l),await o(l,ke(r[l]));}catch(l){const d=[];for(const u of c.reverse())try{if(JSON.stringify(await n(u))===JSON.stringify(s[u]))continue;s[u]===void 0?await t(u):await o(u,s[u]);}catch{d.push(u);}throw d.length?Error(`导入失败，部分配置未能恢复（${d.join("、")}）。请保留备份并重试。`):Error(`导入失败，原配置已保留：${l.message||String(l)}`)}return i}const Ys={class:"as-config-backup"},Xs={__name:"config-backup",setup(e){const n=vue.ref(!1),o=vue.ref(""),t=vue.ref(!1),i=vue.ref(null),r=l=>ot(l,void 0);function a(l){t.value=!0,o.value=l.message||String(l);}async function s(){if(!n.value){n.value=!0,t.value=!1,o.value="";try{const l=await Gs({read:r,defaultSites:qt,defaultToolbar:ui,scriptVersion:Zt}),d=URL.createObjectURL(new Blob([JSON.stringify(l,null,2)],{type:"application/json;charset=utf-8"})),u=document.createElement("a");u.href=d,u.download=`fast-search-backup-${l.exportedAt.slice(0,10)}.json`,u.click(),setTimeout(()=>URL.revokeObjectURL(d),1e3),o.value="已导出完整备份：菜单、划词工具栏、设置和图标。";}catch(l){a(l);}finally{n.value=!1;}}}async function c(l){const d=l.target.files[0];if(!(!d||n.value)){n.value=!0,t.value=!1,o.value="";try{const u=eo(JSON.parse(await d.text()));if(!window.confirm(`将恢复 ${u.sites.length} 个分类、${u.toolbar.length} 个划词入口及全部设置和图标，覆盖当前配置并刷新页面。确认导入整份备份？`))return;await Ws(u,{read:r,write:it,remove:Ut}),o.value="整份配置已恢复，正在刷新页面。",window.location.reload();}catch(u){a(u);}finally{n.value=!1,l.target.value="";}}}return (l,d)=>(vue.openBlock(),vue.createElementBlock("div",Ys,[vue.createVNode(hi,{label:"配置备份"},{default:vue.withCtx(()=>[vue.createVNode(Yn,{type:"text",disabled:n.value,title:"导出全部已保存配置为 JSON 备份",onClick:s},{default:vue.withCtx(()=>[vue.createTextVNode("导出")]),_:1},8,["disabled"]),vue.createVNode(Yn,{type:"text",disabled:n.value,title:"从整份 JSON 备份恢复配置",onClick:d[0]||(d[0]=u=>i.value.click())},{default:vue.withCtx(()=>[vue.createTextVNode("导入")]),_:1},8,["disabled"]),vue.createElementVNode("input",{ref_key:"fileInput",ref:i,type:"file",accept:".json,application/json",hidden:"","aria-label":"整份配置备份文件",onChange:c},null,544)]),_:1}),o.value?(vue.openBlock(),vue.createElementBlock("p",{key:0,class:vue.normalizeClass(["as-backup-message",{failed:t.value}]),role:"status"},vue.toDisplayString(o.value),3)):vue.createCommentVNode("",!0)]))}},Ks=W(Xs,[["__scopeId","data-v-32e62a8b"]]);const Js={name:"side-bar",components:{overlay:Cs,asRadio:Ls,formItem:hi,color:Hs,asButton:Yn,configBackup:Ks},setup(){const e=vue.ref(!1),n=()=>{e.value=!0;},o=()=>{e.value=!1;},{value:t}=Gt(),{list:i,value:r}=di(),{primaryColor:a,primaryTextColor:s}=ks(),{show:c,options:l,scrollHide:d}=Wt(),{favicon:u,clearIconCache:p}=ci(),{visible:b}=lt(),{openInNewTab:f}=Kt(),{theme:g}=fi(),{openManager:v}=ct();function _(D){e.value=!1,v(D);}const m=()=>{c.value=2;};function A(D){D.target.value==="none"?c.value=1:c.value=2;}return {mode:t,visible:e,open:n,onMaskClick:o,alignList:i,align:r,favicon:u,toolbarVisible:b,openInNewTab:f,theme:g,primaryColor:a,primaryTextColor:s,show:c,options:l,scrollHide:d,clearIconCache:p,manage:_,hide:m,changeScrollHide:A}}},Qs=["aria-hidden"],el=vue.createElementVNode("header",{class:"header"}," Fast Search ",-1),nl=vue.createElementVNode("footer",null,[vue.createElementVNode("a",{class:"link",title:"github",href:"https://github.com/jetyu/FastSearch/issues",target:"_blank"}," 反馈 ")],-1);function tl(e,n,o,t,i,r){const a=vue.resolveComponent("as-radio"),s=vue.resolveComponent("form-item"),c=vue.resolveComponent("color"),l=vue.resolveComponent("as-button"),d=vue.resolveComponent("config-backup"),u=vue.resolveComponent("overlay");return vue.openBlock(),vue.createElementBlock(vue.Fragment,null,[vue.createElementVNode("div",{class:vue.normalizeClass(["as-setting",t.mode])},[vue.createElementVNode("div",{class:"as-setting-btn",onClick:n[0]||(n[0]=(...p)=>t.hide&&t.hide(...p))}," 收起 "),vue.createElementVNode("div",{class:"as-setting-btn",onClick:n[1]||(n[1]=(...p)=>t.open&&t.open(...p))}," 设置 ")],2),(vue.openBlock(),vue.createBlock(vue.Teleport,{to:"#fast-search"},[vue.createVNode(vue.Transition,{name:"overlay",appear:""},{default:vue.withCtx(()=>[vue.withDirectives(vue.createVNode(u,{onClick:t.onMaskClick},{default:vue.withCtx(()=>[vue.createVNode(vue.Transition,{name:"drawer",appear:""},{default:vue.withCtx(()=>[vue.withDirectives(vue.createElementVNode("div",{"aria-hidden":!t.visible,"aria-modal":"true",role:"dialog",class:"as-side-bar",onClick:n[18]||(n[18]=vue.withModifiers(()=>{},["stop"]))},[el,vue.createElementVNode("section",null,[vue.createVNode(s,{"label-width":"100",label:"新标签页打开"},{default:vue.withCtx(()=>[vue.createVNode(a,{label:!0,modelValue:t.openInNewTab,"onUpdate:modelValue":n[2]||(n[2]=p=>t.openInNewTab=p)},{default:vue.withCtx(()=>[vue.createTextVNode("开启 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:!1,modelValue:t.openInNewTab,"onUpdate:modelValue":n[3]||(n[3]=p=>t.openInNewTab=p)},{default:vue.withCtx(()=>[vue.createTextVNode("关闭 ")]),_:1},8,["modelValue"])]),_:1}),vue.createVNode(s,{"label-width":"84",label:"划词工具栏"},{default:vue.withCtx(()=>[vue.createVNode(a,{label:1,modelValue:t.toolbarVisible,"onUpdate:modelValue":n[4]||(n[4]=p=>t.toolbarVisible=p)},{default:vue.withCtx(()=>[vue.createTextVNode("显示 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:2,modelValue:t.toolbarVisible,"onUpdate:modelValue":n[5]||(n[5]=p=>t.toolbarVisible=p)},{default:vue.withCtx(()=>[vue.createTextVNode("隐藏 ")]),_:1},8,["modelValue"])]),_:1}),vue.createVNode(s,{class:"as-theme-setting","label-width":"64",label:"外观"},{default:vue.withCtx(()=>[vue.createVNode(a,{label:"auto",modelValue:t.theme,"onUpdate:modelValue":n[6]||(n[6]=p=>t.theme=p)},{default:vue.withCtx(()=>[vue.createTextVNode("自动 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:"dark",modelValue:t.theme,"onUpdate:modelValue":n[7]||(n[7]=p=>t.theme=p)},{default:vue.withCtx(()=>[vue.createTextVNode("深色 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:"light",modelValue:t.theme,"onUpdate:modelValue":n[8]||(n[8]=p=>t.theme=p)},{default:vue.withCtx(()=>[vue.createTextVNode("浅色 ")]),_:1},8,["modelValue"])]),_:1}),vue.createVNode(s,{label:"方向"},{default:vue.withCtx(()=>[vue.createVNode(a,{label:"horizontal",modelValue:t.mode,"onUpdate:modelValue":n[9]||(n[9]=p=>t.mode=p)},{default:vue.withCtx(()=>[vue.createTextVNode("横向 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:"vertical",modelValue:t.mode,"onUpdate:modelValue":n[10]||(n[10]=p=>t.mode=p)},{default:vue.withCtx(()=>[vue.createTextVNode("竖向 ")]),_:1},8,["modelValue"])]),_:1}),vue.createVNode(s,{label:"对齐"},{default:vue.withCtx(()=>[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(t.alignList,([p,b])=>(vue.openBlock(),vue.createBlock(a,{key:p,label:p,modelValue:t.align,"onUpdate:modelValue":n[11]||(n[11]=f=>t.align=f)},{default:vue.withCtx(()=>[vue.createTextVNode(vue.toDisplayString(b),1)]),_:2},1032,["label","modelValue"]))),128))]),_:1}),vue.createVNode(s,{label:"滚动隐藏"},{default:vue.withCtx(()=>[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(t.options,([p,b])=>(vue.openBlock(),vue.createBlock(a,{key:p,label:p,modelValue:t.scrollHide,"onUpdate:modelValue":n[12]||(n[12]=f=>t.scrollHide=f),onChange:t.changeScrollHide},{default:vue.withCtx(()=>[vue.createTextVNode(vue.toDisplayString(b),1)]),_:2},1032,["label","modelValue","onChange"]))),128))]),_:1}),vue.createVNode(s,{label:"图标"},{default:vue.withCtx(()=>[vue.createVNode(a,{label:1,modelValue:t.favicon,"onUpdate:modelValue":n[13]||(n[13]=p=>t.favicon=p)},{default:vue.withCtx(()=>[vue.createTextVNode("显示 ")]),_:1},8,["modelValue"]),vue.createVNode(a,{label:2,modelValue:t.favicon,"onUpdate:modelValue":n[14]||(n[14]=p=>t.favicon=p)},{default:vue.withCtx(()=>[vue.createTextVNode("隐藏 ")]),_:1},8,["modelValue"])]),_:1}),vue.createVNode(s,{label:"主题色"},{default:vue.withCtx(()=>[vue.createVNode(c,{name:"primaryColor",modelValue:t.primaryColor,"onUpdate:modelValue":n[15]||(n[15]=p=>t.primaryColor=p)},null,8,["modelValue"])]),_:1}),vue.createVNode(s,{label:"文字色"},{default:vue.withCtx(()=>[vue.createVNode(c,{name:"primaryTextColor",modelValue:t.primaryTextColor,"onUpdate:modelValue":n[16]||(n[16]=p=>t.primaryTextColor=p)},null,8,["modelValue"])]),_:1}),vue.createVNode(s,{label:"图标缓存"},{default:vue.withCtx(()=>[vue.createVNode(l,{type:"text",onClick:t.clearIconCache},{default:vue.withCtx(()=>[vue.createTextVNode(" 清除 ")]),_:1},8,["onClick"])]),_:1}),vue.createVNode(s,{label:"网址管理"},{default:vue.withCtx(()=>[vue.createVNode(l,{type:"text",onClick:n[17]||(n[17]=p=>t.manage("sites"))},{default:vue.withCtx(()=>[vue.createTextVNode(" 打开 ")]),_:1})]),_:1}),vue.createVNode(d)]),nl],8,Qs),[[vue.vShow,t.visible]])]),_:1})]),_:1},8,["onClick"]),[[vue.vShow,t.visible]])]),_:1})]))],64)}const ol=W(Js,[["render",tl]]);const il={name:"hover-btn",setup(){const{show:e}=Wt(),n=Bo(),o=()=>{n||(e.value=1);},t=()=>{n&&(e.value=1);},{value:i}=Gt(),r=vue.computed(()=>({"as-hide":e.value===2,[`as-hover-btn-${vue.toValue(i)}`]:!0}));return {handleMouseEnter:o,handleClick:t,className:r}}};function rl(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("div",{class:vue.normalizeClass(["as-hover-btn",t.className]),onMouseenter:n[0]||(n[0]=(...a)=>t.handleMouseEnter&&t.handleMouseEnter(...a)),onClick:n[1]||(n[1]=(...a)=>t.handleClick&&t.handleClick(...a))}," Fast Search ",34)}const al=W(il,[["render",rl],["__scopeId","data-v-9dbab039"]]),sl={name:"iconfont"},ll={style:{display:"none"}},cl=vue.createStaticVNode('<symbol id="icon-ai" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="3"></rect><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2Z"></path></g></symbol><symbol id="icon-map" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6-5.5 6-12a6 6 0 1 0-12 0c0 6.5 6 12 6 12Z"></path><circle cx="12" cy="9" r="2.25"></circle></g></symbol><symbol id="icon-disk" viewBox="0 0 1024 1024"><path d="M722.858667 234.666667a64 64 0 0 1 56.533333 33.984L874.666667 448v256a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V448l95.274667-179.349333A64 64 0 0 1 301.141333 234.666667h421.717334zM810.666667 501.333333H213.333333V704h597.333334v-202.666667zM618.666667 576v64H384v-64h234.666667z m128 0v64h-64v-64h64z m-23.808-277.333333H301.141333l-73.685333 138.666666h569.066667L722.858667 298.666667z"></path></symbol><symbol id="icon-personal" viewBox="0 0 1024 1024"><path d="M490.261333 173.44a49.066667 49.066667 0 0 1 64.064 19.178667l1.664 3.093333 87.850667 177.813333 196.352 28.501334a49.066667 49.066667 0 0 1 29.717333 81.066666l-2.538666 2.645334L725.333333 624l33.536 195.349333a49.066667 49.066667 0 0 1-68.010666 53.269334l-3.157334-1.514667L512 778.858667l-175.701333 92.266666a49.066667 49.066667 0 0 1-71.637334-48.426666l0.469334-3.328L298.666667 624.021333 156.629333 485.76a49.066667 49.066667 0 0 1 23.893334-83.114667l3.285333-0.597333 196.352-28.501333 87.850667-177.813334a49.066667 49.066667 0 0 1 22.250666-22.272z m-67.626666 258.581333l-199.658667 28.992 144.469333 140.650667-34.133333 198.741333L512 706.56l178.688 93.845333-34.133333-198.741333 144.469333-140.650667-199.658667-28.992L512 251.157333l-89.386667 180.864z"></path></symbol><symbol id="icon-shopping" viewBox="0 0 1024 1024"><path d="M330.667 768a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667z m384 0a53.333 53.333 0 1 1 0 106.667 53.333 53.333 0 0 1 0-106.667zM94.763 160h54.741a96 96 0 0 1 92.907 71.787l1.024 4.394 13.205 62.486h0.213L299.733 504l32.491 157.333h402.219l61.653-298.666H313.813l-13.376-64h495.68a64 64 0 0 1 62.678 76.949L797.14 674.283a64 64 0 0 1-62.698 51.05H332.224a64 64 0 0 1-62.677-51.05L208.96 380.864l-0.405 0.085-27.734-131.562a32 32 0 0 0-28.309-25.238l-2.987-0.149H94.741v-64h54.742z"></path></symbol><symbol id="icon-developer" viewBox="0 0 1024 1024"><path d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z"></path></symbol><symbol id="icon-image" viewBox="0 0 1024 1024"><path d="M817.365333 213.333333a64 64 0 0 1 64 64v469.333334a64 64 0 0 1-64 64h-597.333333a64 64 0 0 1-64-64V277.333333a64 64 0 0 1 64-64h597.333333z m0 64h-597.333333v469.333334h597.333333V277.333333zM746.666667 371.114667v63.957333c-100.608-1.450667-163.306667 30.293333-193.493334 94.229333l-2.304 5.12-2.858666 6.357334c-44.010667 95.146667-129.088 142.464-249.322667 140.842666v-64c96.234667 1.6 157.930667-32.384 190.933333-103.04l2.538667-5.632 2.624-5.845333c41.664-89.664 127.488-133.333333 251.882667-131.989333z m-397.696-17.237334a42.666667 42.666667 0 1 1 0 85.333334 42.666667 42.666667 0 0 1 0-85.333334z"></path></symbol><symbol id="icon-social" viewBox="0 0 1024 1024"><path d="M617.216 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 72.533333-37.333333 136.32-93.802666 173.269333l168.746666 196.885334A64 64 0 0 1 850.432 853.333333l-101.888 0.021334c11.221333-19.413333 14.293333-42.496 8.746667-64L850.432 789.333333 634.24 537.109333l60.992-39.872a142.869333 142.869333 0 0 0-75.584-262.549333 251.264 251.264 0 0 0-55.424-57.173333A206.976 206.976 0 0 1 617.216 170.666667z m-61.162667 412.757333l140.8 164.266667A64 64 0 0 1 648.213333 853.333333H181.824a64 64 0 0 1-48.597333-105.642666l140.8-164.266667c18.026667 12.373333 37.76 22.442667 58.773333 29.781333L181.824 789.333333h466.410667l-150.997334-176.128c21.034667-7.338667 40.768-17.386667 58.816-29.781333zM415.04 170.666667c114.24 0 206.869333 92.608 206.869333 206.869333 0 114.24-92.629333 206.869333-206.869333 206.869333-114.261333 0-206.869333-92.629333-206.869333-206.869333C208.170667 263.274667 300.778667 170.666667 415.04 170.666667z m0 64a142.869333 142.869333 0 1 0 0 285.738666 142.869333 142.869333 0 0 0 0-285.738666z"></path></symbol><symbol id="icon-news" viewBox="0 0 1024 1024"><path d="M640 170.666667a64 64 0 0 1 64 64v490.666666h-64V234.666667H213.333333v554.666666h597.333334V362.666667h-64v-64h64a64 64 0 0 1 64 64v426.666666a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V234.666667a64 64 0 0 1 64-64h426.666667z m-192 320v64h-170.666667v-64h170.666667z m128-128v64H277.333333v-64h298.666667z"></path></symbol><symbol id="icon-knowledge" viewBox="0 0 1024 1024"><path d="M168.106667 621.44l120.746666 57.962667 223.274667 108.138666 215.317333-104.32 128.768-61.674666a64 64 0 0 1-29.952 84.970666l-286.229333 138.624a64 64 0 0 1-55.808 0L197.994667 706.517333A64 64 0 0 1 168.106667 621.44z m687.829333-133.930667a64 64 0 0 1-29.674667 85.546667L540.010667 711.68a64 64 0 0 1-55.808 0L197.994667 573.056A64 64 0 0 1 166.826667 490.88l317.013333 149.525333 28.288 13.696 286.229333-138.624-0.149333-0.064 57.728-27.882666zM540.032 185.792l286.208 138.602667a64 64 0 0 1 0 115.2l-286.208 138.624a64 64 0 0 1-55.808 0L197.994667 439.594667a64 64 0 0 1 0-115.2L484.224 185.813333a64 64 0 0 1 55.808 0z m-27.904 57.6l-286.229333 138.602667 286.229333 138.624 286.229333-138.624-286.229333-138.602667z"></path></symbol><symbol id="icon-music" viewBox="0 0 1024 1024"><path d="M515.562667 232.91733299c159.061333 0 288 128.938667 288 288v22.250667A85.354667 85.354667 0 0 1 874.666667 627.30666699v93.994666a85.333333 85.333333 0 0 1-85.333334 85.333334h-116.138666V541.97333299h66.346666v-21.056c0-121.685333-97.002667-220.693333-217.92-223.914666l-6.058666-0.085334h-7.125334c-123.712 0-224 100.288-224 224v21.056h66.368v264.661334H234.666667a85.333333 85.333333 0 0 1-85.333334-85.333334v-93.994666a85.354667 85.354667 0 0 1 71.104-84.138667v-22.250667c0-159.061333 128.938667-288 288-288z m27.52 313.813334v256h-62.165334v-256h62.165334z m103.616 42.666666v192H584.533333v-192h62.165334z m-207.232 0v192h-62.165334v-192H439.466667z m-152.661334 16.576H234.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v93.994666a21.333333 21.333333 0 0 0 21.333334 21.333334h52.138666v-136.661334z m502.528 0h-52.138666v136.661334H789.333333a21.333333 21.333333 0 0 0 21.333334-21.333334v-93.994666a21.333333 21.333333 0 0 0-21.333334-21.333334z"></path></symbol><symbol id="icon-translate" viewBox="0 0 1024 1024"><path d="M874.666667 192.00000033v64h-42.666667v426.666666c0 35.349333-30.72 64-68.565333 64h-149.354667l113.749333 128h-85.632l-113.770666-128h-11.562667l-113.749333 128h-85.610667l113.728-128h-170.666667C222.72 746.66666633 192 718.01600033 192 682.66666633V256.00000033H149.333333V192.00000033h725.333334z m-106.666667 64H256v426.666666h512V256.00000033zM405.333333 490.66666633v64h-64v-64h64z m277.333334 0v64H448v-64h234.666667z m0-106.666666v64H448v-64h234.666667z m-277.333334 0v64h-64v-64h64z"></path></symbol><symbol id="icon-video" viewBox="0 0 1024 1024"><path d="M658.069333 234.66666667a64 64 0 0 1 64 64l-0.021333 33.664 49.28-38.4A64 64 0 0 1 874.666667 344.44799967v338.368a64 64 0 0 1-103.338667 50.474667l-49.28-38.4v26.496a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V298.66666667a64 64 0 0 1 64-64h444.736z m0 64H213.333333v422.698667h444.736l-0.128-157.589334L810.666667 682.79466667V344.42666667l-152.704 118.933333 0.106666-164.693333zM384 375.97866667a42.666667 42.666667 0 0 1 22.741333 6.570667l133.866667 84.330666a42.666667 42.666667 0 0 1 0.32 72l-133.866667 86.016A42.666667 42.666667 0 0 1 341.333333 588.99199967v-170.346666a42.666667 42.666667 0 0 1 42.666667-42.666667z m21.333333 81.322667v92.629333l72.789334-46.762667L405.333333 457.30133367z"></path></symbol><symbol id="icon-search" viewBox="0 0 1024 1024"><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z"></path></symbol><symbol id="icon-more" viewBox="0 0 1024 1024"><path d="M437.333333 224C437.333333 183.466667 471.466667 149.333333 512 149.333333s74.666667 34.133333 74.666667 74.666667S552.533333 298.666667 512 298.666667s-74.666667-34.133333-74.666667-74.666667zM439.466667 512c0-40.533333 34.133333-74.666667 74.666666-74.666667s74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667-74.666667-34.133333-74.666666-74.666667zM437.333333 800c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667S552.533333 874.666667 512 874.666667s-74.666667-34.133333-74.666667-74.666667z"></path></symbol><symbol id="icon-scholar" viewBox="0 0 1024 1024"><path d="M306.28571469 698.19428562l205.71428531 102.85714313 205.71428531-102.85714312v-194.97142875l68.57142938-32.61714282v227.58857157a68.57142844 68.57142844 0 0 1-37.89714281 61.32571406l-205.71428625 102.85714312a68.57142844 68.57142844 0 0 1-61.34857125 0l-205.71428626-102.85714312A68.57142844 68.57142844 0 0 1 237.71428531 698.19428562v-225.64571437l64.45714313 30.62857125-147.47428594-70.08a68.57142844 68.57142844 0 0 1-2.35428563-122.6971425L478.17142812 139.95428562a68.57142844 68.57142844 0 0 1 63.56571469 0l325.80571406 170.44571438A68.57142844 68.57142844 0 0 1 900.57142812 393.41714281L900.57142812 626.28571437h-68.57142843v-177.43999968l-292.6171425 139.15428562a68.57142844 68.57142844 0 0 1-58.90285688 0L306.28571469 505.14285687 306.28571469 698.19428562z m203.65714218-497.46285749L184.11428563 371.15428531l325.78285687 154.90285781 325.805715-154.90285781-325.805715-170.42285719z"></path></symbol>',16),dl=[cl];function ul(e,n,o,t,i,r){return vue.openBlock(),vue.createElementBlock("svg",ll,dl)}const pl=W(sl,[["render",ul]]);function fl(){return window.getSelection().toString().trim()}function hl(){const e=window.getSelection();return e.rangeCount?e.getRangeAt(0).getBoundingClientRect():null}function ml(){return document.documentElement.scrollTop||document.body.scrollTop}function gl(){return document.documentElement.scrollLeft||document.body.scrollLeft}const vl={name:"selection-bar",components:{favicon:Xt,icon:Yt},setup(e,n){const{visible:o,list:t}=lt("tm"),i=vue.ref(!1),r=vue.ref(!1),a=vue.ref(null),s=vue.reactive({top:0,left:0}),c=vue.computed(()=>({top:`${s.top-20}px`,left:`${s.left}px`})),l=vue.computed(()=>xe.value.length>12?`${xe.value.substr(0,12)}...`:xe.value);let d=!1;function u(g){g&&(r.value=!0),i.value=!!g,vue.nextTick(()=>{if(!g||!vue.unref(a))return;const v=vue.unref(a).getBoundingClientRect(),_=v.bottom-v.top,m=hl();if(m){const{x:A,right:D,left:$,top:R}=m;s.top=ml()+R-_,s.left=gl()+A+(D-$)/2-v.width/2;}});}function p(g){const v=vue.unref(a);return v?v.contains(g):!1}window.addEventListener("mousedown",function(g){g.target&&on().contains(g.target)||u(!1);},!0),window.addEventListener("mouseup",function(g){const v=g.target&&on().contains(g.target),_=g.target&&p(g.target);v?_?_&&u(!1):xe.value="":(xe.value=fl(),u(!!xe.value&&d)),d=!1;},!0),document.addEventListener("selectionchange",function(){},!0),document.addEventListener("selectstart",function(){d=!0;},!1);function b(g,v){const _=encodeURIComponent(xe.value||"");v?window.open(g.url.split("%s").join(_)):window.location.href=g.url.split("%s").join(_);}function f(){n.emit("open-dialog",xe.value);}return {toolbarVisible:o,list:t,visible:i,mounted:r,toolbarEle:a,style:c,selectionShort:l,handleClick:b,openMainDialog:f}}};function bl(e,n,o,t,i,r){const a=vue.resolveComponent("favicon"),s=vue.resolveComponent("icon");return t.toolbarVisible===1&&t.mounted?vue.withDirectives((vue.openBlock(),vue.createElementBlock("div",{key:0,class:"bar-container",ref:"toolbarEle",style:vue.normalizeStyle(t.style)},[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(t.list,(c,l)=>(vue.openBlock(),vue.createBlock(a,{class:"tool-bar-item",key:`${l}-${c.url}-${c.icon||""}`,url:c.url,icon:c.icon,title:c.nameZh,onClick:[vue.withModifiers(d=>t.handleClick(c,!0),["exact"]),vue.withModifiers(d=>t.handleClick(c,!1),["ctrl","exact"])],onMouseup:vue.withModifiers(d=>t.handleClick(c,!1),["middle","exact"])},null,8,["url","icon","title","onClick","onMouseup"]))),128)),vue.createElementVNode("div",{class:"tool-bar-item",onClick:n[0]||(n[0]=(...c)=>t.openMainDialog&&t.openMainDialog(...c))},[vue.createVNode(s,{class:"as-more-icon",name:"more"})])],4)),[[vue.vShow,t.visible]]):vue.createCommentVNode("",!0)}const yl=W(vl,[["render",bl],["__scopeId","data-v-1d452dee"]]);const wl={name:"as-dialog",model:{prop:"visible",event:"change"},props:{visible:{type:Boolean,default:!1},title:{type:String,default:""},width:{type:String,default:""}},setup(e,n){const o=vue.computed(()=>{const r={};return e.width&&(r.width=e.width),r}),t=vue.computed({get:()=>e.visible,set:r=>{n.emit("update:visible",r);}});return {style:o,handleClose:()=>{t.value=!1;},localVisible:t}}},xl={class:"as-dialog"},_l={class:"as-dialog__header"},kl={class:"as-dialog__body"};function jl(e,n,o,t,i,r){return vue.withDirectives((vue.openBlock(),vue.createElementBlock("div",xl,[vue.createElementVNode("div",{class:"as-dialog-container",style:vue.normalizeStyle(t.style)},[vue.createElementVNode("div",_l,[vue.renderSlot(e.$slots,"header")]),vue.createElementVNode("div",kl,[vue.renderSlot(e.$slots,"default")])],4),vue.createElementVNode("div",{class:"as-dialog__mask",onClick:n[0]||(n[0]=(...a)=>t.handleClose&&t.handleClose(...a))})],512)),[[vue.vShow,t.localVisible]])}const Sl=W(wl,[["render",jl]]);const El={name:"search-dialog",components:{asDialog:Sl,icon:Yt,favicon:Xt,scrollbar:si},props:{visible:{type:Boolean,default:!1},keyword:{type:[String,Number],default:""}},emits:["update:visible"],setup(e,n){const o=vue.computed({get:()=>e.visible,set:s=>{n.emit("update:visible",s);}});vue.watch(()=>e.visible,s=>{t.value=s?e.keyword:"";});const t=vue.ref(""),{sites:i}=rt("tm"),{openInNewTab:r}=Kt();return {localVisible:o,sites:i,inputValue:t,handleClick:(s,c)=>{const l=encodeURIComponent(t.value||"");c||r.value?window.open(s.url.split("%s").join(l)):window.location.href=s.url.split("%s").join(l);}}}},Cl={class:"se-header"},zl={class:"se-input-box"},Tl={class:"se-container"},Ml={class:"cate-name"},Dl=["textContent"],Al={class:"cate-list"},Ol=["onClick","onMouseup"],Ll=["textContent"];function Il(e,n,o,t,i,r){const a=vue.resolveComponent("icon"),s=vue.resolveComponent("favicon"),c=vue.resolveComponent("scrollbar"),l=vue.resolveComponent("as-dialog");return vue.openBlock(),vue.createBlock(l,{visible:t.localVisible,"onUpdate:visible":n[1]||(n[1]=d=>t.localVisible=d)},{header:vue.withCtx(()=>[vue.createElementVNode("div",Cl,[vue.createElementVNode("div",zl,[t.localVisible?vue.withDirectives((vue.openBlock(),vue.createElementBlock("input",{key:0,autofocus:"",autocomplete:"off",class:"se-input",placeholder:"输入并搜索",type:"text","onUpdate:modelValue":n[0]||(n[0]=d=>t.inputValue=d)},null,512)),[[vue.vModelText,t.inputValue]]):vue.createCommentVNode("",!0)])])]),default:vue.withCtx(()=>[t.localVisible?(vue.openBlock(),vue.createBlock(c,{key:0,class:"se-scrollbar-container",noresize:""},{default:vue.withCtx(()=>[vue.createElementVNode("div",Tl,[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(t.sites,d=>(vue.openBlock(),vue.createElementBlock("div",{key:d.name,class:"cate-container"},[vue.createElementVNode("p",Ml,[vue.createVNode(a,{name:d.name},null,8,["name"]),vue.createElementVNode("span",{textContent:vue.toDisplayString(d.nameZh)},null,8,Dl)]),vue.createElementVNode("ul",Al,[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(d.list,(u,p)=>(vue.openBlock(),vue.createElementBlock("li",{key:`${d.name}_${p}`,class:"cate-item"},[vue.createElementVNode("a",{href:"javascript:void 0",onClick:[vue.withModifiers(b=>t.handleClick(u),["exact"]),vue.withModifiers(b=>t.handleClick(u,!0),["ctrl","exact"])],onMouseup:vue.withModifiers(b=>t.handleClick(u,!0),["middle","exact"])},[(vue.openBlock(),vue.createBlock(s,{key:`${u.url}-${u.icon||""}`,class:"as-url-icon",url:u.url,icon:u.icon},null,8,["url","icon"])),vue.createElementVNode("p",{class:"as-subMenu-text",textContent:vue.toDisplayString(u.nameZh)},null,8,Ll)],40,Ol)]))),128))])]))),128))])]),_:1})):vue.createCommentVNode("",!0)]),_:1},8,["visible"])}const Vl=W(El,[["render",Il]]);/*! Element Plus Icons Vue v2.3.1 */var Nl=vue.defineComponent({name:"ArrowLeft",__name:"arrow-left",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"})]))}}),Rl=Nl,Pl=vue.defineComponent({name:"ArrowRight",__name:"arrow-right",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"})]))}}),$l=Pl,Bl=vue.defineComponent({name:"Close",__name:"close",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"})]))}}),Zl=Bl,ql=vue.defineComponent({name:"DCaret",__name:"d-caret",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"m512 128 288 320H224zM224 576h576L512 896z"})]))}}),Hl=ql,Fl=vue.defineComponent({name:"Delete",__name:"delete",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"})]))}}),mi=Fl,Ul=vue.defineComponent({name:"Hide",__name:"hide",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"}),vue.createElementVNode("path",{fill:"currentColor",d:"M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"})]))}}),gi=Ul,Gl=vue.defineComponent({name:"Picture",__name:"picture",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M160 160v704h704V160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32"}),vue.createElementVNode("path",{fill:"currentColor",d:"M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64M185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952z"})]))}}),Wl=Gl,Yl=vue.defineComponent({name:"Plus",__name:"plus",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"})]))}}),Xl=Yl,Kl=vue.defineComponent({name:"View",__name:"view",setup(e){return (n,o)=>(vue.openBlock(),vue.createElementBlock("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024"},[vue.createElementVNode("path",{fill:"currentColor",d:"M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"})]))}}),vi=Kl;/*!
    * vue-draggable-next v2.2.0
    * (c) 2023 Anish George
    * @license MIT
    *//**!
   * Sortable 1.14.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */function So(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),o.push.apply(o,t);}return o}function ze(e){for(var n=1;n<arguments.length;n++){var o=arguments[n]!=null?arguments[n]:{};n%2?So(Object(o),!0).forEach(function(t){Jl(e,t,o[t]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):So(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t));});}return e}function Pn(e){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Pn=function(n){return typeof n}:Pn=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},Pn(e)}function Jl(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function Ae(){return Ae=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t]);}return e},Ae.apply(this,arguments)}function Ql(e,n){if(e==null)return {};var o={},t=Object.keys(e),i,r;for(r=0;r<t.length;r++)i=t[r],!(n.indexOf(i)>=0)&&(o[i]=e[i]);return o}function ec(e,n){if(e==null)return {};var o=Ql(e,n),t,i;if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)t=r[i],!(n.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t]);}return o}var nc="1.14.0";function Te(e){if(typeof window<"u"&&window.navigator)return !!navigator.userAgent.match(e)}var Oe=Te(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),En=Te(/Edge/i),Eo=Te(/firefox/i),vn=Te(/safari/i)&&!Te(/chrome/i)&&!Te(/android/i),bi=Te(/iP(ad|od|hone)/i),tc=Te(/chrome/i)&&Te(/android/i),yi={capture:!1,passive:!1};function V(e,n,o){e.addEventListener(n,o,!Oe&&yi);}function I(e,n,o){e.removeEventListener(n,o,!Oe&&yi);}function Xn(e,n){if(n){if(n[0]===">"&&(n=n.substring(1)),e)try{if(e.matches)return e.matches(n);if(e.msMatchesSelector)return e.msMatchesSelector(n);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(n)}catch{return !1}return !1}}function oc(e){return e.host&&e!==document&&e.host.nodeType?e.host:e.parentNode}function Ee(e,n,o,t){if(e){o=o||document;do{if(n!=null&&(n[0]===">"?e.parentNode===o&&Xn(e,n):Xn(e,n))||t&&e===o)return e;if(e===o)break}while(e=oc(e))}return null}var Co=/\s+/g;function ue(e,n,o){if(e&&n)if(e.classList)e.classList[o?"add":"remove"](n);else {var t=(" "+e.className+" ").replace(Co," ").replace(" "+n+" "," ");e.className=(t+(o?" "+n:"")).replace(Co," ");}}function E(e,n,o){var t=e&&e.style;if(t){if(o===void 0)return document.defaultView&&document.defaultView.getComputedStyle?o=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(o=e.currentStyle),n===void 0?o:o[n];!(n in t)&&n.indexOf("webkit")===-1&&(n="-webkit-"+n),t[n]=o+(typeof o=="string"?"":"px");}}function tn(e,n){var o="";if(typeof e=="string")o=e;else do{var t=E(e,"transform");t&&t!=="none"&&(o=t+" "+o);}while(!n&&(e=e.parentNode));var i=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return i&&new i(o)}function wi(e,n,o){if(e){var t=e.getElementsByTagName(n),i=0,r=t.length;if(o)for(;i<r;i++)o(t[i],i);return t}return []}function Ce(){var e=document.scrollingElement;return e||document.documentElement}function K(e,n,o,t,i){if(!(!e.getBoundingClientRect&&e!==window)){var r,a,s,c,l,d,u;if(e!==window&&e.parentNode&&e!==Ce()?(r=e.getBoundingClientRect(),a=r.top,s=r.left,c=r.bottom,l=r.right,d=r.height,u=r.width):(a=0,s=0,c=window.innerHeight,l=window.innerWidth,d=window.innerHeight,u=window.innerWidth),(n||o)&&e!==window&&(i=i||e.parentNode,!Oe))do if(i&&i.getBoundingClientRect&&(E(i,"transform")!=="none"||o&&E(i,"position")!=="static")){var p=i.getBoundingClientRect();a-=p.top+parseInt(E(i,"border-top-width")),s-=p.left+parseInt(E(i,"border-left-width")),c=a+r.height,l=s+r.width;break}while(i=i.parentNode);if(t&&e!==window){var b=tn(i||e),f=b&&b.a,g=b&&b.d;b&&(a/=g,s/=f,u/=f,d/=g,c=a+d,l=s+u);}return {top:a,left:s,bottom:c,right:l,width:u,height:d}}}function zo(e,n,o){for(var t=Be(e,!0),i=K(e)[n];t;){var r=K(t)[o],a=void 0;if(o==="top"||o==="left"?a=i>=r:a=i<=r,!a)return t;if(t===Ce())break;t=Be(t,!1);}return !1}function an(e,n,o,t){for(var i=0,r=0,a=e.children;r<a.length;){if(a[r].style.display!=="none"&&a[r]!==C.ghost&&(t||a[r]!==C.dragged)&&Ee(a[r],o.draggable,e,!1)){if(i===n)return a[r];i++;}r++;}return null}function no(e,n){for(var o=e.lastElementChild;o&&(o===C.ghost||E(o,"display")==="none"||n&&!Xn(o,n));)o=o.previousElementSibling;return o||null}function me(e,n){var o=0;if(!e||!e.parentNode)return -1;for(;e=e.previousElementSibling;)e.nodeName.toUpperCase()!=="TEMPLATE"&&e!==C.clone&&(!n||Xn(e,n))&&o++;return o}function To(e){var n=0,o=0,t=Ce();if(e)do{var i=tn(e),r=i.a,a=i.d;n+=e.scrollLeft*r,o+=e.scrollTop*a;}while(e!==t&&(e=e.parentNode));return [n,o]}function ic(e,n){for(var o in e)if(e.hasOwnProperty(o)){for(var t in n)if(n.hasOwnProperty(t)&&n[t]===e[o][t])return Number(o)}return -1}function Be(e,n){if(!e||!e.getBoundingClientRect)return Ce();var o=e,t=!1;do if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=E(o);if(o.clientWidth<o.scrollWidth&&(i.overflowX=="auto"||i.overflowX=="scroll")||o.clientHeight<o.scrollHeight&&(i.overflowY=="auto"||i.overflowY=="scroll")){if(!o.getBoundingClientRect||o===document.body)return Ce();if(t||n)return o;t=!0;}}while(o=o.parentNode);return Ce()}function rc(e,n){if(e&&n)for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o]);return e}function yt(e,n){return Math.round(e.top)===Math.round(n.top)&&Math.round(e.left)===Math.round(n.left)&&Math.round(e.height)===Math.round(n.height)&&Math.round(e.width)===Math.round(n.width)}var bn;function xi(e,n){return function(){if(!bn){var o=arguments,t=this;o.length===1?e.call(t,o[0]):e.apply(t,o),bn=setTimeout(function(){bn=void 0;},n);}}}function ac(){clearTimeout(bn),bn=void 0;}function _i(e,n,o){e.scrollLeft+=n,e.scrollTop+=o;}function ki(e){var n=window.Polymer,o=window.jQuery||window.Zepto;return n&&n.dom?n.dom(e).cloneNode(!0):o?o(e).clone(!0)[0]:e.cloneNode(!0)}var fe="Sortable"+new Date().getTime();function sc(){var e=[],n;return {captureAnimationState:function(){if(e=[],!!this.options.animation){var t=[].slice.call(this.el.children);t.forEach(function(i){if(!(E(i,"display")==="none"||i===C.ghost)){e.push({target:i,rect:K(i)});var r=ze({},e[e.length-1].rect);if(i.thisAnimationDuration){var a=tn(i,!0);a&&(r.top-=a.f,r.left-=a.e);}i.fromRect=r;}});}},addAnimationState:function(t){e.push(t);},removeAnimationState:function(t){e.splice(ic(e,{target:t}),1);},animateAll:function(t){var i=this;if(!this.options.animation){clearTimeout(n),typeof t=="function"&&t();return}var r=!1,a=0;e.forEach(function(s){var c=0,l=s.target,d=l.fromRect,u=K(l),p=l.prevFromRect,b=l.prevToRect,f=s.rect,g=tn(l,!0);g&&(u.top-=g.f,u.left-=g.e),l.toRect=u,l.thisAnimationDuration&&yt(p,u)&&!yt(d,u)&&(f.top-u.top)/(f.left-u.left)===(d.top-u.top)/(d.left-u.left)&&(c=cc(f,p,b,i.options)),yt(u,d)||(l.prevFromRect=d,l.prevToRect=u,c||(c=i.options.animation),i.animate(l,f,u,c)),c&&(r=!0,a=Math.max(a,c),clearTimeout(l.animationResetTimer),l.animationResetTimer=setTimeout(function(){l.animationTime=0,l.prevFromRect=null,l.fromRect=null,l.prevToRect=null,l.thisAnimationDuration=null;},c),l.thisAnimationDuration=c);}),clearTimeout(n),r?n=setTimeout(function(){typeof t=="function"&&t();},a):typeof t=="function"&&t(),e=[];},animate:function(t,i,r,a){if(a){E(t,"transition",""),E(t,"transform","");var s=tn(this.el),c=s&&s.a,l=s&&s.d,d=(i.left-r.left)/(c||1),u=(i.top-r.top)/(l||1);t.animatingX=!!d,t.animatingY=!!u,E(t,"transform","translate3d("+d+"px,"+u+"px,0)"),this.forRepaintDummy=lc(t),E(t,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),E(t,"transform","translate3d(0,0,0)"),typeof t.animated=="number"&&clearTimeout(t.animated),t.animated=setTimeout(function(){E(t,"transition",""),E(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1;},a);}}}}function lc(e){return e.offsetWidth}function cc(e,n,o,t){return Math.sqrt(Math.pow(n.top-e.top,2)+Math.pow(n.left-e.left,2))/Math.sqrt(Math.pow(n.top-o.top,2)+Math.pow(n.left-o.left,2))*t.animation}var Ye=[],wt={initializeByDefault:!0},Cn={mount:function(n){for(var o in wt)wt.hasOwnProperty(o)&&!(o in n)&&(n[o]=wt[o]);Ye.forEach(function(t){if(t.pluginName===n.pluginName)throw "Sortable: Cannot mount plugin ".concat(n.pluginName," more than once")}),Ye.push(n);},pluginEvent:function(n,o,t){var i=this;this.eventCanceled=!1,t.cancel=function(){i.eventCanceled=!0;};var r=n+"Global";Ye.forEach(function(a){o[a.pluginName]&&(o[a.pluginName][r]&&o[a.pluginName][r](ze({sortable:o},t)),o.options[a.pluginName]&&o[a.pluginName][n]&&o[a.pluginName][n](ze({sortable:o},t)));});},initializePlugins:function(n,o,t,i){Ye.forEach(function(s){var c=s.pluginName;if(!(!n.options[c]&&!s.initializeByDefault)){var l=new s(n,o,n.options);l.sortable=n,l.options=n.options,n[c]=l,Ae(t,l.defaults);}});for(var r in n.options)if(n.options.hasOwnProperty(r)){var a=this.modifyOption(n,r,n.options[r]);typeof a<"u"&&(n.options[r]=a);}},getEventProperties:function(n,o){var t={};return Ye.forEach(function(i){typeof i.eventProperties=="function"&&Ae(t,i.eventProperties.call(o[i.pluginName],n));}),t},modifyOption:function(n,o,t){var i;return Ye.forEach(function(r){n[r.pluginName]&&r.optionListeners&&typeof r.optionListeners[o]=="function"&&(i=r.optionListeners[o].call(n[r.pluginName],t));}),i}};function dc(e){var n=e.sortable,o=e.rootEl,t=e.name,i=e.targetEl,r=e.cloneEl,a=e.toEl,s=e.fromEl,c=e.oldIndex,l=e.newIndex,d=e.oldDraggableIndex,u=e.newDraggableIndex,p=e.originalEvent,b=e.putSortable,f=e.extraEventProperties;if(n=n||o&&o[fe],!!n){var g,v=n.options,_="on"+t.charAt(0).toUpperCase()+t.substr(1);window.CustomEvent&&!Oe&&!En?g=new CustomEvent(t,{bubbles:!0,cancelable:!0}):(g=document.createEvent("Event"),g.initEvent(t,!0,!0)),g.to=a||o,g.from=s||o,g.item=i||o,g.clone=r,g.oldIndex=c,g.newIndex=l,g.oldDraggableIndex=d,g.newDraggableIndex=u,g.originalEvent=p,g.pullMode=b?b.lastPutMode:void 0;var m=ze(ze({},f),Cn.getEventProperties(t,n));for(var A in m)g[A]=m[A];o&&o.dispatchEvent(g),v[_]&&v[_].call(n,g);}}var uc=["evt"],ce=function(n,o){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},i=t.evt,r=ec(t,uc);Cn.pluginEvent.bind(C)(n,o,ze({dragEl:y,parentEl:Z,ghostEl:M,rootEl:P,nextEl:Ue,lastDownEl:$n,cloneEl:q,cloneHidden:$e,dragStarted:pn,putSortable:te,activeSortable:C.active,originalEvent:i,oldIndex:en,oldDraggableIndex:yn,newIndex:pe,newDraggableIndex:Ne,hideGhostForTarget:Ci,unhideGhostForTarget:zi,cloneNowHidden:function(){$e=!0;},cloneNowShown:function(){$e=!1;},dispatchSortableEvent:function(s){le({sortable:o,name:s,originalEvent:i});}},r));};function le(e){dc(ze({putSortable:te,cloneEl:q,targetEl:y,rootEl:P,oldIndex:en,oldDraggableIndex:yn,newIndex:pe,newDraggableIndex:Ne},e));}var y,Z,M,P,Ue,$n,q,$e,en,pe,yn,Ne,On,te,Qe=!1,Kn=!1,Jn=[],qe,we,xt,_t,Mo,Do,pn,Xe,wn,xn=!1,Ln=!1,Bn,ie,kt=[],Lt=!1,Qn=[],dt=typeof document<"u",In=bi,Ao=En||Oe?"cssFloat":"float",pc=dt&&!tc&&!bi&&"draggable"in document.createElement("div"),ji=function(){if(dt){if(Oe)return !1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto",e.style.pointerEvents==="auto"}}(),Si=function(n,o){var t=E(n),i=parseInt(t.width)-parseInt(t.paddingLeft)-parseInt(t.paddingRight)-parseInt(t.borderLeftWidth)-parseInt(t.borderRightWidth),r=an(n,0,o),a=an(n,1,o),s=r&&E(r),c=a&&E(a),l=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+K(r).width,d=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+K(a).width;if(t.display==="flex")return t.flexDirection==="column"||t.flexDirection==="column-reverse"?"vertical":"horizontal";if(t.display==="grid")return t.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&s.float&&s.float!=="none"){var u=s.float==="left"?"left":"right";return a&&(c.clear==="both"||c.clear===u)?"vertical":"horizontal"}return r&&(s.display==="block"||s.display==="flex"||s.display==="table"||s.display==="grid"||l>=i&&t[Ao]==="none"||a&&t[Ao]==="none"&&l+d>i)?"vertical":"horizontal"},fc=function(n,o,t){var i=t?n.left:n.top,r=t?n.right:n.bottom,a=t?n.width:n.height,s=t?o.left:o.top,c=t?o.right:o.bottom,l=t?o.width:o.height;return i===s||r===c||i+a/2===s+l/2},hc=function(n,o){var t;return Jn.some(function(i){var r=i[fe].options.emptyInsertThreshold;if(!(!r||no(i))){var a=K(i),s=n>=a.left-r&&n<=a.right+r,c=o>=a.top-r&&o<=a.bottom+r;if(s&&c)return t=i}}),t},Ei=function(n){function o(r,a){return function(s,c,l,d){var u=s.options.group.name&&c.options.group.name&&s.options.group.name===c.options.group.name;if(r==null&&(a||u))return !0;if(r==null||r===!1)return !1;if(a&&r==="clone")return r;if(typeof r=="function")return o(r(s,c,l,d),a)(s,c,l,d);var p=(a?s:c).options.group.name;return r===!0||typeof r=="string"&&r===p||r.join&&r.indexOf(p)>-1}}var t={},i=n.group;(!i||Pn(i)!="object")&&(i={name:i}),t.name=i.name,t.checkPull=o(i.pull,!0),t.checkPut=o(i.put),t.revertClone=i.revertClone,n.group=t;},Ci=function(){!ji&&M&&E(M,"display","none");},zi=function(){!ji&&M&&E(M,"display","");};dt&&document.addEventListener("click",function(e){if(Kn)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),Kn=!1,!1},!0);var He=function(n){if(y){n=n.touches?n.touches[0]:n;var o=hc(n.clientX,n.clientY);if(o){var t={};for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);t.target=t.rootEl=o,t.preventDefault=void 0,t.stopPropagation=void 0,o[fe]._onDragOver(t);}}},mc=function(n){y&&y.parentNode[fe]._isOutsideThisEl(n.target);};function C(e,n){if(!(e&&e.nodeType&&e.nodeType===1))throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=n=Ae({},n),e[fe]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Si(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(a,s){a.setData("Text",s.textContent);},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:C.supportPointer!==!1&&"PointerEvent"in window&&!vn,emptyInsertThreshold:5};Cn.initializePlugins(this,e,o);for(var t in o)!(t in n)&&(n[t]=o[t]);Ei(n);for(var i in this)i.charAt(0)==="_"&&typeof this[i]=="function"&&(this[i]=this[i].bind(this));this.nativeDraggable=n.forceFallback?!1:pc,this.nativeDraggable&&(this.options.touchStartThreshold=1),n.supportPointer?V(e,"pointerdown",this._onTapStart):(V(e,"mousedown",this._onTapStart),V(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(V(e,"dragover",this),V(e,"dragenter",this)),Jn.push(this.el),n.store&&n.store.get&&this.sort(n.store.get(this)||[]),Ae(this,sc());}C.prototype={constructor:C,_isOutsideThisEl:function(n){!this.el.contains(n)&&n!==this.el&&(Xe=null);},_getDirection:function(n,o){return typeof this.options.direction=="function"?this.options.direction.call(this,n,o,y):this.options.direction},_onTapStart:function(n){if(n.cancelable){var o=this,t=this.el,i=this.options,r=i.preventOnFilter,a=n.type,s=n.touches&&n.touches[0]||n.pointerType&&n.pointerType==="touch"&&n,c=(s||n).target,l=n.target.shadowRoot&&(n.path&&n.path[0]||n.composedPath&&n.composedPath()[0])||c,d=i.filter;if(kc(t),!y&&!(/mousedown|pointerdown/.test(a)&&n.button!==0||i.disabled)&&!l.isContentEditable&&!(!this.nativeDraggable&&vn&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=Ee(c,i.draggable,t,!1),!(c&&c.animated)&&$n!==c)){if(en=me(c),yn=me(c,i.draggable),typeof d=="function"){if(d.call(this,n,c,this)){le({sortable:o,rootEl:l,name:"filter",targetEl:c,toEl:t,fromEl:t}),ce("filter",o,{evt:n}),r&&n.cancelable&&n.preventDefault();return}}else if(d&&(d=d.split(",").some(function(u){if(u=Ee(l,u.trim(),t,!1),u)return le({sortable:o,rootEl:u,name:"filter",targetEl:c,fromEl:t,toEl:t}),ce("filter",o,{evt:n}),!0}),d)){r&&n.cancelable&&n.preventDefault();return}i.handle&&!Ee(l,i.handle,t,!1)||this._prepareDragStart(n,s,c);}}},_prepareDragStart:function(n,o,t){var i=this,r=i.el,a=i.options,s=r.ownerDocument,c;if(t&&!y&&t.parentNode===r){var l=K(t);if(P=r,y=t,Z=y.parentNode,Ue=y.nextSibling,$n=t,On=a.group,C.dragged=y,qe={target:y,clientX:(o||n).clientX,clientY:(o||n).clientY},Mo=qe.clientX-l.left,Do=qe.clientY-l.top,this._lastX=(o||n).clientX,this._lastY=(o||n).clientY,y.style["will-change"]="all",c=function(){if(ce("delayEnded",i,{evt:n}),C.eventCanceled){i._onDrop();return}i._disableDelayedDragEvents(),!Eo&&i.nativeDraggable&&(y.draggable=!0),i._triggerDragStart(n,o),le({sortable:i,name:"choose",originalEvent:n}),ue(y,a.chosenClass,!0);},a.ignore.split(",").forEach(function(d){wi(y,d.trim(),jt);}),V(s,"dragover",He),V(s,"mousemove",He),V(s,"touchmove",He),V(s,"mouseup",i._onDrop),V(s,"touchend",i._onDrop),V(s,"touchcancel",i._onDrop),Eo&&this.nativeDraggable&&(this.options.touchStartThreshold=4,y.draggable=!0),ce("delayStart",this,{evt:n}),a.delay&&(!a.delayOnTouchOnly||o)&&(!this.nativeDraggable||!(En||Oe))){if(C.eventCanceled){this._onDrop();return}V(s,"mouseup",i._disableDelayedDrag),V(s,"touchend",i._disableDelayedDrag),V(s,"touchcancel",i._disableDelayedDrag),V(s,"mousemove",i._delayedDragTouchMoveHandler),V(s,"touchmove",i._delayedDragTouchMoveHandler),a.supportPointer&&V(s,"pointermove",i._delayedDragTouchMoveHandler),i._dragStartTimer=setTimeout(c,a.delay);}else c();}},_delayedDragTouchMoveHandler:function(n){var o=n.touches?n.touches[0]:n;Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag();},_disableDelayedDrag:function(){y&&jt(y),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents();},_disableDelayedDragEvents:function(){var n=this.el.ownerDocument;I(n,"mouseup",this._disableDelayedDrag),I(n,"touchend",this._disableDelayedDrag),I(n,"touchcancel",this._disableDelayedDrag),I(n,"mousemove",this._delayedDragTouchMoveHandler),I(n,"touchmove",this._delayedDragTouchMoveHandler),I(n,"pointermove",this._delayedDragTouchMoveHandler);},_triggerDragStart:function(n,o){o=o||n.pointerType=="touch"&&n,!this.nativeDraggable||o?this.options.supportPointer?V(document,"pointermove",this._onTouchMove):o?V(document,"touchmove",this._onTouchMove):V(document,"mousemove",this._onTouchMove):(V(y,"dragend",this),V(P,"dragstart",this._onDragStart));try{document.selection?Zn(function(){document.selection.empty();}):window.getSelection().removeAllRanges();}catch{}},_dragStarted:function(n,o){if(Qe=!1,P&&y){ce("dragStarted",this,{evt:o}),this.nativeDraggable&&V(document,"dragover",mc);var t=this.options;!n&&ue(y,t.dragClass,!1),ue(y,t.ghostClass,!0),C.active=this,n&&this._appendGhost(),le({sortable:this,name:"start",originalEvent:o});}else this._nulling();},_emulateDragOver:function(){if(we){this._lastX=we.clientX,this._lastY=we.clientY,Ci();for(var n=document.elementFromPoint(we.clientX,we.clientY),o=n;n&&n.shadowRoot&&(n=n.shadowRoot.elementFromPoint(we.clientX,we.clientY),n!==o);)o=n;if(y.parentNode[fe]._isOutsideThisEl(n),o)do{if(o[fe]){var t=void 0;if(t=o[fe]._onDragOver({clientX:we.clientX,clientY:we.clientY,target:n,rootEl:o}),t&&!this.options.dragoverBubble)break}n=o;}while(o=o.parentNode);zi();}},_onTouchMove:function(n){if(qe){var o=this.options,t=o.fallbackTolerance,i=o.fallbackOffset,r=n.touches?n.touches[0]:n,a=M&&tn(M,!0),s=M&&a&&a.a,c=M&&a&&a.d,l=In&&ie&&To(ie),d=(r.clientX-qe.clientX+i.x)/(s||1)+(l?l[0]-kt[0]:0)/(s||1),u=(r.clientY-qe.clientY+i.y)/(c||1)+(l?l[1]-kt[1]:0)/(c||1);if(!C.active&&!Qe){if(t&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<t)return;this._onDragStart(n,!0);}if(M){a?(a.e+=d-(xt||0),a.f+=u-(_t||0)):a={a:1,b:0,c:0,d:1,e:d,f:u};var p="matrix(".concat(a.a,",").concat(a.b,",").concat(a.c,",").concat(a.d,",").concat(a.e,",").concat(a.f,")");E(M,"webkitTransform",p),E(M,"mozTransform",p),E(M,"msTransform",p),E(M,"transform",p),xt=d,_t=u,we=r;}n.cancelable&&n.preventDefault();}},_appendGhost:function(){if(!M){var n=this.options.fallbackOnBody?document.body:P,o=K(y,!0,In,!0,n),t=this.options;if(In){for(ie=n;E(ie,"position")==="static"&&E(ie,"transform")==="none"&&ie!==document;)ie=ie.parentNode;ie!==document.body&&ie!==document.documentElement?(ie===document&&(ie=Ce()),o.top+=ie.scrollTop,o.left+=ie.scrollLeft):ie=Ce(),kt=To(ie);}M=y.cloneNode(!0),ue(M,t.ghostClass,!1),ue(M,t.fallbackClass,!0),ue(M,t.dragClass,!0),E(M,"transition",""),E(M,"transform",""),E(M,"box-sizing","border-box"),E(M,"margin",0),E(M,"top",o.top),E(M,"left",o.left),E(M,"width",o.width),E(M,"height",o.height),E(M,"opacity","0.8"),E(M,"position",In?"absolute":"fixed"),E(M,"zIndex","100000"),E(M,"pointerEvents","none"),C.ghost=M,n.appendChild(M),E(M,"transform-origin",Mo/parseInt(M.style.width)*100+"% "+Do/parseInt(M.style.height)*100+"%");}},_onDragStart:function(n,o){var t=this,i=n.dataTransfer,r=t.options;if(ce("dragStart",this,{evt:n}),C.eventCanceled){this._onDrop();return}ce("setupClone",this),C.eventCanceled||(q=ki(y),q.draggable=!1,q.style["will-change"]="",this._hideClone(),ue(q,this.options.chosenClass,!1),C.clone=q),t.cloneId=Zn(function(){ce("clone",t),!C.eventCanceled&&(t.options.removeCloneOnHide||P.insertBefore(q,y),t._hideClone(),le({sortable:t,name:"clone"}));}),!o&&ue(y,r.dragClass,!0),o?(Kn=!0,t._loopId=setInterval(t._emulateDragOver,50)):(I(document,"mouseup",t._onDrop),I(document,"touchend",t._onDrop),I(document,"touchcancel",t._onDrop),i&&(i.effectAllowed="move",r.setData&&r.setData.call(t,i,y)),V(document,"drop",t),E(y,"transform","translateZ(0)")),Qe=!0,t._dragStartId=Zn(t._dragStarted.bind(t,o,n)),V(document,"selectstart",t),pn=!0,vn&&E(document.body,"user-select","none");},_onDragOver:function(n){var o=this.el,t=n.target,i,r,a,s=this.options,c=s.group,l=C.active,d=On===c,u=s.sort,p=te||l,b,f=this,g=!1;if(Lt)return;function v(Se,ln){ce(Se,f,ze({evt:n,isOwner:d,axis:b?"vertical":"horizontal",revert:a,dragRect:i,targetRect:r,canSort:u,fromSortable:p,target:t,completed:m,onMove:function(zn,Tn){return Vn(P,o,y,i,zn,K(zn),n,Tn)},changed:A},ln));}function _(){v("dragOverAnimationCapture"),f.captureAnimationState(),f!==p&&p.captureAnimationState();}function m(Se){return v("dragOverCompleted",{insertion:Se}),Se&&(d?l._hideClone():l._showClone(f),f!==p&&(ue(y,te?te.options.ghostClass:l.options.ghostClass,!1),ue(y,s.ghostClass,!0)),te!==f&&f!==C.active?te=f:f===C.active&&te&&(te=null),p===f&&(f._ignoreWhileAnimating=t),f.animateAll(function(){v("dragOverAnimationComplete"),f._ignoreWhileAnimating=null;}),f!==p&&(p.animateAll(),p._ignoreWhileAnimating=null)),(t===y&&!y.animated||t===o&&!t.animated)&&(Xe=null),!s.dragoverBubble&&!n.rootEl&&t!==document&&(y.parentNode[fe]._isOutsideThisEl(n.target),!Se&&He(n)),!s.dragoverBubble&&n.stopPropagation&&n.stopPropagation(),g=!0}function A(){pe=me(y),Ne=me(y,s.draggable),le({sortable:f,name:"change",toEl:o,newIndex:pe,newDraggableIndex:Ne,originalEvent:n});}if(n.preventDefault!==void 0&&n.cancelable&&n.preventDefault(),t=Ee(t,s.draggable,o,!0),v("dragOver"),C.eventCanceled)return g;if(y.contains(n.target)||t.animated&&t.animatingX&&t.animatingY||f._ignoreWhileAnimating===t)return m(!1);if(Kn=!1,l&&!s.disabled&&(d?u||(a=Z!==P):te===this||(this.lastPutMode=On.checkPull(this,l,y,n))&&c.checkPut(this,l,y,n))){if(b=this._getDirection(n,t)==="vertical",i=K(y),v("dragOverValid"),C.eventCanceled)return g;if(a)return Z=P,_(),this._hideClone(),v("revert"),C.eventCanceled||(Ue?P.insertBefore(y,Ue):P.appendChild(y)),m(!0);var D=no(o,s.draggable);if(!D||yc(n,b,this)&&!D.animated){if(D===y)return m(!1);if(D&&o===n.target&&(t=D),t&&(r=K(t)),Vn(P,o,y,i,t,r,n,!!t)!==!1)return _(),o.appendChild(y),Z=o,A(),m(!0)}else if(D&&bc(n,b,this)){var $=an(o,0,s,!0);if($===y)return m(!1);if(t=$,r=K(t),Vn(P,o,y,i,t,r,n,!1)!==!1)return _(),o.insertBefore(y,$),Z=o,A(),m(!0)}else if(t.parentNode===o){r=K(t);var R=0,B,F=y.parentNode!==o,ae=!fc(y.animated&&y.toRect||i,t.animated&&t.toRect||r,b),se=b?"top":"left",ve=zo(t,"top","top")||zo(y,"top","top"),Le=ve?ve.scrollTop:void 0;Xe!==t&&(B=r[se],xn=!1,Ln=!ae&&s.invertSwap||F),R=wc(n,t,r,b,ae?1:s.swapThreshold,s.invertedSwapThreshold==null?s.swapThreshold:s.invertedSwapThreshold,Ln,Xe===t);var he;if(R!==0){var be=me(y);do be-=R,he=Z.children[be];while(he&&(E(he,"display")==="none"||he===M))}if(R===0||he===t)return m(!1);Xe=t,wn=R;var de=t.nextElementSibling,ne=!1;ne=R===1;var Ie=Vn(P,o,y,i,t,r,n,ne);if(Ie!==!1)return (Ie===1||Ie===-1)&&(ne=Ie===1),Lt=!0,setTimeout(vc,30),_(),ne&&!de?o.appendChild(y):t.parentNode.insertBefore(y,ne?de:t),ve&&_i(ve,0,Le-ve.scrollTop),Z=y.parentNode,B!==void 0&&!Ln&&(Bn=Math.abs(B-K(t)[se])),A(),m(!0)}if(o.contains(y))return m(!1)}return !1},_ignoreWhileAnimating:null,_offMoveEvents:function(){I(document,"mousemove",this._onTouchMove),I(document,"touchmove",this._onTouchMove),I(document,"pointermove",this._onTouchMove),I(document,"dragover",He),I(document,"mousemove",He),I(document,"touchmove",He);},_offUpEvents:function(){var n=this.el.ownerDocument;I(n,"mouseup",this._onDrop),I(n,"touchend",this._onDrop),I(n,"pointerup",this._onDrop),I(n,"touchcancel",this._onDrop),I(document,"selectstart",this);},_onDrop:function(n){var o=this.el,t=this.options;if(pe=me(y),Ne=me(y,t.draggable),ce("drop",this,{evt:n}),Z=y&&y.parentNode,pe=me(y),Ne=me(y,t.draggable),C.eventCanceled){this._nulling();return}Qe=!1,Ln=!1,xn=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),It(this.cloneId),It(this._dragStartId),this.nativeDraggable&&(I(document,"drop",this),I(o,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),vn&&E(document.body,"user-select",""),E(y,"transform",""),n&&(pn&&(n.cancelable&&n.preventDefault(),!t.dropBubble&&n.stopPropagation()),M&&M.parentNode&&M.parentNode.removeChild(M),(P===Z||te&&te.lastPutMode!=="clone")&&q&&q.parentNode&&q.parentNode.removeChild(q),y&&(this.nativeDraggable&&I(y,"dragend",this),jt(y),y.style["will-change"]="",pn&&!Qe&&ue(y,te?te.options.ghostClass:this.options.ghostClass,!1),ue(y,this.options.chosenClass,!1),le({sortable:this,name:"unchoose",toEl:Z,newIndex:null,newDraggableIndex:null,originalEvent:n}),P!==Z?(pe>=0&&(le({rootEl:Z,name:"add",toEl:Z,fromEl:P,originalEvent:n}),le({sortable:this,name:"remove",toEl:Z,originalEvent:n}),le({rootEl:Z,name:"sort",toEl:Z,fromEl:P,originalEvent:n}),le({sortable:this,name:"sort",toEl:Z,originalEvent:n})),te&&te.save()):pe!==en&&pe>=0&&(le({sortable:this,name:"update",toEl:Z,originalEvent:n}),le({sortable:this,name:"sort",toEl:Z,originalEvent:n})),C.active&&((pe==null||pe===-1)&&(pe=en,Ne=yn),le({sortable:this,name:"end",toEl:Z,originalEvent:n}),this.save()))),this._nulling();},_nulling:function(){ce("nulling",this),P=y=Z=M=Ue=q=$n=$e=qe=we=pn=pe=Ne=en=yn=Xe=wn=te=On=C.dragged=C.ghost=C.clone=C.active=null,Qn.forEach(function(n){n.checked=!0;}),Qn.length=xt=_t=0;},handleEvent:function(n){switch(n.type){case"drop":case"dragend":this._onDrop(n);break;case"dragenter":case"dragover":y&&(this._onDragOver(n),gc(n));break;case"selectstart":n.preventDefault();break}},toArray:function(){for(var n=[],o,t=this.el.children,i=0,r=t.length,a=this.options;i<r;i++)o=t[i],Ee(o,a.draggable,this.el,!1)&&n.push(o.getAttribute(a.dataIdAttr)||_c(o));return n},sort:function(n,o){var t={},i=this.el;this.toArray().forEach(function(r,a){var s=i.children[a];Ee(s,this.options.draggable,i,!1)&&(t[r]=s);},this),o&&this.captureAnimationState(),n.forEach(function(r){t[r]&&(i.removeChild(t[r]),i.appendChild(t[r]));}),o&&this.animateAll();},save:function(){var n=this.options.store;n&&n.set&&n.set(this);},closest:function(n,o){return Ee(n,o||this.options.draggable,this.el,!1)},option:function(n,o){var t=this.options;if(o===void 0)return t[n];var i=Cn.modifyOption(this,n,o);typeof i<"u"?t[n]=i:t[n]=o,n==="group"&&Ei(t);},destroy:function(){ce("destroy",this);var n=this.el;n[fe]=null,I(n,"mousedown",this._onTapStart),I(n,"touchstart",this._onTapStart),I(n,"pointerdown",this._onTapStart),this.nativeDraggable&&(I(n,"dragover",this),I(n,"dragenter",this)),Array.prototype.forEach.call(n.querySelectorAll("[draggable]"),function(o){o.removeAttribute("draggable");}),this._onDrop(),this._disableDelayedDragEvents(),Jn.splice(Jn.indexOf(this.el),1),this.el=n=null;},_hideClone:function(){if(!$e){if(ce("hideClone",this),C.eventCanceled)return;E(q,"display","none"),this.options.removeCloneOnHide&&q.parentNode&&q.parentNode.removeChild(q),$e=!0;}},_showClone:function(n){if(n.lastPutMode!=="clone"){this._hideClone();return}if($e){if(ce("showClone",this),C.eventCanceled)return;y.parentNode==P&&!this.options.group.revertClone?P.insertBefore(q,y):Ue?P.insertBefore(q,Ue):P.appendChild(q),this.options.group.revertClone&&this.animate(y,q),E(q,"display",""),$e=!1;}}};function gc(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault();}function Vn(e,n,o,t,i,r,a,s){var c,l=e[fe],d=l.options.onMove,u;return window.CustomEvent&&!Oe&&!En?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=n,c.from=e,c.dragged=o,c.draggedRect=t,c.related=i||n,c.relatedRect=r||K(n),c.willInsertAfter=s,c.originalEvent=a,e.dispatchEvent(c),d&&(u=d.call(l,c,a)),u}function jt(e){e.draggable=!1;}function vc(){Lt=!1;}function bc(e,n,o){var t=K(an(o.el,0,o.options,!0)),i=10;return n?e.clientX<t.left-i||e.clientY<t.top&&e.clientX<t.right:e.clientY<t.top-i||e.clientY<t.bottom&&e.clientX<t.left}function yc(e,n,o){var t=K(no(o.el,o.options.draggable)),i=10;return n?e.clientX>t.right+i||e.clientX<=t.right&&e.clientY>t.bottom&&e.clientX>=t.left:e.clientX>t.right&&e.clientY>t.top||e.clientX<=t.right&&e.clientY>t.bottom+i}function wc(e,n,o,t,i,r,a,s){var c=t?e.clientY:e.clientX,l=t?o.height:o.width,d=t?o.top:o.left,u=t?o.bottom:o.right,p=!1;if(!a){if(s&&Bn<l*i){if(!xn&&(wn===1?c>d+l*r/2:c<u-l*r/2)&&(xn=!0),xn)p=!0;else if(wn===1?c<d+Bn:c>u-Bn)return -wn}else if(c>d+l*(1-i)/2&&c<u-l*(1-i)/2)return xc(n)}return p=p||a,p&&(c<d+l*r/2||c>u-l*r/2)?c>d+l/2?1:-1:0}function xc(e){return me(y)<me(e)?1:-1}function _c(e){for(var n=e.tagName+e.className+e.src+e.href+e.textContent,o=n.length,t=0;o--;)t+=n.charCodeAt(o);return t.toString(36)}function kc(e){Qn.length=0;for(var n=e.getElementsByTagName("input"),o=n.length;o--;){var t=n[o];t.checked&&Qn.push(t);}}function Zn(e){return setTimeout(e,0)}function It(e){return clearTimeout(e)}dt&&V(document,"touchmove",function(e){(C.active||Qe)&&e.cancelable&&e.preventDefault();});C.utils={on:V,off:I,css:E,find:wi,is:function(n,o){return !!Ee(n,o,n,!1)},extend:rc,throttle:xi,closest:Ee,toggleClass:ue,clone:ki,index:me,nextTick:Zn,cancelNextTick:It,detectDirection:Si,getChild:an};C.get=function(e){return e[fe]};C.mount=function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];n[0].constructor===Array&&(n=n[0]),n.forEach(function(t){if(!t.prototype||!t.prototype.constructor)throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(C.utils=ze(ze({},C.utils),t.utils)),Cn.mount(t);});};C.create=function(e,n){return new C(e,n)};C.version=nc;var Y=[],fn,Vt,Nt=!1,St,Et,et,hn;function jc(){function e(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var n in this)n.charAt(0)==="_"&&typeof this[n]=="function"&&(this[n]=this[n].bind(this));}return e.prototype={dragStarted:function(o){var t=o.originalEvent;this.sortable.nativeDraggable?V(document,"dragover",this._handleAutoScroll):this.options.supportPointer?V(document,"pointermove",this._handleFallbackAutoScroll):t.touches?V(document,"touchmove",this._handleFallbackAutoScroll):V(document,"mousemove",this._handleFallbackAutoScroll);},dragOverCompleted:function(o){var t=o.originalEvent;!this.options.dragOverBubble&&!t.rootEl&&this._handleAutoScroll(t);},drop:function(){this.sortable.nativeDraggable?I(document,"dragover",this._handleAutoScroll):(I(document,"pointermove",this._handleFallbackAutoScroll),I(document,"touchmove",this._handleFallbackAutoScroll),I(document,"mousemove",this._handleFallbackAutoScroll)),Oo(),qn(),ac();},nulling:function(){et=Vt=fn=Nt=hn=St=Et=null,Y.length=0;},_handleFallbackAutoScroll:function(o){this._handleAutoScroll(o,!0);},_handleAutoScroll:function(o,t){var i=this,r=(o.touches?o.touches[0]:o).clientX,a=(o.touches?o.touches[0]:o).clientY,s=document.elementFromPoint(r,a);if(et=o,t||this.options.forceAutoScrollFallback||En||Oe||vn){Ct(o,this.options,s,t);var c=Be(s,!0);Nt&&(!hn||r!==St||a!==Et)&&(hn&&Oo(),hn=setInterval(function(){var l=Be(document.elementFromPoint(r,a),!0);l!==c&&(c=l,qn()),Ct(o,i.options,l,t);},10),St=r,Et=a);}else {if(!this.options.bubbleScroll||Be(s,!0)===Ce()){qn();return}Ct(o,this.options,Be(s,!1),!1);}}},Ae(e,{pluginName:"scroll",initializeByDefault:!0})}function qn(){Y.forEach(function(e){clearInterval(e.pid);}),Y=[];}function Oo(){clearInterval(hn);}var Ct=xi(function(e,n,o,t){if(n.scroll){var i=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,a=n.scrollSensitivity,s=n.scrollSpeed,c=Ce(),l=!1,d;Vt!==o&&(Vt=o,qn(),fn=n.scroll,d=n.scrollFn,fn===!0&&(fn=Be(o,!0)));var u=0,p=fn;do{var b=p,f=K(b),g=f.top,v=f.bottom,_=f.left,m=f.right,A=f.width,D=f.height,$=void 0,R=void 0,B=b.scrollWidth,F=b.scrollHeight,ae=E(b),se=b.scrollLeft,ve=b.scrollTop;b===c?($=A<B&&(ae.overflowX==="auto"||ae.overflowX==="scroll"||ae.overflowX==="visible"),R=D<F&&(ae.overflowY==="auto"||ae.overflowY==="scroll"||ae.overflowY==="visible")):($=A<B&&(ae.overflowX==="auto"||ae.overflowX==="scroll"),R=D<F&&(ae.overflowY==="auto"||ae.overflowY==="scroll"));var Le=$&&(Math.abs(m-i)<=a&&se+A<B)-(Math.abs(_-i)<=a&&!!se),he=R&&(Math.abs(v-r)<=a&&ve+D<F)-(Math.abs(g-r)<=a&&!!ve);if(!Y[u])for(var be=0;be<=u;be++)Y[be]||(Y[be]={});(Y[u].vx!=Le||Y[u].vy!=he||Y[u].el!==b)&&(Y[u].el=b,Y[u].vx=Le,Y[u].vy=he,clearInterval(Y[u].pid),(Le!=0||he!=0)&&(l=!0,Y[u].pid=setInterval((function(){t&&this.layer===0&&C.active._onTouchMove(et);var de=Y[this.layer].vy?Y[this.layer].vy*s:0,ne=Y[this.layer].vx?Y[this.layer].vx*s:0;typeof d=="function"&&d.call(C.dragged.parentNode[fe],ne,de,e,et,Y[this.layer].el)!=="continue"||_i(Y[this.layer].el,ne,de);}).bind({layer:u}),24))),u++;}while(n.bubbleScroll&&p!==c&&(p=Be(p,!1)));Nt=l;}},30),Ti=function(n){var o=n.originalEvent,t=n.putSortable,i=n.dragEl,r=n.activeSortable,a=n.dispatchSortableEvent,s=n.hideGhostForTarget,c=n.unhideGhostForTarget;if(o){var l=t||r;s();var d=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:o,u=document.elementFromPoint(d.clientX,d.clientY);c(),l&&!l.el.contains(u)&&(a("spill"),this.onSpill({dragEl:i,putSortable:t}));}};function to(){}to.prototype={startIndex:null,dragStart:function(n){var o=n.oldDraggableIndex;this.startIndex=o;},onSpill:function(n){var o=n.dragEl,t=n.putSortable;this.sortable.captureAnimationState(),t&&t.captureAnimationState();var i=an(this.sortable.el,this.startIndex,this.options);i?this.sortable.el.insertBefore(o,i):this.sortable.el.appendChild(o),this.sortable.animateAll(),t&&t.animateAll();},drop:Ti};Ae(to,{pluginName:"revertOnSpill"});function oo(){}oo.prototype={onSpill:function(n){var o=n.dragEl,t=n.putSortable,i=t||this.sortable;i.captureAnimationState(),o.parentNode&&o.parentNode.removeChild(o),i.animateAll();},drop:Ti};Ae(oo,{pluginName:"removeOnSpill"});C.mount(new jc);C.mount(oo,to);function Sc(){return typeof window<"u"?window.console:global.console}const Ec=Sc();function Cc(e){const n=Object.create(null);return function(t){return n[t]||(n[t]=e(t))}}const zc=/-(\w)/g,Lo=Cc(e=>e.replace(zc,(n,o)=>o?o.toUpperCase():""));function zt(e){e.parentElement!==null&&e.parentElement.removeChild(e);}function Io(e,n,o){const t=o===0?e.children[0]:e.children[o-1].nextSibling;e.insertBefore(n,t);}function Tc(e,n){return Object.values(e).indexOf(n)}function Mc(e,n,o,t){if(!e)return [];const i=Object.values(e),r=n.length-t;return [...n].map((s,c)=>c>=r?i.length:i.indexOf(s))}function Mi(e,n){this.$nextTick(()=>this.$emit(e.toLowerCase(),n));}function Dc(e){return n=>{this.realList!==null&&this["onDrag"+e](n),Mi.call(this,e,n);}}function Ac(e){return ["transition-group","TransitionGroup"].includes(e)}function Oc(e){if(!e||e.length!==1)return !1;const[{type:n}]=e;return n?Ac(n.name):!1}function Lc(e,n){return n?{...n.props,...n.attrs}:e}const Rt=["Start","Add","Remove","Update","End"],Pt=["Choose","Unchoose","Sort","Filter","Clone"],Ic=["Move",...Rt,...Pt].map(e=>"on"+e);let Tt=null;const Vc={options:Object,list:{type:Array,required:!1,default:null},noTransitionOnDrag:{type:Boolean,default:!1},clone:{type:Function,default:e=>e},tag:{type:String,default:"div"},move:{type:Function,default:null},componentData:{type:Object,required:!1,default:null},component:{type:String,default:null},modelValue:{type:Array,required:!1,default:null}},Nc=vue.defineComponent({name:"VueDraggableNext",inheritAttrs:!1,emits:["update:modelValue","move","change",...Rt.map(e=>e.toLowerCase()),...Pt.map(e=>e.toLowerCase())],props:Vc,data(){return {transitionMode:!1,noneFunctionalComponentMode:!1,headerOffset:0,footerOffset:0,_sortable:{},visibleIndexes:[],context:{}}},render(){const e=this.$slots.default?this.$slots.default():null,n=Lc(this.$attrs,this.componentData);return e?(this.transitionMode=Oc(e),vue.h(this.getTag(),n,e)):vue.h(this.getTag(),n,[])},created(){this.list!==null&&this.modelValue!==null&&Ec.error("list props are mutually exclusive! Please set one.");},mounted(){const e={};Rt.forEach(i=>{e["on"+i]=Dc.call(this,i);}),Pt.forEach(i=>{e["on"+i]=Mi.bind(this,i);});const n=Object.keys(this.$attrs).reduce((i,r)=>(i[Lo(r)]=this.$attrs[r],i),{}),o=Object.assign({},n,e,{onMove:(i,r)=>this.onDragMove(i,r)});!("draggable"in o)&&(o.draggable=">*");const t=this.$el.nodeType===1?this.$el:this.$el.parentElement;this._sortable=new C(t,o),t.__draggable_component__=this,this.computeIndexes();},beforeUnmount(){try{this._sortable!==void 0&&this._sortable.destroy();}catch{}},computed:{realList(){return this.list?this.list:this.modelValue}},watch:{$attrs:{handler(e){this.updateOptions(e);},deep:!0},realList(){this.computeIndexes();}},methods:{getTag(){return this.component?vue.resolveComponent(this.component):this.tag},updateOptions(e){for(var n in e){const o=Lo(n);Ic.indexOf(o)===-1&&this._sortable.option(o,e[n]);}},getChildrenNodes(){return this.$el.children},computeIndexes(){this.$nextTick(()=>{this.visibleIndexes=Mc(this.getChildrenNodes(),this.$el.children,this.transitionMode,this.footerOffset);});},getUnderlyingVm(e){const n=Tc(this.getChildrenNodes()||[],e);if(n===-1)return null;const o=this.realList[n];return {index:n,element:o}},emitChanges(e){this.$nextTick(()=>{this.$emit("change",e);});},alterList(e){if(this.list){e(this.list);return}const n=[...this.modelValue];e(n),this.$emit("update:modelValue",n);},spliceList(){const e=n=>n.splice(...arguments);this.alterList(e);},updatePosition(e,n){const o=t=>t.splice(n,0,t.splice(e,1)[0]);this.alterList(o);},getVmIndex(e){const n=this.visibleIndexes,o=n.length;return e>o-1?o:n[e]},getComponent(){return this.$slots.default?this.$slots.default()[0].componentInstance:null},resetTransitionData(e){if(!this.noTransitionOnDrag||!this.transitionMode)return;var n=this.getChildrenNodes();n[e].data=null;const o=this.getComponent();o.children=[],o.kept=void 0;},onDragStart(e){this.computeIndexes(),this.context=this.getUnderlyingVm(e.item),this.context&&(e.item._underlying_vm_=this.clone(this.context.element),Tt=e.item);},onDragAdd(e){const n=e.item._underlying_vm_;if(n===void 0)return;zt(e.item);const o=this.getVmIndex(e.newIndex);this.spliceList(o,0,n),this.computeIndexes();const t={element:n,newIndex:o};this.emitChanges({added:t});},onDragRemove(e){if(Io(this.$el,e.item,e.oldIndex),e.pullMode==="clone"){zt(e.clone);return}if(!this.context)return;const n=this.context.index;this.spliceList(n,1);const o={element:this.context.element,oldIndex:n};this.resetTransitionData(n),this.emitChanges({removed:o});},onDragUpdate(e){zt(e.item),Io(e.from,e.item,e.oldIndex);const n=this.context.index,o=this.getVmIndex(e.newIndex);this.updatePosition(n,o);const t={element:this.context.element,oldIndex:n,newIndex:o};this.emitChanges({moved:t});},updateProperty(e,n){e.hasOwnProperty(n)&&(e[n]+=this.headerOffset);},onDragMove(e,n){const o=this.move;if(!o||!this.realList)return !0;const t=this.getRelatedContextFromMoveEvent(e),i=this.context,r=this.computeFutureIndex(t,e);Object.assign(i,{futureIndex:r});const a=Object.assign({},e,{relatedContext:t,draggedContext:i});return o(a,n)},onDragEnd(){this.computeIndexes(),Tt=null;},getTrargetedComponent(e){return e.__draggable_component__},getRelatedContextFromMoveEvent({to:e,related:n}){const o=this.getTrargetedComponent(e);if(!o)return {component:o};const t=o.realList,i={list:t,component:o};if(e!==n&&t&&o.getUnderlyingVm){const r=o.getUnderlyingVm(n);if(r)return Object.assign(r,i)}return i},computeFutureIndex(e,n){const o=[...n.to.children].filter(a=>a.style.display!=="none");if(o.length===0)return 0;const t=o.indexOf(n.related),i=e.component.getVmIndex(t);return o.indexOf(Tt)!==-1||!n.willInsertAfter?i:i+1}}}),Rc={class:"sm-url-line"},Pc=["onKeydown"],$c=["onUpdate:modelValue"],Bc=["onUpdate:modelValue"],Zc={class:"sm-row-tools"},qc=["aria-expanded","onClick"],Hc=["onChange"],Fc=vue.createElementVNode("option",{value:"",disabled:""},"＋",-1),Uc=["value"],Gc=["aria-pressed","title","onClick"],Wc=["onClick"],Yc={key:0,class:"sm-icon-editor"},Xc=["src"],Kc=["onUpdate:modelValue"],Jc={class:"sm-upload"},Qc=["onChange"],ed=["onClick"],nd={class:"sm-add-url"},td=["disabled"],Vo={__name:"managed-url-list",props:{modelValue:{type:Array,required:!0},personalCategories:{type:Array,default:()=>[]},disabled:Boolean},emits:["update:modelValue","copy","error"],setup(e,{emit:n}){const o=e,t=n,i=vue.computed({get:()=>o.modelValue,set:f=>t("update:modelValue",f)}),r=vue.ref(null),a=new WeakMap;let s=0;function c(f){return a.has(f)||a.set(f,++s),a.get(f)}function l(){i.value=[...i.value,{nameZh:"新网址",url:"https://www.baidu.com/s?wd=%s&ie=utf-8",data:{visible:!0}}];}function d(f){window.confirm(`删除网址“${i.value[f].nameZh}”？保存后生效。`)&&(i.value=i.value.filter((g,v)=>v!==f));}function u(f,g){const v=f+g;if(v<0||v>=i.value.length)return;const _=[...i.value];_.splice(v,0,_.splice(f,1)[0]),i.value=_;}function p(f,g){t("copy",{item:ke(f),name:g.target.value}),g.target.value="";}async function b(f,g){const v=g.target.files[0];if(v){try{if(!v.type.startsWith("image/"))throw Error("请选择图片文件");f.icon=await new Promise((_,m)=>{const A=new FileReader;A.onload=()=>_(A.result),A.onerror=()=>m(Error("图片读取失败")),A.readAsDataURL(v);});}catch(_){t("error",_);}g.target.value="";}}return (f,g)=>(vue.openBlock(),vue.createElementBlock(vue.Fragment,null,[vue.createVNode(vue.unref(Nc),{modelValue:i.value,"onUpdate:modelValue":g[0]||(g[0]=v=>i.value=v),handle:".sm-drag",animation:150,"force-fallback":!0,disabled:e.disabled,class:"sm-url-list"},{default:vue.withCtx(()=>[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(i.value,(v,_)=>(vue.openBlock(),vue.createElementBlock("div",{key:c(v),class:vue.normalizeClass(["sm-url-item",{"sm-is-hidden":!v.data.visible}])},[vue.createElementVNode("div",Rc,[vue.createElementVNode("button",{type:"button",class:"sm-icon-button sm-drag","aria-label":"拖动排序",title:"拖动排序，也可使用上下方向键",onKeydown:[vue.withKeys(vue.withModifiers(m=>u(_,-1),["prevent"]),["up"]),vue.withKeys(vue.withModifiers(m=>u(_,1),["prevent"]),["down"])]},[vue.createVNode(vue.unref(Hl))],40,Pc),vue.withDirectives(vue.createElementVNode("input",{"onUpdate:modelValue":m=>v.nameZh=m,class:"sm-name-input","aria-label":"网址名称",placeholder:"网址名称"},null,8,$c),[[vue.vModelText,v.nameZh]]),vue.withDirectives(vue.createElementVNode("input",{"onUpdate:modelValue":m=>v.url=m,class:"sm-url-input","aria-label":"搜索网址",placeholder:"https://example.com/search?q=%s",spellcheck:"false"},null,8,Bc),[[vue.vModelText,v.url]]),vue.createElementVNode("div",Zc,[vue.createElementVNode("button",{type:"button",class:"sm-icon-button","aria-expanded":r.value===v,"aria-label":"编辑图标",title:"编辑图标",onClick:m=>r.value=r.value===v?null:v},[vue.createVNode(vue.unref(Wl))],8,qc),e.personalCategories.length?(vue.openBlock(),vue.createElementBlock("select",{key:0,"aria-label":"添加到常用分类",title:"复制到常用分类",value:"",onChange:m=>p(v,m)},[Fc,(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(e.personalCategories,m=>(vue.openBlock(),vue.createElementBlock("option",{key:m.name,value:m.name},vue.toDisplayString(m.nameZh),9,Uc))),128))],40,Hc)):vue.createCommentVNode("",!0),vue.createElementVNode("button",{type:"button",class:vue.normalizeClass(["sm-icon-button",v.data.visible?"sm-plain-primary":"sm-plain-muted"]),"aria-pressed":v.data.visible,"aria-label":"显示网址",title:v.data.visible?"隐藏网址":"显示网址",onClick:m=>v.data.visible=!v.data.visible},[v.data.visible?(vue.openBlock(),vue.createBlock(vue.unref(vi),{key:0})):(vue.openBlock(),vue.createBlock(vue.unref(gi),{key:1}))],10,Gc),vue.createElementVNode("button",{type:"button",class:"sm-icon-button sm-plain-danger","aria-label":"删除网址",title:"删除网址",onClick:m=>d(_)},[vue.createVNode(vue.unref(mi))],8,Wc)])]),r.value===v?(vue.openBlock(),vue.createElementBlock("div",Yc,[v.icon?(vue.openBlock(),vue.createElementBlock("img",{key:0,src:v.icon,alt:"图标预览"},null,8,Xc)):vue.createCommentVNode("",!0),vue.createElementVNode("label",null,[vue.createTextVNode("图标地址"),vue.withDirectives(vue.createElementVNode("input",{"onUpdate:modelValue":m=>v.icon=m,"aria-label":"图标地址",placeholder:"图片链接或 data:image；留空自动获取"},null,8,Kc),[[vue.vModelText,v.icon]])]),vue.createElementVNode("label",Jc,[vue.createTextVNode("上传图片"),vue.createElementVNode("input",{type:"file",accept:"image/*",onChange:m=>b(v,m)},null,40,Qc)]),vue.createElementVNode("button",{type:"button",onClick:m=>v.icon=""},"清除图标",8,ed)])):vue.createCommentVNode("",!0)],2))),128))]),_:1},8,["modelValue","disabled"]),vue.createElementVNode("div",nd,[vue.createElementVNode("button",{type:"button",disabled:e.disabled,onClick:l},"添加网址",8,td)])],64))}},od=`.jsoneditor,
.jsoneditor-modal {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}

.jsoneditor input,
.jsoneditor input:not([type]),
.jsoneditor input[type=text],
.jsoneditor input[type=search],
.jsoneditor-modal input,
.jsoneditor-modal input:not([type]),
.jsoneditor-modal input[type=text],
.jsoneditor-modal input[type=search] {
  height: auto;
  border: inherit;
  box-shadow: none;
  font-size: inherit;
  box-sizing: inherit;
  padding: inherit;
  font-family: inherit;
  transition: none;
  line-height: inherit;
}

.jsoneditor input:focus,
.jsoneditor input:not([type]):focus,
.jsoneditor input[type=text]:focus,
.jsoneditor input[type=search]:focus,
.jsoneditor-modal input:focus,
.jsoneditor-modal input:not([type]):focus,
.jsoneditor-modal input[type=text]:focus,
.jsoneditor-modal input[type=search]:focus {
  border: inherit;
  box-shadow: inherit;
}

.jsoneditor textarea,
.jsoneditor-modal textarea {
  height: inherit;
}

.jsoneditor select,
.jsoneditor-modal select {
  display: inherit;
  height: inherit;
}

.jsoneditor label,
.jsoneditor-modal label {
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
}

.jsoneditor table,
.jsoneditor-modal table {
  border-collapse: collapse;
  width: auto;
}

.jsoneditor td,
.jsoneditor th,
.jsoneditor-modal td,
.jsoneditor-modal th {
  padding: 0;
  display: table-cell;
  text-align: left;
  vertical-align: inherit;
  border-radius: inherit;
}

.jsoneditor .autocomplete.dropdown {
  position: absolute;
  background: #ffffff;
  box-shadow: 2px 2px 12px rgba(128, 128, 128, 0.3);
  border: 1px solid #d3d3d3;
  overflow-x: hidden;
  overflow-y: auto;
  cursor: default;
  margin: 0;
  padding: 5px;
  text-align: left;
  outline: 0;
  font-family: consolas, menlo, monaco, "Ubuntu Mono", "source-code-pro", monospace;
  font-size: 14px;
}

.jsoneditor .autocomplete.dropdown .item {
  color: #1a1a1a;
}

.jsoneditor .autocomplete.dropdown .item.hover {
  background-color: #ebebeb;
}

.jsoneditor .autocomplete.hint {
  color: #a1a1a1;
  top: 4px;
  left: 4px;
}

.jsoneditor-contextmenu-root {
  position: relative;
  width: 0;
  height: 0;
}

.jsoneditor-contextmenu {
  position: absolute;
  box-sizing: content-box;
  z-index: 2;
}

.jsoneditor-contextmenu .jsoneditor-menu {
  position: relative;
  left: 0;
  top: 0;
  width: 128px;
  height: auto;
  background: #ffffff;
  border: 1px solid #d3d3d3;
  box-shadow: 2px 2px 12px rgba(128, 128, 128, 0.3);
  list-style: none;
  margin: 0;
  padding: 0;
}

.jsoneditor-contextmenu .jsoneditor-menu button {
  position: relative;
  padding: 0 8px 0 0;
  margin: 0;
  width: 128px;
  height: auto;
  border: none;
  cursor: pointer;
  color: #4d4d4d;
  background: transparent;
  font-size: 14px;
  font-family: arial, sans-serif;
  box-sizing: border-box;
  text-align: left;
}

.jsoneditor-contextmenu .jsoneditor-menu button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.jsoneditor-contextmenu .jsoneditor-menu button.jsoneditor-default {
  width: 96px;
}

.jsoneditor-contextmenu .jsoneditor-menu button.jsoneditor-expand {
  float: right;
  width: 32px;
  height: 24px;
  border-left: 1px solid #e5e5e5;
}

.jsoneditor-contextmenu .jsoneditor-menu li {
  overflow: hidden;
}

.jsoneditor-contextmenu .jsoneditor-menu li ul {
  display: none;
  position: relative;
  left: -10px;
  top: 0;
  border: none;
  box-shadow: inset 0 0 10px rgba(128, 128, 128, 0.5);
  padding: 0 10px;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

.jsoneditor-contextmenu .jsoneditor-menu li ul .jsoneditor-icon {
  margin-left: 24px;
}

.jsoneditor-contextmenu .jsoneditor-menu li ul li button {
  padding-left: 24px;
  animation: all ease-in-out 1s;
}

.jsoneditor-contextmenu .jsoneditor-menu li button .jsoneditor-expand {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 4px 0 0;
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: 0 -72px;
}

.jsoneditor-contextmenu .jsoneditor-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: none;
  padding: 0;
  margin: 0;
  background-image: url("./img/jsoneditor-icons.svg");
}

.jsoneditor-contextmenu .jsoneditor-text {
  padding: 4px 0 4px 24px;
  word-wrap: break-word;
}

.jsoneditor-contextmenu .jsoneditor-text.jsoneditor-right-margin {
  padding-right: 24px;
}

.jsoneditor-contextmenu .jsoneditor-separator {
  height: 0;
  border-top: 1px solid #e5e5e5;
  padding-top: 5px;
  margin-top: 5px;
}

.jsoneditor-contextmenu button.jsoneditor-remove .jsoneditor-icon {
  background-position: -24px 0;
}

.jsoneditor-contextmenu button.jsoneditor-append .jsoneditor-icon {
  background-position: 0 0;
}

.jsoneditor-contextmenu button.jsoneditor-insert .jsoneditor-icon {
  background-position: 0 0;
}

.jsoneditor-contextmenu button.jsoneditor-duplicate .jsoneditor-icon {
  background-position: -48px 0;
}

.jsoneditor-contextmenu button.jsoneditor-sort-asc .jsoneditor-icon {
  background-position: -168px 0;
}

.jsoneditor-contextmenu button.jsoneditor-sort-desc .jsoneditor-icon {
  background-position: -192px 0;
}

.jsoneditor-contextmenu button.jsoneditor-transform .jsoneditor-icon {
  background-position: -216px 0;
}

.jsoneditor-contextmenu button.jsoneditor-extract .jsoneditor-icon {
  background-position: 0 -24px;
}

.jsoneditor-contextmenu button.jsoneditor-type-string .jsoneditor-icon {
  background-position: -144px 0;
}

.jsoneditor-contextmenu button.jsoneditor-type-auto .jsoneditor-icon {
  background-position: -120px 0;
}

.jsoneditor-contextmenu button.jsoneditor-type-object .jsoneditor-icon {
  background-position: -72px 0;
}

.jsoneditor-contextmenu button.jsoneditor-type-array .jsoneditor-icon {
  background-position: -96px 0;
}

.jsoneditor-contextmenu button.jsoneditor-type-modes .jsoneditor-icon {
  background-image: none;
  width: 6px;
}

.jsoneditor-contextmenu ul,
.jsoneditor-contextmenu li {
  box-sizing: content-box;
  position: relative;
}

.jsoneditor-contextmenu .jsoneditor-menu button:hover,
.jsoneditor-contextmenu .jsoneditor-menu button:focus {
  color: #1a1a1a;
  background-color: #f5f5f5;
  outline: none;
}

.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected,
.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected:hover,
.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected:focus {
  color: #ffffff;
  background-color: #ee422e;
}

.jsoneditor-contextmenu .jsoneditor-menu li ul li button:hover,
.jsoneditor-contextmenu .jsoneditor-menu li ul li button:focus {
  background-color: #f5f5f5;
}

.jsoneditor-modal {
  max-width: 95%;
  border-radius: 2px !important;
  padding: 45px 15px 15px 15px !important;
  box-shadow: 2px 2px 12px rgba(128, 128, 128, 0.3);
  color: #4d4d4d;
  line-height: 1.3em;
}

.jsoneditor-modal.jsoneditor-modal-transform {
  width: 600px !important;
}

.jsoneditor-modal .pico-modal-header {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-family: arial, sans-serif;
  font-size: 11pt;
  background: #3883fa;
  color: #ffffff;
}

.jsoneditor-modal table {
  width: 100%;
}

.jsoneditor-modal table td {
  padding: 3px 0;
}

.jsoneditor-modal table td.jsoneditor-modal-input {
  text-align: right;
  padding-right: 0;
  white-space: nowrap;
}

.jsoneditor-modal table td.jsoneditor-modal-actions {
  padding-top: 15px;
}

.jsoneditor-modal table th {
  vertical-align: middle;
}

.jsoneditor-modal p:first-child {
  margin-top: 0;
}

.jsoneditor-modal a {
  color: #3883fa;
}

.jsoneditor-modal .jsoneditor-jmespath-block {
  margin-bottom: 10px;
}

.jsoneditor-modal .pico-close {
  background: none !important;
  font-size: 24px !important;
  top: 7px !important;
  right: 7px !important;
  color: #ffffff;
}

.jsoneditor-modal input {
  padding: 4px;
}

.jsoneditor-modal input[type=text] {
  cursor: inherit;
}

.jsoneditor-modal input[disabled] {
  background: #d3d3d3;
  color: #808080;
}

.jsoneditor-modal .jsoneditor-select-wrapper {
  position: relative;
  display: inline-block;
}

.jsoneditor-modal .jsoneditor-select-wrapper:after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #666;
  position: absolute;
  right: 8px;
  top: 14px;
  pointer-events: none;
}

.jsoneditor-modal select {
  padding: 3px 24px 3px 10px;
  min-width: 180px;
  max-width: 350px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-indent: 0;
  text-overflow: "";
  font-size: 14px;
  line-height: 1.5em;
}

.jsoneditor-modal select::-ms-expand {
  display: none;
}

.jsoneditor-modal .jsoneditor-button-group input {
  padding: 4px 10px;
  margin: 0;
  border-radius: 0;
  border-left-style: none;
}

.jsoneditor-modal .jsoneditor-button-group input.jsoneditor-button-first {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-left-style: solid;
}

.jsoneditor-modal .jsoneditor-button-group input.jsoneditor-button-last {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.jsoneditor-modal .jsoneditor-transform-preview {
  background: #f5f5f5;
  height: 200px;
}

.jsoneditor-modal .jsoneditor-transform-preview.jsoneditor-error {
  color: #ee422e;
}

.jsoneditor-modal .jsoneditor-jmespath-wizard {
  line-height: 1.2em;
  width: 100%;
  padding: 0;
  border-radius: 3px;
}

.jsoneditor-modal .jsoneditor-jmespath-label {
  font-weight: bold;
  color: dodgerblue;
  margin-top: 20px;
  margin-bottom: 5px;
}

.jsoneditor-modal .jsoneditor-jmespath-wizard-table {
  width: 100%;
  border-collapse: collapse;
}

.jsoneditor-modal .jsoneditor-jmespath-wizard-label {
  font-style: italic;
  margin: 4px 0 2px 0;
}

.jsoneditor-modal .jsoneditor-inline {
  position: relative;
  display: inline-block;
  width: 100%;
  padding-top: 2px;
  padding-bottom: 2px;
}

.jsoneditor-modal .jsoneditor-inline:not(:last-child) {
  padding-right: 2px;
}

.jsoneditor-modal .jsoneditor-jmespath-filter {
  display: flex;
  flex-wrap: wrap;
}

.jsoneditor-modal .jsoneditor-jmespath-filter-field {
  width: 180px;
}

.jsoneditor-modal .jsoneditor-jmespath-filter-relation {
  width: 100px;
}

.jsoneditor-modal .jsoneditor-jmespath-filter-value {
  min-width: 180px;
  flex: 1;
}

.jsoneditor-modal .jsoneditor-jmespath-sort-field {
  width: 170px;
}

.jsoneditor-modal .jsoneditor-jmespath-sort-order {
  width: 150px;
}

.jsoneditor-modal .jsoneditor-jmespath-select-fields {
  width: 100%;
}

.jsoneditor-modal .selectr-selected {
  border-color: #d3d3d3;
  padding: 4px 28px 4px 8px;
}

.jsoneditor-modal .selectr-selected .selectr-tag {
  background-color: #3883fa;
  border-radius: 5px;
}

.jsoneditor-modal table th,
.jsoneditor-modal table td {
  text-align: left;
  vertical-align: middle;
  font-weight: normal;
  color: #4d4d4d;
  border-spacing: 0;
  border-collapse: collapse;
}

.jsoneditor-modal select,
.jsoneditor-modal textarea,
.jsoneditor-modal input,
.jsoneditor-modal input[type=text],
.jsoneditor-modal input[type=text]:focus,
.jsoneditor-modal #query {
  background: #ffffff;
  border: 1px solid #d3d3d3;
  color: #4d4d4d;
  border-radius: 3px;
  padding: 4px;
}

.jsoneditor-modal textarea,
.jsoneditor-modal #query {
  border-radius: unset;
}

.jsoneditor-modal,
.jsoneditor-modal table td,
.jsoneditor-modal table th,
.jsoneditor-modal select,
.jsoneditor-modal option,
.jsoneditor-modal textarea,
.jsoneditor-modal input,
.jsoneditor-modal input[type=text],
.jsoneditor-modal #query {
  font-size: 10.5pt;
  font-family: arial, sans-serif;
}

.jsoneditor-modal #query,
.jsoneditor-modal .jsoneditor-transform-preview {
  font-family: consolas, menlo, monaco, "Ubuntu Mono", "source-code-pro", monospace;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.jsoneditor-modal input[type=button],
.jsoneditor-modal input[type=submit] {
  background: #f5f5f5;
  padding: 4px 20px;
}

.jsoneditor-modal select,
.jsoneditor-modal input {
  cursor: pointer;
}

.jsoneditor-modal .jsoneditor-button-group.jsoneditor-button-group-value-asc input.jsoneditor-button-asc,
.jsoneditor-modal .jsoneditor-button-group.jsoneditor-button-group-value-desc input.jsoneditor-button-desc {
  background: #3883fa;
  border-color: #3883fa;
  color: #ffffff;
}

.jsoneditor {
  color: #1a1a1a;
  border: thin solid #3883fa;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0;
  line-height: 100%;
}

div.jsoneditor-field,
div.jsoneditor-value,
a.jsoneditor-value,
div.jsoneditor-readonly,
div.jsoneditor-default {
  border: 1px solid transparent;
  min-height: 16px;
  min-width: 32px;
  line-height: 16px;
  padding: 2px;
  margin: 1px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  float: left;
}

div.jsoneditor-field p,
div.jsoneditor-value p {
  margin: 0;
}

div.jsoneditor-value.jsoneditor-empty::after {
  content: "value";
}

div.jsoneditor-value.jsoneditor-string {
  color: #006000;
}

div.jsoneditor-value.jsoneditor-number {
  color: #ee422e;
}

div.jsoneditor-value.jsoneditor-boolean {
  color: #ff8c00;
}

div.jsoneditor-value.jsoneditor-null {
  color: #004ed0;
}

div.jsoneditor-value.jsoneditor-color-value {
  color: #1a1a1a;
}

div.jsoneditor-value.jsoneditor-invalid {
  color: #1a1a1a;
}

div.jsoneditor-readonly {
  min-width: 16px;
  color: #808080;
}

div.jsoneditor-empty {
  border-color: #d3d3d3;
  border-style: dashed;
  border-radius: 2px;
}

div.jsoneditor-field.jsoneditor-empty::after {
  content: "field";
}

div.jsoneditor td {
  vertical-align: top;
}

div.jsoneditor td.jsoneditor-separator {
  padding: 3px 0;
  vertical-align: top;
  color: #808080;
}

div.jsoneditor td.jsoneditor-tree {
  vertical-align: top;
}

div.jsoneditor.busy pre.jsoneditor-preview {
  background: #f5f5f5;
  color: #808080;
}

div.jsoneditor.busy div.jsoneditor-busy {
  display: inherit;
}

div.jsoneditor code.jsoneditor-preview {
  background: none;
}

div.jsoneditor.jsoneditor-mode-preview pre.jsoneditor-preview {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding: 2px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

div.jsoneditor-default {
  color: #808080;
  padding-left: 10px;
}

div.jsoneditor-tree {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background: #ffffff;
}

div.jsoneditor-tree button.jsoneditor-button {
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  background-image: url("./img/jsoneditor-icons.svg");
}

div.jsoneditor-tree button.jsoneditor-button:focus {
  background-color: #f5f5f5;
  outline: #e5e5e5 solid 1px;
}

div.jsoneditor-tree button.jsoneditor-collapsed {
  background-position: 0 -48px;
}

div.jsoneditor-tree button.jsoneditor-expanded {
  background-position: 0 -72px;
}

div.jsoneditor-tree button.jsoneditor-contextmenu-button {
  background-position: -48px -72px;
}

div.jsoneditor-tree button.jsoneditor-invisible {
  visibility: hidden;
  background: none;
}

div.jsoneditor-tree button.jsoneditor-dragarea {
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -72px -72px;
  cursor: move;
}

div.jsoneditor-tree *:focus {
  outline: none;
}

div.jsoneditor-tree div.jsoneditor-show-more {
  display: inline-block;
  padding: 3px 4px;
  margin: 2px 0;
  background-color: #e5e5e5;
  border-radius: 3px;
  color: #808080;
  font-family: arial, sans-serif;
  font-size: 14px;
}

div.jsoneditor-tree div.jsoneditor-show-more a {
  display: inline-block;
  color: #808080;
}

div.jsoneditor-tree div.jsoneditor-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 4px;
  border: 1px solid #808080;
  cursor: pointer;
}

div.jsoneditor-tree div.jsoneditor-color.jsoneditor-color-readonly {
  cursor: inherit;
}

div.jsoneditor-tree div.jsoneditor-date {
  background: #a1a1a1;
  color: #ffffff;
  font-family: arial, sans-serif;
  border-radius: 3px;
  display: inline-block;
  padding: 3px;
  margin: 0 3px;
}

div.jsoneditor-tree table.jsoneditor-tree {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

div.jsoneditor-tree .jsoneditor-button {
  display: block;
}

div.jsoneditor-tree .jsoneditor-button.jsoneditor-schema-error {
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 4px 0 0;
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -168px -48px;
  background-color: transparent;
}

div.jsoneditor-outer {
  position: static;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

div.jsoneditor-outer.has-nav-bar {
  margin-top: -26px;
  padding-top: 26px;
}

div.jsoneditor-outer.has-nav-bar.has-main-menu-bar {
  margin-top: -61px;
  padding-top: 61px;
}

div.jsoneditor-outer.has-status-bar {
  margin-bottom: -26px;
  padding-bottom: 26px;
}

div.jsoneditor-outer.has-main-menu-bar {
  margin-top: -35px;
  padding-top: 35px;
}

div.jsoneditor-busy {
  position: absolute;
  top: 15%;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  display: none;
}

div.jsoneditor-busy span {
  background-color: #ffffab;
  border: 1px solid #ffee00;
  border-radius: 3px;
  padding: 5px 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

div.jsoneditor-field.jsoneditor-empty::after,
div.jsoneditor-value.jsoneditor-empty::after {
  pointer-events: none;
  color: #d3d3d3;
  font-size: 8pt;
}

div.jsoneditor-value.jsoneditor-url,
a.jsoneditor-value.jsoneditor-url {
  color: #006000;
  text-decoration: underline;
}

a.jsoneditor-value.jsoneditor-url {
  display: inline-block;
  padding: 2px;
  margin: 2px;
}

a.jsoneditor-value.jsoneditor-url:hover,
a.jsoneditor-value.jsoneditor-url:focus {
  color: #ee422e;
}

div.jsoneditor-field[contenteditable=true]:focus,
div.jsoneditor-field[contenteditable=true]:hover,
div.jsoneditor-value[contenteditable=true]:focus,
div.jsoneditor-value[contenteditable=true]:hover,
div.jsoneditor-field.jsoneditor-highlight,
div.jsoneditor-value.jsoneditor-highlight {
  background-color: #ffffab;
  border: 1px solid #ffee00;
  border-radius: 2px;
}

div.jsoneditor-field.jsoneditor-highlight-active,
div.jsoneditor-field.jsoneditor-highlight-active:focus,
div.jsoneditor-field.jsoneditor-highlight-active:hover,
div.jsoneditor-value.jsoneditor-highlight-active,
div.jsoneditor-value.jsoneditor-highlight-active:focus,
div.jsoneditor-value.jsoneditor-highlight-active:hover {
  background-color: #ffee00;
  border: 1px solid #ffc700;
  border-radius: 2px;
}

div.jsoneditor-value.jsoneditor-object,
div.jsoneditor-value.jsoneditor-array {
  min-width: 16px;
}

div.jsoneditor-tree button.jsoneditor-contextmenu-button:hover,
div.jsoneditor-tree button.jsoneditor-contextmenu-button:focus,
div.jsoneditor-tree button.jsoneditor-contextmenu-button.jsoneditor-selected,
tr.jsoneditor-selected.jsoneditor-first button.jsoneditor-contextmenu-button {
  background-position: -48px -48px;
}

div.jsoneditor-tree div.jsoneditor-show-more a:hover,
div.jsoneditor-tree div.jsoneditor-show-more a:focus {
  color: #ee422e;
}

textarea.jsoneditor-text,
.ace-jsoneditor {
  min-height: 150px;
}

textarea.jsoneditor-text.ace_editor,
.ace-jsoneditor.ace_editor {
  font-family: consolas, menlo, monaco, "Ubuntu Mono", "source-code-pro", monospace;
}

textarea.jsoneditor-text {
  width: 100%;
  height: 100%;
  margin: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline-width: 0;
  border: none;
  background-color: #ffffff;
  resize: none;
}

tr.jsoneditor-highlight,
tr.jsoneditor-selected {
  background-color: #d3d3d3;
}

tr.jsoneditor-selected button.jsoneditor-dragarea,
tr.jsoneditor-selected button.jsoneditor-contextmenu-button {
  visibility: hidden;
}

tr.jsoneditor-selected.jsoneditor-first button.jsoneditor-dragarea,
tr.jsoneditor-selected.jsoneditor-first button.jsoneditor-contextmenu-button {
  visibility: visible;
}

div.jsoneditor-tree button.jsoneditor-dragarea:hover,
div.jsoneditor-tree button.jsoneditor-dragarea:focus,
tr.jsoneditor-selected.jsoneditor-first button.jsoneditor-dragarea {
  background-position: -72px -48px;
}

div.jsoneditor tr,
div.jsoneditor th,
div.jsoneditor td {
  padding: 0;
  margin: 0;
}

div.jsoneditor-field,
div.jsoneditor-value,
div.jsoneditor td,
div.jsoneditor th,
div.jsoneditor textarea,
pre.jsoneditor-preview,
.jsoneditor-schema-error,
.jsoneditor-popover {
  font-family: consolas, menlo, monaco, "Ubuntu Mono", "source-code-pro", monospace;
  font-size: 14px;
  color: #1a1a1a;
}

.jsoneditor-schema-error {
  cursor: default;
  display: inline-block;
  height: 24px;
  line-height: 24px;
  position: relative;
  text-align: center;
  width: 24px;
}

.jsoneditor-popover {
  background-color: #4c4c4c;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  color: #ffffff;
  padding: 7px 10px;
  position: absolute;
  cursor: auto;
  width: 200px;
}

.jsoneditor-popover.jsoneditor-above {
  bottom: 32px;
  left: -98px;
}

.jsoneditor-popover.jsoneditor-above:before {
  border-top: 7px solid #4c4c4c;
  bottom: -7px;
}

.jsoneditor-popover.jsoneditor-below {
  top: 32px;
  left: -98px;
}

.jsoneditor-popover.jsoneditor-below:before {
  border-bottom: 7px solid #4c4c4c;
  top: -7px;
}

.jsoneditor-popover.jsoneditor-left {
  top: -7px;
  right: 32px;
}

.jsoneditor-popover.jsoneditor-left:before {
  border-left: 7px solid #4c4c4c;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  content: "";
  top: 19px;
  right: -14px;
  left: inherit;
  margin-left: inherit;
  margin-top: -7px;
  position: absolute;
}

.jsoneditor-popover.jsoneditor-right {
  top: -7px;
  left: 32px;
}

.jsoneditor-popover.jsoneditor-right:before {
  border-right: 7px solid #4c4c4c;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  content: "";
  top: 19px;
  left: -14px;
  margin-left: inherit;
  margin-top: -7px;
  position: absolute;
}

.jsoneditor-popover:before {
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  content: "";
  display: block;
  left: 50%;
  margin-left: -7px;
  position: absolute;
}

.jsoneditor-text-errors tr.jump-to-line:hover {
  text-decoration: underline;
  cursor: pointer;
}

.jsoneditor-schema-error:hover .jsoneditor-popover,
.jsoneditor-schema-error:focus .jsoneditor-popover {
  display: block;
  animation: fade-in 0.3s linear 1, move-up 0.3s linear 1;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* JSON schema errors displayed at the bottom of the editor in mode text and code */

.jsoneditor .jsoneditor-validation-errors-container {
  max-height: 130px;
  overflow-y: auto;
}

.jsoneditor .jsoneditor-validation-errors {
  width: 100%;
  overflow: hidden;
}

.jsoneditor .jsoneditor-additional-errors {
  position: absolute;
  margin: auto;
  bottom: 31px;
  left: calc(50% - 92px);
  color: #808080;
  background-color: #ebebeb;
  padding: 7px 15px;
  border-radius: 8px;
}

.jsoneditor .jsoneditor-additional-errors.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 2s linear;
}

.jsoneditor .jsoneditor-additional-errors.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}

.jsoneditor .jsoneditor-text-errors {
  width: 100%;
  border-collapse: collapse;
  border-top: 1px solid #ffc700;
}

.jsoneditor .jsoneditor-text-errors td {
  padding: 3px 6px;
  vertical-align: middle;
}

.jsoneditor .jsoneditor-text-errors td pre {
  margin: 0;
  white-space: pre-wrap;
}

.jsoneditor .jsoneditor-text-errors tr {
  background-color: #ffffab;
}

.jsoneditor .jsoneditor-text-errors tr.parse-error {
  background-color: rgba(238, 46, 46, 0.4392156863);
}

.jsoneditor-text-errors .jsoneditor-schema-error {
  border: none;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 4px 0 0;
  cursor: pointer;
}

.jsoneditor-text-errors tr .jsoneditor-schema-error {
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -168px -48px;
  background-color: transparent;
}

.jsoneditor-text-errors tr.parse-error .jsoneditor-schema-error {
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -25px 0px;
  background-color: transparent;
}

.jsoneditor-anchor {
  cursor: pointer;
}

.jsoneditor-anchor .picker_wrapper.popup.popup_bottom {
  top: 28px;
  left: -10px;
}

.fadein {
  -webkit-animation: fadein 0.3s;
  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s;
  -o-animation: fadein 0.3s;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.jsoneditor-modal input[type=search].selectr-input {
  border: 1px solid #d3d3d3;
  width: calc(100% - 4px);
  margin: 2px;
  padding: 4px;
  box-sizing: border-box;
}

.jsoneditor-modal button.selectr-input-clear {
  right: 8px;
}

.jsoneditor-menu {
  width: 100%;
  height: 35px;
  padding: 2px;
  margin: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #ffffff;
  background-color: #3883fa;
  border-bottom: 1px solid #3883fa;
}

.jsoneditor-menu > button,
.jsoneditor-menu > .jsoneditor-modes > button {
  width: 26px;
  height: 26px;
  margin: 2px;
  padding: 0;
  border-radius: 2px;
  border: 1px solid transparent;
  background-color: transparent;
  background-image: url("./img/jsoneditor-icons.svg");
  color: #ffffff;
  opacity: 0.8;
  font-family: arial, sans-serif;
  font-size: 14px;
  float: left;
}

.jsoneditor-menu > button:hover,
.jsoneditor-menu > .jsoneditor-modes > button:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.jsoneditor-menu > button:focus,
.jsoneditor-menu > button:active,
.jsoneditor-menu > .jsoneditor-modes > button:focus,
.jsoneditor-menu > .jsoneditor-modes > button:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.jsoneditor-menu > button:disabled,
.jsoneditor-menu > .jsoneditor-modes > button:disabled {
  opacity: 0.5;
  background-color: transparent;
  border: none;
}

.jsoneditor-menu > button.jsoneditor-collapse-all {
  background-position: 0 -96px;
}

.jsoneditor-menu > button.jsoneditor-expand-all {
  background-position: 0 -120px;
}

.jsoneditor-menu > button.jsoneditor-sort {
  background-position: -120px -96px;
}

.jsoneditor-menu > button.jsoneditor-transform {
  background-position: -144px -96px;
}

.jsoneditor.jsoneditor-mode-view > .jsoneditor-menu > button.jsoneditor-sort,
.jsoneditor.jsoneditor-mode-form > .jsoneditor-menu > button.jsoneditor-sort,
.jsoneditor.jsoneditor-mode-view > .jsoneditor-menu > button.jsoneditor-transform,
.jsoneditor.jsoneditor-mode-form > .jsoneditor-menu > button.jsoneditor-transform {
  display: none;
}

.jsoneditor-menu > button.jsoneditor-undo {
  background-position: -24px -96px;
}

.jsoneditor-menu > button.jsoneditor-undo:disabled {
  background-position: -24px -120px;
}

.jsoneditor-menu > button.jsoneditor-redo {
  background-position: -48px -96px;
}

.jsoneditor-menu > button.jsoneditor-redo:disabled {
  background-position: -48px -120px;
}

.jsoneditor-menu > button.jsoneditor-compact {
  background-position: -72px -96px;
}

.jsoneditor-menu > button.jsoneditor-format {
  background-position: -72px -120px;
}

.jsoneditor-menu > button.jsoneditor-repair {
  background-position: -96px -96px;
}

.jsoneditor-menu > .jsoneditor-modes {
  display: inline-block;
  float: left;
}

.jsoneditor-menu > .jsoneditor-modes > button {
  background-image: none;
  width: auto;
  padding-left: 6px;
  padding-right: 6px;
}

.jsoneditor-menu > button.jsoneditor-separator,
.jsoneditor-menu > .jsoneditor-modes > button.jsoneditor-separator {
  margin-left: 10px;
}

.jsoneditor-menu a {
  font-family: arial, sans-serif;
  font-size: 14px;
  color: #ffffff;
  opacity: 0.8;
  vertical-align: middle;
}

.jsoneditor-menu a:hover {
  opacity: 1;
}

.jsoneditor-menu a.jsoneditor-poweredBy {
  font-size: 8pt;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
}

.jsoneditor-navigation-bar {
  width: 100%;
  height: 26px;
  line-height: 26px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #d3d3d3;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #808080;
  background-color: #ebebeb;
  overflow: hidden;
  font-family: arial, sans-serif;
  font-size: 14px;
}

.jsoneditor-search {
  font-family: arial, sans-serif;
  position: absolute;
  right: 4px;
  top: 4px;
  border-collapse: collapse;
  border-spacing: 0;
  display: flex;
}

.jsoneditor-search input {
  color: #1a1a1a;
  width: 120px;
  border: none;
  outline: none;
  margin: 1px;
  line-height: 20px;
  font-family: arial, sans-serif;
}

.jsoneditor-search button {
  width: 16px;
  height: 24px;
  padding: 0;
  margin: 0;
  border: none;
  background: url("./img/jsoneditor-icons.svg");
  vertical-align: top;
}

.jsoneditor-search button:hover {
  background-color: transparent;
}

.jsoneditor-search button.jsoneditor-refresh {
  width: 18px;
  background-position: -99px -73px;
}

.jsoneditor-search button.jsoneditor-next {
  cursor: pointer;
  background-position: -124px -73px;
}

.jsoneditor-search button.jsoneditor-next:hover {
  background-position: -124px -49px;
}

.jsoneditor-search button.jsoneditor-previous {
  cursor: pointer;
  background-position: -148px -73px;
  margin-right: 2px;
}

.jsoneditor-search button.jsoneditor-previous:hover {
  background-position: -148px -49px;
}

.jsoneditor-results {
  font-family: arial, sans-serif;
  color: #ffffff;
  padding-right: 5px;
  line-height: 26px;
}

.jsoneditor-frame {
  border: 1px solid transparent;
  background-color: #ffffff;
  padding: 0 2px;
  margin: 0;
}

.jsoneditor-statusbar {
  line-height: 26px;
  height: 26px;
  color: #808080;
  background-color: #ebebeb;
  border-top: 1px solid #d3d3d3;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
}

.jsoneditor-statusbar > .jsoneditor-curserinfo-val {
  margin-right: 12px;
}

.jsoneditor-statusbar > .jsoneditor-curserinfo-count {
  margin-left: 4px;
}

.jsoneditor-statusbar > .jsoneditor-validation-error-icon {
  float: right;
  width: 24px;
  height: 24px;
  padding: 0;
  margin-top: 1px;
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -168px -48px;
  cursor: pointer;
}

.jsoneditor-statusbar > .jsoneditor-validation-error-count {
  float: right;
  margin: 0 4px 0 0;
  cursor: pointer;
}

.jsoneditor-statusbar > .jsoneditor-parse-error-icon {
  float: right;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 1px;
  background-image: url("./img/jsoneditor-icons.svg");
  background-position: -25px 0px;
}

.jsoneditor-statusbar .jsoneditor-array-info a {
  color: inherit;
}

div.jsoneditor-statusbar > .jsoneditor-curserinfo-label,
div.jsoneditor-statusbar > .jsoneditor-size-info {
  margin: 0 4px;
}

.jsoneditor-treepath {
  padding: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  outline: none;
}

.jsoneditor-treepath.show-all {
  word-wrap: break-word;
  white-space: normal;
  position: absolute;
  background-color: #ebebeb;
  z-index: 1;
  box-shadow: 2px 2px 12px rgba(128, 128, 128, 0.3);
}

.jsoneditor-treepath.show-all span.jsoneditor-treepath-show-all-btn {
  display: none;
}

.jsoneditor-treepath div.jsoneditor-contextmenu-root {
  position: absolute;
  left: 0;
}

.jsoneditor-treepath .jsoneditor-treepath-show-all-btn {
  position: absolute;
  background-color: #ebebeb;
  left: 0;
  height: 20px;
  padding: 0 3px;
  cursor: pointer;
}

.jsoneditor-treepath .jsoneditor-treepath-element {
  margin: 1px;
  font-family: arial, sans-serif;
  font-size: 14px;
}

.jsoneditor-treepath .jsoneditor-treepath-seperator {
  margin: 2px;
  font-size: 9pt;
  font-family: arial, sans-serif;
}

.jsoneditor-treepath span.jsoneditor-treepath-element:hover,
.jsoneditor-treepath span.jsoneditor-treepath-seperator:hover {
  cursor: pointer;
  text-decoration: underline;
}

/*!
 * Selectr 2.4.13
 * http://mobius.ovh/docs/selectr
 *
 * Released under the MIT license
 */

.selectr-container {
  position: relative;
}

.selectr-container li {
  list-style: none;
}

.selectr-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0px, 0px, 0px, 0px);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0 none;
}

.selectr-visible {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 11;
}

.selectr-desktop.multiple .selectr-visible {
  display: none;
}

.selectr-desktop.multiple.native-open .selectr-visible {
  top: 100%;
  min-height: 200px !important;
  height: auto;
  opacity: 1;
  display: block;
}

.selectr-container.multiple.selectr-mobile .selectr-selected {
  z-index: 0;
}

.selectr-selected {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 7px 28px 7px 14px;
  cursor: pointer;
  border: 1px solid #999999;
  border-radius: 3px;
  background-color: #ffffff;
}

.selectr-selected::before {
  position: absolute;
  top: 50%;
  right: 10px;
  width: 0;
  height: 0;
  content: "";
  -o-transform: rotate(0deg) translate3d(0px, -50%, 0px);
  -ms-transform: rotate(0deg) translate3d(0px, -50%, 0px);
  -moz-transform: rotate(0deg) translate3d(0px, -50%, 0px);
  -webkit-transform: rotate(0deg) translate3d(0px, -50%, 0px);
  transform: rotate(0deg) translate3d(0px, -50%, 0px);
  border-width: 4px 4px 0 4px;
  border-style: solid;
  border-color: #6c7a86 transparent transparent;
}

.selectr-container.open .selectr-selected::before,
.selectr-container.native-open .selectr-selected::before {
  border-width: 0 4px 4px 4px;
  border-style: solid;
  border-color: transparent transparent #6c7a86;
}

.selectr-label {
  display: none;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.selectr-placeholder {
  color: #6c7a86;
}

.selectr-tags {
  margin: 0;
  padding: 0;
  white-space: normal;
}

.has-selected .selectr-tags {
  margin: 0 0 -2px;
}

.selectr-tag {
  list-style: none;
  position: relative;
  float: left;
  padding: 2px 25px 2px 8px;
  margin: 0 2px 2px 0;
  cursor: default;
  color: #ffffff;
  border: medium none;
  border-radius: 10px;
  background: #acb7bf none repeat scroll 0 0;
}

.selectr-container.multiple.has-selected .selectr-selected {
  padding: 5px 28px 5px 5px;
}

.selectr-options-container {
  position: absolute;
  z-index: 10000;
  top: calc(100% - 1px);
  left: 0;
  display: none;
  box-sizing: border-box;
  width: 100%;
  border-width: 0 1px 1px;
  border-style: solid;
  border-color: transparent #999999 #999999;
  border-radius: 0 0 3px 3px;
  background-color: #ffffff;
}

.selectr-container.open .selectr-options-container {
  display: block;
}

.selectr-input-container {
  position: relative;
  display: none;
}

.selectr-clear,
.selectr-input-clear,
.selectr-tag-remove {
  position: absolute;
  top: 50%;
  right: 22px;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
  -o-transform: translate3d(0px, -50%, 0px);
  -ms-transform: translate3d(0px, -50%, 0px);
  -moz-transform: translate3d(0px, -50%, 0px);
  -webkit-transform: translate3d(0px, -50%, 0px);
  transform: translate3d(0px, -50%, 0px);
  border: medium none;
  background-color: transparent;
  z-index: 11;
}

.selectr-clear,
.selectr-input-clear {
  display: none;
}

.selectr-container.has-selected .selectr-clear,
.selectr-input-container.active .selectr-input-clear {
  display: block;
}

.selectr-selected .selectr-tag-remove {
  right: 2px;
}

.selectr-clear::before,
.selectr-clear::after,
.selectr-input-clear::before,
.selectr-input-clear::after,
.selectr-tag-remove::before,
.selectr-tag-remove::after {
  position: absolute;
  top: 5px;
  left: 9px;
  width: 2px;
  height: 10px;
  content: " ";
  background-color: #6c7a86;
}

.selectr-tag-remove::before,
.selectr-tag-remove::after {
  top: 4px;
  width: 3px;
  height: 12px;
  background-color: #ffffff;
}

.selectr-clear:before,
.selectr-input-clear::before,
.selectr-tag-remove::before {
  -o-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.selectr-clear:after,
.selectr-input-clear::after,
.selectr-tag-remove::after {
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.selectr-input-container.active,
.selectr-input-container.active .selectr-clear {
  display: block;
}

.selectr-input {
  top: 5px;
  left: 5px;
  box-sizing: border-box;
  width: calc(100% - 30px);
  margin: 10px 15px;
  padding: 7px 30px 7px 9px;
  border: 1px solid #999999;
  border-radius: 3px;
}

.selectr-notice {
  display: none;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 16px;
  border-top: 1px solid #999999;
  border-radius: 0 0 3px 3px;
  background-color: #ffffff;
}

.selectr-container.notice .selectr-notice {
  display: block;
}

.selectr-container.notice .selectr-selected {
  border-radius: 3px 3px 0 0;
}

.selectr-options {
  position: relative;
  top: calc(100% + 2px);
  display: none;
  overflow-x: auto;
  overflow-y: scroll;
  max-height: 200px;
  margin: 0;
  padding: 0;
}

.selectr-container.open .selectr-options,
.selectr-container.open .selectr-input-container,
.selectr-container.notice .selectr-options-container {
  display: block;
}

.selectr-option {
  position: relative;
  display: block;
  padding: 5px 20px;
  list-style: outside none none;
  cursor: pointer;
  font-weight: normal;
}

.selectr-options.optgroups > .selectr-option {
  padding-left: 25px;
}

.selectr-optgroup {
  font-weight: bold;
  padding: 0;
}

.selectr-optgroup--label {
  font-weight: bold;
  margin-top: 10px;
  padding: 5px 15px;
}

.selectr-match {
  text-decoration: underline;
}

.selectr-option.selected {
  background-color: #ddd;
}

.selectr-option.active {
  color: #ffffff;
  background-color: #5897fb;
}

.selectr-option.disabled {
  opacity: 0.4;
}

.selectr-option.excluded {
  display: none;
}

.selectr-container.open .selectr-selected {
  border-color: #999999 #999999 transparent #999999;
  border-radius: 3px 3px 0 0;
}

.selectr-container.open .selectr-selected::after {
  -o-transform: rotate(180deg) translate3d(0px, 50%, 0px);
  -ms-transform: rotate(180deg) translate3d(0px, 50%, 0px);
  -moz-transform: rotate(180deg) translate3d(0px, 50%, 0px);
  -webkit-transform: rotate(180deg) translate3d(0px, 50%, 0px);
  transform: rotate(180deg) translate3d(0px, 50%, 0px);
}

.selectr-disabled {
  opacity: 0.6;
}

.selectr-empty,
.has-selected .selectr-placeholder {
  display: none;
}

.has-selected .selectr-label {
  display: block;
}

/* TAGGABLE */

.taggable .selectr-selected {
  padding: 4px 28px 4px 4px;
}

.taggable .selectr-selected::after {
  display: table;
  content: " ";
  clear: both;
}

.taggable .selectr-label {
  width: auto;
}

.taggable .selectr-tags {
  float: left;
  display: block;
}

.taggable .selectr-placeholder {
  display: none;
}

.input-tag {
  float: left;
  min-width: 90px;
  width: auto;
}

.selectr-tag-input {
  border: medium none;
  padding: 3px 10px;
  width: 100%;
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
}

.selectr-input-container.loading::after {
  position: absolute;
  top: 50%;
  right: 20px;
  width: 20px;
  height: 20px;
  content: "";
  -o-transform: translate3d(0px, -50%, 0px);
  -ms-transform: translate3d(0px, -50%, 0px);
  -moz-transform: translate3d(0px, -50%, 0px);
  -webkit-transform: translate3d(0px, -50%, 0px);
  transform: translate3d(0px, -50%, 0px);
  -o-transform-origin: 50% 0 0;
  -ms-transform-origin: 50% 0 0;
  -moz-transform-origin: 50% 0 0;
  -webkit-transform-origin: 50% 0 0;
  transform-origin: 50% 0 0;
  -moz-animation: 500ms linear 0s normal forwards infinite running selectr-spin;
  -webkit-animation: 500ms linear 0s normal forwards infinite running selectr-spin;
  animation: 500ms linear 0s normal forwards infinite running selectr-spin;
  border-width: 3px;
  border-style: solid;
  border-color: #aaa #ddd #ddd;
  border-radius: 50%;
}

@-webkit-keyframes selectr-spin {
  0% {
    -webkit-transform: rotate(0deg) translate3d(0px, -50%, 0px);
    transform: rotate(0deg) translate3d(0px, -50%, 0px);
  }

  100% {
    -webkit-transform: rotate(360deg) translate3d(0px, -50%, 0px);
    transform: rotate(360deg) translate3d(0px, -50%, 0px);
  }
}

@keyframes selectr-spin {
  0% {
    -webkit-transform: rotate(0deg) translate3d(0px, -50%, 0px);
    transform: rotate(0deg) translate3d(0px, -50%, 0px);
  }

  100% {
    -webkit-transform: rotate(360deg) translate3d(0px, -50%, 0px);
    transform: rotate(360deg) translate3d(0px, -50%, 0px);
  }
}

.selectr-container.open.inverted .selectr-selected {
  border-color: transparent #999999 #999999;
  border-radius: 0 0 3px 3px;
}

.selectr-container.inverted .selectr-options-container {
  border-width: 1px 1px 0;
  border-color: #999999 #999999 transparent;
  border-radius: 3px 3px 0 0;
  background-color: #ffffff;
}

.selectr-container.inverted .selectr-options-container {
  top: auto;
  bottom: calc(100% - 1px);
}

.selectr-container ::-webkit-input-placeholder {
  color: #6c7a86;
  opacity: 1;
}

.selectr-container ::-moz-placeholder {
  color: #6c7a86;
  opacity: 1;
}

.selectr-container :-ms-input-placeholder {
  color: #6c7a86;
  opacity: 1;
}

.selectr-container ::placeholder {
  color: #6c7a86;
  opacity: 1;
}`,id=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="240"
   height="144"
   id="svg4136"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="jsoneditor-icons.svg">
  <title
     id="title6512">JSON Editor Icons</title>
  <metadata
     id="metadata4148">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title>JSON Editor Icons</dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs4146" />
  <sodipodi:namedview
     pagecolor="#ff63ff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1920"
     inkscape:window-height="1026"
     id="namedview4144"
     showgrid="true"
     inkscape:zoom="4"
     inkscape:cx="13.229181"
     inkscape:cy="119.82429"
     inkscape:window-x="0"
     inkscape:window-y="0"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg4136"
     showguides="false"
     borderlayer="false"
     inkscape:showpageshadow="true"
     showborder="true">
    <inkscape:grid
       type="xygrid"
       id="grid4640"
       empspacing="24" />
  </sodipodi:namedview>
  <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0"
     id="svg_1"
     height="16"
     width="16"
     y="4"
     x="4" />
  <rect
     id="svg_1-7"
     height="16"
     width="16"
     y="3.999995"
     x="28.000006"
     style="fill:#ec3f29;fill-opacity:0.94117647;stroke:none;stroke-width:0" />
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0"
     x="52.000004"
     y="3.999995"
     width="16"
     height="16"
     id="rect4165" />
  <rect
     id="rect4175"
     height="16"
     width="16"
     y="3.9999852"
     x="172.00002"
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0" />
  <rect
     id="rect4175-3"
     height="16"
     width="16"
     y="3.999995"
     x="196"
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0" />
  <g
     id="g4299"
     style="stroke:none">
    <rect
       x="7.0000048"
       y="10.999998"
       width="9.9999924"
       height="1.9999986"
       id="svg_1-1"
       style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0" />
    <rect
       x="11.000005"
       y="7.0000114"
       width="1.9999955"
       height="9.9999838"
       id="svg_1-1-1"
       style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0" />
  </g>
  <g
     id="g4299-3"
     transform="matrix(0.70710678,-0.70710678,0.70710678,0.70710678,19.029435,12.000001)"
     style="stroke:none">
    <rect
       x="7.0000048"
       y="10.999998"
       width="9.9999924"
       height="1.9999986"
       id="svg_1-1-0"
       style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0" />
    <rect
       x="11.000005"
       y="7.0000114"
       width="1.9999955"
       height="9.9999838"
       id="svg_1-1-1-9"
       style="fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0" />
  </g>
  <rect
     id="svg_1-7-5"
     height="6.9999905"
     width="6.9999909"
     y="7.0000048"
     x="55.000004"
     style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0" />
  <rect
     style="fill:#ffffff;fill-opacity:1;stroke:#4c4c4c;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     x="58"
     y="10.00001"
     width="6.9999909"
     height="6.9999905"
     id="rect4354" />
  <rect
     id="svg_1-7-5-7"
     height="6.9999905"
     width="6.9999909"
     y="10.000005"
     x="58.000004"
     style="fill:#ffffff;fill-opacity:1;stroke:#3c80df;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.94117647" />
  <g
     id="g4378">
    <rect
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0"
       x="198"
       y="10.999999"
       width="7.9999909"
       height="1.9999965"
       id="svg_1-7-5-3" />
    <rect
       id="rect4374"
       height="1.9999946"
       width="11.999995"
       y="7.0000005"
       x="198"
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0" />
    <rect
       id="rect4376"
       height="1.9999995"
       width="3.9999928"
       y="14.999996"
       x="198"
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0" />
  </g>
  <g
     transform="matrix(1,0,0,-1,-23.999995,23.999995)"
     id="g4383">
    <rect
       id="rect4385"
       height="1.9999965"
       width="7.9999909"
       y="10.999999"
       x="198"
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0" />
    <rect
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0"
       x="198"
       y="7.0000005"
       width="11.999995"
       height="1.9999946"
       id="rect4387" />
    <rect
       style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0"
       x="198"
       y="14.999996"
       width="3.9999928"
       height="1.9999995"
       id="rect4389" />
  </g>
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none"
     id="rect3754-4"
     width="16"
     height="16"
     x="76"
     y="3.9999199" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="m 85.10447,6.0157384 -0.0156,1.4063 c 3.02669,-0.2402 0.33008,3.6507996 2.48438,4.5780996 -2.18694,1.0938 0.49191,4.9069 -2.45313,4.5781 l -0.0156,1.4219 c 5.70828,0.559 1.03264,-5.1005 4.70313,-5.2656 l 0,-1.4063 c -3.61303,-0.027 1.11893,-5.7069996 -4.70313,-5.3124996 z"
     id="path4351"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccccccc" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:0.2;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="m 82.78125,5.9984384 0.0156,1.4063 c -3.02668,-0.2402 -0.33007,3.6506996 -2.48437,4.5780996 2.18694,1.0938 -0.49192,4.9069 2.45312,4.5781 l 0.0156,1.4219 c -5.70827,0.559 -1.03263,-5.1004 -4.70312,-5.2656 l 0,-1.4063 c 3.61303,-0.027 -1.11894,-5.7070996 4.70312,-5.3124996 z"
     id="path4351-9"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccccccc" />
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none"
     id="rect3754-25"
     width="16"
     height="16"
     x="100"
     y="3.9999199" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:none"
     d="m 103.719,5.6719384 0,12.7187996 3.03125,0 0,-1.5313 -1.34375,0 0,-9.6249996 1.375,0 0,-1.5625 z"
     id="path2987"
     inkscape:connector-curvature="0" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:none"
     d="m 112.2185,5.6721984 0,12.7187996 -3.03125,0 0,-1.5313 1.34375,0 0,-9.6249996 -1.375,0 0,-1.5625 z"
     id="path2987-1"
     inkscape:connector-curvature="0" />
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none"
     id="rect3754-73"
     width="16"
     height="16"
     x="124"
     y="3.9999199" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:none"
     d="m 126.2824,17.602938 1.78957,0 1.14143,-2.8641 5.65364,0 1.14856,2.8641 1.76565,0 -4.78687,-11.1610996 -1.91903,0 z"
     id="path3780"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="ccccccccc" />
  <path
     style="fill:#4c4c4c;fill-opacity:1;stroke:none"
     d="m 129.72704,13.478838 4.60852,0.01 -2.30426,-5.5497996 z"
     id="path3782"
     inkscape:connector-curvature="0" />
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none"
     id="rect3754-35"
     width="16"
     height="16"
     x="148"
     y="3.9999199" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:none"
     d="m 156.47655,5.8917384 0,2.1797 0.46093,2.3983996 1.82813,0 0.39844,-2.3983996 0,-2.1797 z"
     id="path5008-2"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="ccccccc" />
  <path
     style="fill:#ffffff;fill-opacity:1;stroke:none"
     d="m 152.51561,5.8906384 0,2.1797 0.46094,2.3983996 1.82812,0 0.39844,-2.3983996 0,-2.1797 z"
     id="path5008-2-8"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="ccccccc" />
  <rect
     id="svg_1-7-2"
     height="1.9999961"
     width="11.999996"
     y="64"
     x="54"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0" />
  <rect
     id="svg_1-7-2-2"
     height="2.9999905"
     width="2.9999907"
     y="52"
     x="80.000008"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0" />
  <rect
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="85.000008"
     y="52"
     width="2.9999907"
     height="2.9999905"
     id="rect4561" />
  <rect
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="80.000008"
     y="58"
     width="2.9999907"
     height="2.9999905"
     id="rect4563" />
  <rect
     id="rect4565"
     height="2.9999905"
     width="2.9999907"
     y="58"
     x="85.000008"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0" />
  <rect
     id="rect4567"
     height="2.9999905"
     width="2.9999907"
     y="64"
     x="80.000008"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0" />
  <rect
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="85.000008"
     y="64"
     width="2.9999907"
     height="2.9999905"
     id="rect4569" />
  <circle
     style="opacity:1;fill:none;fill-opacity:1;stroke:#4c4c4c;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"
     id="path4571"
     cx="110.06081"
     cy="57.939209"
     r="4.7438836" />
  <rect
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="116.64566"
     y="-31.79752"
     width="4.229713"
     height="6.4053884"
     id="rect4563-2"
     transform="matrix(0.70710678,0.70710678,-0.70710678,0.70710678,0,0)" />
  <path
     style="fill:#4c4c4c;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="M 125,56 138.77027,56.095 132,64 Z"
     id="path4613"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccc" />
  <path
     sodipodi:nodetypes="cccc"
     inkscape:connector-curvature="0"
     id="path4615"
     d="M 149,64 162.77027,63.905 156,56 Z"
     style="fill:#4c4c4c;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  <rect
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="54"
     y="53"
     width="11.999996"
     height="1.9999961"
     id="rect4638" />
  <rect
     id="svg_1-7-2-24"
     height="1.9999957"
     width="12.99999"
     y="-56"
     x="53"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     transform="matrix(0,1,-1,0,0,0)" />
  <rect
     transform="matrix(0,1,-1,0,0,0)"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0"
     x="53"
     y="-66"
     width="12.99999"
     height="1.9999957"
     id="rect4657" />
  <rect
     id="rect4659"
     height="0.99999291"
     width="11.999999"
     y="57"
     x="54"
     style="fill:#4c4c4c;fill-opacity:0.98431373;stroke:none;stroke-width:0" />
  <rect
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="54"
     y="88.000122"
     width="11.999996"
     height="1.9999961"
     id="rect4661" />
  <rect
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="80.000008"
     y="76.000122"
     width="2.9999907"
     height="2.9999905"
     id="rect4663" />
  <rect
     id="rect4665"
     height="2.9999905"
     width="2.9999907"
     y="76.000122"
     x="85.000008"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1" />
  <rect
     id="rect4667"
     height="2.9999905"
     width="2.9999907"
     y="82.000122"
     x="80.000008"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1" />
  <rect
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="85.000008"
     y="82.000122"
     width="2.9999907"
     height="2.9999905"
     id="rect4669" />
  <rect
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="80.000008"
     y="88.000122"
     width="2.9999907"
     height="2.9999905"
     id="rect4671" />
  <rect
     id="rect4673"
     height="2.9999905"
     width="2.9999907"
     y="88.000122"
     x="85.000008"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1" />
  <circle
     r="4.7438836"
     cy="81.939331"
     cx="110.06081"
     id="circle4675"
     style="opacity:1;fill:none;fill-opacity:1;stroke:#d3d3d3;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  <rect
     transform="matrix(0.70710678,0.70710678,-0.70710678,0.70710678,0,0)"
     id="rect4677"
     height="6.4053884"
     width="4.229713"
     y="-14.826816"
     x="133.6163"
     style="fill:#d3d3d3;fill-opacity:1;stroke:#d3d3d3;stroke-width:0;stroke-opacity:1" />
  <path
     sodipodi:nodetypes="cccc"
     inkscape:connector-curvature="0"
     id="path4679"
     d="m 125,80.000005 13.77027,0.09499 L 132,87.999992 Z"
     style="fill:#d3d3d3;fill-opacity:1;fill-rule:evenodd;stroke:#d3d3d3;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  <path
     style="fill:#d3d3d3;fill-opacity:1;fill-rule:evenodd;stroke:#d3d3d3;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="M 149,88.0002 162.77027,87.9052 156,80.0002 Z"
     id="path4681"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccc" />
  <rect
     id="rect4683"
     height="1.9999961"
     width="11.999996"
     y="77.000122"
     x="54"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1" />
  <rect
     transform="matrix(0,1,-1,0,0,0)"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="77.000122"
     y="-56"
     width="12.99999"
     height="1.9999957"
     id="rect4685" />
  <rect
     id="rect4687"
     height="1.9999957"
     width="12.99999"
     y="-66"
     x="77.000122"
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     transform="matrix(0,1,-1,0,0,0)" />
  <rect
     style="fill:#d3d3d3;fill-opacity:1;stroke:none;stroke-width:0;stroke-opacity:1"
     x="54"
     y="81.000122"
     width="11.999999"
     height="0.99999291"
     id="rect4689" />
  <rect
     id="rect4761-1"
     height="1.9999945"
     width="15.99999"
     y="101"
     x="76.000008"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-0"
     height="1.9999945"
     width="15.99999"
     y="105"
     x="76.000008"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-7"
     height="1.9999945"
     width="9"
     y="109"
     x="76.000008"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-1-1"
     height="1.9999945"
     width="12"
     y="125"
     x="76.000008"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-1-1-4"
     height="1.9999945"
     width="10"
     y="137"
     x="76.000008"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-1-1-4-4"
     height="1.9999945"
     width="10"
     y="129"
     x="82"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <rect
     id="rect4761-1-1-4-4-3"
     height="1.9999945"
     width="9"
     y="133"
     x="82"
     style="fill:#ffffff;fill-opacity:0.8;stroke:none;stroke-width:0" />
  <path
     inkscape:connector-curvature="0"
     style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:0.8;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.66157866;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
     d="m 36.398438,100.0254 c -0.423362,-0.013 -0.846847,0.01 -1.265626,0.062 -1.656562,0.2196 -3.244567,0.9739 -4.507812,2.2266 L 29,100.5991 l -2.324219,7.7129 7.826172,-1.9062 -1.804687,-1.9063 c 1.597702,-1.5308 4.048706,-1.8453 5.984375,-0.7207 1.971162,1.1452 2.881954,3.3975 2.308593,5.5508 -0.573361,2.1533 -2.533865,3.6953 -4.830078,3.6953 l 0,3.0742 c 3.550756,0 6.710442,-2.4113 7.650391,-5.9414 0.939949,-3.5301 -0.618463,-7.2736 -3.710938,-9.0703 -1.159678,-0.6738 -2.431087,-1.0231 -3.701171,-1.0625 z"
     id="path4138" />
  <path
     inkscape:connector-curvature="0"
     style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:0.8;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.66157866;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
     d="m 59.722656,99.9629 c -1.270084,0.039 -2.541493,0.3887 -3.701172,1.0625 -3.092475,1.7967 -4.650886,5.5402 -3.710937,9.0703 0.939949,3.5301 4.09768,5.9414 7.648437,5.9414 l 0,-3.0742 c -2.296214,0 -4.256717,-1.542 -4.830078,-3.6953 -0.573361,-2.1533 0.337432,-4.4056 2.308594,-5.5508 1.935731,-1.1246 4.38863,-0.8102 5.986326,0.7207 l -1.806638,1.9063 7.828128,1.9062 -2.32422,-7.7129 -1.62696,1.7168 c -1.26338,-1.2531 -2.848917,-2.0088 -4.505855,-2.2285 -0.418778,-0.055 -0.842263,-0.076 -1.265625,-0.062 z"
     id="path4138-1" />
  <path
     inkscape:connector-curvature="0"
     style="opacity:0.8;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.96599996;stroke-miterlimit:4;stroke-dasharray:none"
     d="m 10.5,100 0,2 -2.4999996,0 L 12,107 l 4,-5 -2.5,0 0,-2 -3,0 z"
     id="path3055-0-77" />
  <path
     style="opacity:0.8;fill:none;stroke:#ffffff;stroke-width:1.96599996;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="m 4.9850574,108.015 14.0298856,-0.03"
     id="path5244-5-0-5"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cc" />
  <path
     style="opacity:0.8;fill:none;stroke:#ffffff;stroke-width:1.96599996;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
     d="m 4.9849874,132.015 14.0298866,-0.03"
     id="path5244-5-0-5-8"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cc" />
  <path
     inkscape:connector-curvature="0"
     style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:0.4;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#4d4d4d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.66157866;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
     d="m 36.398438,123.9629 c -0.423362,-0.013 -0.846847,0.01 -1.265626,0.062 -1.656562,0.2196 -3.244567,0.9739 -4.507812,2.2266 L 29,124.5366 l -2.324219,7.7129 7.826172,-1.9062 -1.804687,-1.9063 c 1.597702,-1.5308 4.048706,-1.8453 5.984375,-0.7207 1.971162,1.1453 2.881954,3.3975 2.308593,5.5508 -0.573361,2.1533 -2.533864,3.6953 -4.830078,3.6953 l 0,3.0742 c 3.550757,0 6.710442,-2.4093 7.650391,-5.9394 0.939949,-3.5301 -0.618463,-7.2756 -3.710938,-9.0723 -1.159678,-0.6737 -2.431087,-1.0231 -3.701171,-1.0625 z"
     id="path4138-12" />
  <path
     inkscape:connector-curvature="0"
     style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:0.4;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#4d4d4d;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2.66157866;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"
     d="m 59.722656,123.9629 c -1.270084,0.039 -2.541493,0.3888 -3.701172,1.0625 -3.092475,1.7967 -4.650886,5.5422 -3.710937,9.0723 0.939949,3.5301 4.09768,5.9394 7.648437,5.9394 l 0,-3.0742 c -2.296214,0 -4.256717,-1.542 -4.830078,-3.6953 -0.573361,-2.1533 0.337432,-4.4055 2.308594,-5.5508 1.935731,-1.1246 4.38863,-0.8102 5.986326,0.7207 l -1.806638,1.9063 7.828128,1.9062 -2.32422,-7.7129 -1.62696,1.7168 c -1.26338,-1.2531 -2.848917,-2.0088 -4.505855,-2.2285 -0.418778,-0.055 -0.842263,-0.076 -1.265625,-0.062 z"
     id="path4138-1-3" />
  <path
     id="path6191"
     d="m 10.5,116 0,-2 -2.4999996,0 L 12,109 l 4,5 -2.5,0 0,2 -3,0 z"
     style="opacity:0.8;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.96599996;stroke-miterlimit:4;stroke-dasharray:none"
     inkscape:connector-curvature="0" />
  <path
     inkscape:connector-curvature="0"
     style="opacity:0.8;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.96599996;stroke-miterlimit:4;stroke-dasharray:none"
     d="m 10.5,129 0,-2 -2.4999996,0 L 12,122 l 4,5 -2.5,0 0,2 -3,0 z"
     id="path6193" />
  <path
     id="path6195"
     d="m 10.5,135 0,2 -2.4999996,0 L 12,142 l 4,-5 -2.5,0 0,-2 -3,0 z"
     style="opacity:0.8;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.96599996;stroke-miterlimit:4;stroke-dasharray:none"
     inkscape:connector-curvature="0" />
  <path
     sodipodi:type="star"
     style="fill:#4d4d4d;fill-opacity:0.90196078;stroke:#d3d3d3;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"
     id="path4500"
     sodipodi:sides="3"
     sodipodi:cx="11.55581"
     sodipodi:cy="60.073242"
     sodipodi:r1="5.1116104"
     sodipodi:r2="2.5558052"
     sodipodi:arg1="0"
     sodipodi:arg2="1.0471976"
     inkscape:flatsided="false"
     inkscape:rounded="0"
     inkscape:randomized="0"
     d="m 16.66742,60.073242 -3.833708,2.213392 -3.8337072,2.213393 0,-4.426785 0,-4.426784 3.8337082,2.213392 z"
     inkscape:transform-center-x="-1.2779026" />
  <path
     inkscape:transform-center-x="1.277902"
     d="m -31.500004,60.073242 -3.833708,2.213392 -3.833707,2.213393 0,-4.426785 0,-4.426784 3.833707,2.213392 z"
     inkscape:randomized="0"
     inkscape:rounded="0"
     inkscape:flatsided="false"
     sodipodi:arg2="1.0471976"
     sodipodi:arg1="0"
     sodipodi:r2="2.5558052"
     sodipodi:r1="5.1116104"
     sodipodi:cy="60.073242"
     sodipodi:cx="-36.611614"
     sodipodi:sides="3"
     id="path4502"
     style="fill:#4d4d4d;fill-opacity:0.90196078;stroke:#d3d3d3;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"
     sodipodi:type="star"
     transform="scale(-1,1)" />
  <path
     d="m 16.66742,60.073212 -3.833708,2.213392 -3.8337072,2.213392 0,-4.426784 0,-4.426785 3.8337082,2.213392 z"
     inkscape:randomized="0"
     inkscape:rounded="0"
     inkscape:flatsided="false"
     sodipodi:arg2="1.0471976"
     sodipodi:arg1="0"
     sodipodi:r2="2.5558052"
     sodipodi:r1="5.1116104"
     sodipodi:cy="60.073212"
     sodipodi:cx="11.55581"
     sodipodi:sides="3"
     id="path4504"
     style="fill:#4d4d4d;fill-opacity:0.90196078;stroke:#d3d3d3;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"
     sodipodi:type="star"
     transform="matrix(0,1,-1,0,72.0074,71.7877)"
     inkscape:transform-center-y="1.2779029" />
  <path
     inkscape:transform-center-y="-1.2779026"
     transform="matrix(0,-1,-1,0,96,96)"
     sodipodi:type="star"
     style="fill:#4d4d4d;fill-opacity:0.90196078;stroke:#d3d3d3;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"
     id="path4506"
     sodipodi:sides="3"
     sodipodi:cx="11.55581"
     sodipodi:cy="60.073212"
     sodipodi:r1="5.1116104"
     sodipodi:r2="2.5558052"
     sodipodi:arg1="0"
     sodipodi:arg2="1.0471976"
     inkscape:flatsided="false"
     inkscape:rounded="0"
     inkscape:randomized="0"
     d="m 16.66742,60.073212 -3.833708,2.213392 -3.8337072,2.213392 0,-4.426784 0,-4.426785 3.8337082,2.213392 z" />
  <path
     sodipodi:nodetypes="cccc"
     inkscape:connector-curvature="0"
     id="path4615-5"
     d="m 171.82574,65.174193 16.34854,0 -8.17427,-13.348454 z"
     style="fill:#fbb917;fill-opacity:1;fill-rule:evenodd;stroke:#fbb917;stroke-width:1.65161395;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
  <path
     style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
     d="m 179,55 0,6 2,0 0,-6"
     id="path4300"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccc" />
  <path
     style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
     d="m 179,62 0,2 2,0 0,-2"
     id="path4300-6"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccc" />
  <path
     style="fill:#ffffff;fill-opacity:0.8;fill-rule:evenodd;stroke:#ffffff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:round;stroke-opacity:0.8"
     d="M 99.994369,113.0221 102,114.98353 l 7,-6.9558 3,0.97227 2,-1 1,-2 0,-3 -3,3 -3,-3 3,-3 -3,0 -2,1 -1,2 0.99437,3.0221 z"
     id="path4268"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="ccccccccccccccc" />
  <rect
     id="rect4175-3-5"
     height="16"
     width="16"
     y="4"
     x="220"
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0" />
  <path
     style="fill:#ffffff;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
     d="m 234,6 0,2 -5,5 0,5 -2,0 0,-5 -5,-5 0,-2"
     id="path3546"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccccccc" />
  <g
     transform="matrix(1.3333328,0,0,-1.5999992,-139.9999,127.19999)"
     id="g4383-6">
    <rect
       id="rect4385-2"
       height="1.2499905"
       width="5.9999924"
       y="12.625005"
       x="198.00002"
       style="fill:#ffffff;fill-opacity:0.8;stroke:#000000;stroke-width:0" />
    <rect
       style="fill:#ffffff;fill-opacity:0.8;stroke:#000000;stroke-width:0"
       x="198.00002"
       y="15.125007"
       width="7.4999928"
       height="1.2499949"
       id="rect4387-9" />
    <rect
       style="fill:#ffffff;fill-opacity:0.8;stroke:#000000;stroke-width:0"
       x="198.00002"
       y="7.6250024"
       width="2.9999909"
       height="1.2499905"
       id="rect4389-1-0" />
    <rect
       style="fill:#ffffff;fill-opacity:0.8;stroke:#000000;stroke-width:0"
       x="198.00002"
       y="10.125004"
       width="4.4999919"
       height="1.2499905"
       id="rect4389-1-9" />
    <path
       style="fill:#ffffff;fill-opacity:0.8;fill-rule:evenodd;stroke:none;stroke-width:0.68465352px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       d="m 207.00001,16.375004 0,-5.625005 -2.25,0 3,-3.1250014 3,3.1250014 -2.25,0 0,5.625005 -1.5,0"
       id="path4402"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="cccccccc" />
  </g>
  <path
     style="fill:#ffffff;fill-opacity:0.8;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
     d="m 164,100 0,3 -6,6 0,7 -4,0 0,-7 -6,-6 0,-3"
     id="path3546-2-2"
     inkscape:connector-curvature="0"
     sodipodi:nodetypes="cccccccc" />
  <rect
     style="fill:#4c4c4c;fill-opacity:1;stroke:none;stroke-width:0"
     id="svg_1-3"
     height="16"
     width="16"
     y="28"
     x="4" />
  <path
     sodipodi:nodetypes="ccccccccc"
     inkscape:connector-curvature="0"
     id="path4402-5-7"
     d="m 15,41 0,-7 -4,0 0,3 -5,-4 5,-4 0,3 6,0 0,9"
     style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.68465352px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
</svg>
`,rd={__name:"managed-json-editor",props:{modelValue:{type:String,required:!0}},emits:["update:modelValue","error"],setup(e,{emit:n}){const o=e,t=n,i=vue.ref(null);let r,a=!1;return vue.onMounted(()=>{if(!document.getElementById("fast-search-jsoneditor-style")){const s=document.createElement("style");s.id="fast-search-jsoneditor-style",s.textContent=od.replaceAll("./img/jsoneditor-icons.svg",`data:image/svg+xml,${encodeURIComponent(id)}`),document.head.append(s);}r=new Gi(i.value,{mode:"code",modes:["code","tree","preview"],language:"zh-CN",onChange(){a||t("update:modelValue",r.getText());},onValidate(s){try{return tt(s),[]}catch(c){return [{path:[],message:c.message}]}},onError:s=>t("error",s)}),r.setText(o.modelValue);}),vue.watch(()=>o.modelValue,s=>{if(!(!r||r.getText()===s)){a=!0;try{r.setText(s);}catch(c){t("error",c);}finally{a=!1;}}}),vue.onUnmounted(()=>{r==null||r.destroy();}),(s,c)=>(vue.openBlock(),vue.createElementBlock("div",{ref_key:"container",ref:i,class:"sm-json-editor","aria-label":"网址 JSON 编辑器"},null,512))}};const ad={class:"sm-header"},sd={id:"sm-title"},ld=["disabled"],cd={class:"sm-tabs",role:"tablist","aria-label":"网址管理页面"},dd=["id","aria-selected","aria-controls","tabindex","disabled","onClick"],ud=["id","aria-labelledby"],pd={key:0,class:"sm-help"},fd=["disabled","inert"],hd={class:"sm-category-tabs","aria-label":"网址分类"},md={class:"sm-category-group"},gd=["aria-pressed","onClick"],vd={class:"sm-category-row"},bd={class:"sm-row-tools"},yd={class:"sm-button-group"},wd=["disabled"],xd=["disabled"],_d=["aria-pressed","title"],kd={key:1,class:"sm-empty"},jd=vue.createElementVNode("p",{class:"sm-help"},"拖动网址左侧手柄调整顺序，地址中的 %s 代表搜索关键词。",-1),Sd={class:"sm-editor-actions"},Ed=vue.createElementVNode("span",{class:"sm-help"},"清除后恢复内置网址，确认后立即生效。",-1),Cd=["disabled"],zd=vue.createElementVNode("p",{class:"sm-help"},"拖动调整划词搜索入口的顺序，点击眼睛图标显示或隐藏。",-1),Td={class:"sm-footer"},Md={key:0},Dd={class:"sm-help"},Ad={class:"sm-footer-actions"},Od=["disabled"],Ld=["disabled"],Id={__name:"site-manager",setup(e){const{reloadSites:n,saveSites:o,clearSites:t}=rt(),{reloadToolbar:i,saveToolbar:r}=lt(),{managerVisible:a,managerTab:s}=ct(),c=[{name:"sites",label:"配置"},{name:"edit",label:"编辑"},{name:"toolbar",label:"划词工具栏"}],l=vue.ref(s.value),d=vue.ref(null),u=document.activeElement,p=vue.ref([]),b=vue.ref([]),f=vue.ref("[]"),g=vue.ref("[]"),v=vue.ref("[]"),_=vue.ref(""),m=vue.ref(!1),A=vue.ref(!1),D=vue.ref(!1),$=vue.ref(""),R=vue.ref(!1),B=vue.computed(()=>p.value.findIndex(S=>S.name===_.value)),F=vue.computed(()=>p.value[B.value]),ae=vue.computed(()=>p.value.filter(S=>S.name.startsWith("personal")&&S.name!==_.value)),se=vue.computed(()=>l.value==="toolbar"?D.value:A.value),ve=vue.computed(()=>A.value&&(JSON.stringify(p.value)!==f.value||l.value==="edit"&&v.value!==JSON.stringify(p.value,null,2))),Le=vue.computed(()=>D.value&&JSON.stringify(b.value)!==g.value),he=vue.computed(()=>ve.value||Le.value),be=vue.computed(()=>l.value==="toolbar"?Le.value:ve.value);function de(S){R.value=!0,$.value=S.message||String(S);}function ne(S){R.value=!1,$.value=S;}function Ie(){var S;p.value.some(O=>O.name===_.value)||(_.value=((S=p.value[0])==null?void 0:S.name)||"");}function Se(S){p.value=ke(S),f.value=JSON.stringify(S),v.value=JSON.stringify(S,null,2),Ie(),A.value=!0;}function ln(S){b.value=ke(S),g.value=JSON.stringify(S),D.value=!0;}async function io(){m.value=!0,A.value=D.value=!1,ne("");const S=await Promise.allSettled([n(),i()]);S[0].status==="fulfilled"&&Se(S[0].value),S[1].status==="fulfilled"&&ln(S[1].value);const O=S.filter(T=>T.status==="rejected").map(T=>T.reason.message||String(T.reason));O.length&&de(Error(O.join("；"))),m.value=!1;}function zn(){return !he.value||window.confirm("有未保存的修改，确定放弃吗？")}function Tn(S){if(!(m.value||S===l.value)){if(l.value==="edit"&&A.value)try{p.value=tt(JSON.parse(v.value)),Ie();}catch(O){de(O);return}S==="edit"&&(v.value=JSON.stringify(p.value,null,2)),l.value=S,ne("");}}async function ro(S){const O=c.findIndex(T=>T.name===l.value);Tn(c[(O+S+c.length)%c.length].name),await vue.nextTick(),d.value.querySelector(`[id="sm-tab-${l.value}"]`).focus();}async function Di(){if(!(m.value||!se.value)){m.value=!0,ne("");try{l.value==="toolbar"?ln(await r(b.value)):Se(await o(l.value==="edit"?JSON.parse(v.value):p.value)),ne("保存成功，当前页面已生效；其他已打开页面请刷新。");}catch(S){de(S);}finally{m.value=!1;}}}function Ai(){if(!m.value){if(!se.value){Mn();return}l.value==="toolbar"?ln(JSON.parse(g.value)):Se(JSON.parse(f.value)),ne("已取消当前修改，恢复为上次保存的内容。");}}async function Oi(){if(!(m.value||!A.value)&&window.confirm("将清除已保存的网址管理配置及当前菜单草稿，并恢复内置网址。确认后立即生效，确定清除吗？")){m.value=!0,ne("");try{Se(await t()),ne("网址管理配置已清除，已恢复内置网址；其他已打开页面请刷新。");}catch(S){de(S);}finally{m.value=!1;}}}function Li(){let S;do S=`personal-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;while(p.value.some(O=>O.name===S));p.value.push({name:S,nameZh:"新分类",list:[],data:{visible:!0}}),_.value=S;}function ao(S){const O=B.value,T=O+S;T>=0&&T<p.value.length&&p.value.splice(T,0,p.value.splice(O,1)[0]);}function Ii(){window.confirm(`删除分类“${F.value.nameZh}”及其中的 ${F.value.list.length} 个网址？保存后生效。`)&&(p.value.splice(B.value,1),Ie());}function Vi({item:S,name:O}){const T=p.value.find(Ve=>Ve.name===O);T&&(T.list.push(S),ne(`已添加到“${T.nameZh}”，点击保存后生效。`));}function Mn(){!m.value&&zn()&&(a.value=!1);}function Ni(S){if(S.key==="Escape"&&(S.preventDefault(),S.stopPropagation(),Mn()),S.key!=="Tab")return;const O=[...d.value.querySelectorAll('button, input, textarea, select, [tabindex="0"]')].filter(ut=>!ut.matches(":disabled")&&ut.tabIndex>=0&&ut.getClientRects().length),T=O[0],Ve=O[O.length-1];if(!T){S.preventDefault();return}S.shiftKey&&(document.activeElement===T||document.activeElement===d.value)?(S.preventDefault(),Ve.focus()):!S.shiftKey&&(document.activeElement===Ve||document.activeElement===d.value)&&(S.preventDefault(),T.focus());}return vue.onMounted(()=>{d.value.focus(),io();}),vue.onUnmounted(()=>{u!=null&&u.isConnected&&u.focus();}),(S,O)=>(vue.openBlock(),vue.createBlock(vue.Teleport,{to:"#fast-search"},[vue.createElementVNode("div",{class:"sm-overlay",onClick:vue.withModifiers(Mn,["self"])},[vue.createElementVNode("section",{ref_key:"panel",ref:d,class:"sm-dialog",role:"dialog","aria-modal":"true","aria-labelledby":"sm-title",tabindex:"-1",onKeydown:Ni},[vue.createElementVNode("header",ad,[vue.createElementVNode("h2",sd,[vue.createTextVNode("网址管理 "),vue.createElementVNode("span",null,"Fast Search "+vue.toDisplayString(vue.unref(Zt)),1)]),vue.createElementVNode("button",{type:"button",class:"sm-icon-button sm-close","aria-label":"关闭网址管理",disabled:m.value,onClick:Mn},[vue.createVNode(vue.unref(Zl))],8,ld)]),vue.createElementVNode("nav",cd,[(vue.openBlock(),vue.createElementBlock(vue.Fragment,null,vue.renderList(c,T=>vue.createElementVNode("button",{id:`sm-tab-${T.name}`,key:T.name,type:"button",role:"tab","aria-selected":l.value===T.name,"aria-controls":`sm-page-${T.name}`,tabindex:l.value===T.name?0:-1,disabled:m.value,onClick:Ve=>Tn(T.name),onKeydown:[O[0]||(O[0]=vue.withKeys(vue.withModifiers(Ve=>ro(-1),["prevent"]),["left"])),O[1]||(O[1]=vue.withKeys(vue.withModifiers(Ve=>ro(1),["prevent"]),["right"]))]},vue.toDisplayString(T.label),41,dd)),64))]),vue.createElementVNode("div",{id:`sm-page-${l.value}`,class:vue.normalizeClass(["sm-body",{"sm-body-json":l.value==="edit"}]),role:"tabpanel","aria-labelledby":`sm-tab-${l.value}`},[se.value?vue.createCommentVNode("",!0):(vue.openBlock(),vue.createElementBlock("p",pd,vue.toDisplayString(m.value?"正在读取配置…":"配置读取失败，请关闭后重新打开重试。"),1)),vue.createElementVNode("fieldset",{disabled:m.value||!se.value,inert:m.value||!se.value?"":null},[l.value==="sites"?(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:0},[vue.createElementVNode("div",hd,[vue.createElementVNode("div",md,[(vue.openBlock(!0),vue.createElementBlock(vue.Fragment,null,vue.renderList(p.value,T=>(vue.openBlock(),vue.createElementBlock("button",{key:T.name,type:"button","aria-pressed":_.value===T.name,onClick:Ve=>_.value=T.name},vue.toDisplayString(T.nameZh||"未命名"),9,gd))),128))]),vue.createElementVNode("button",{type:"button",class:"sm-icon-button sm-add-category","aria-label":"添加分类",title:"添加分类",onClick:Li},[vue.createVNode(vue.unref(Xl))])]),F.value?(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:0},[vue.createElementVNode("div",vd,[vue.withDirectives(vue.createElementVNode("input",{"onUpdate:modelValue":O[2]||(O[2]=T=>F.value.nameZh=T),"aria-label":"分类名称",placeholder:"分类名称"},null,512),[[vue.vModelText,F.value.nameZh]]),vue.createElementVNode("div",bd,[vue.createElementVNode("div",yd,[vue.createElementVNode("button",{type:"button",class:"sm-icon-button","aria-label":"分类左移",title:"分类左移",disabled:B.value===0,onClick:O[3]||(O[3]=T=>ao(-1))},[vue.createVNode(vue.unref(Rl))],8,wd),vue.createElementVNode("button",{type:"button",class:"sm-icon-button","aria-label":"分类右移",title:"分类右移",disabled:B.value===p.value.length-1,onClick:O[4]||(O[4]=T=>ao(1))},[vue.createVNode(vue.unref($l))],8,xd)]),vue.createElementVNode("button",{type:"button",class:vue.normalizeClass(["sm-icon-button",F.value.data.visible?"sm-plain-primary":"sm-plain-muted"]),"aria-pressed":F.value.data.visible,"aria-label":"显示分类",title:F.value.data.visible?"隐藏分类":"显示分类",onClick:O[5]||(O[5]=T=>F.value.data.visible=!F.value.data.visible)},[F.value.data.visible?(vue.openBlock(),vue.createBlock(vue.unref(vi),{key:0})):(vue.openBlock(),vue.createBlock(vue.unref(gi),{key:1}))],10,_d),vue.createElementVNode("button",{type:"button",class:"sm-icon-button sm-plain-danger","aria-label":"删除分类",title:"删除分类",onClick:Ii},[vue.createVNode(vue.unref(mi))])])]),(vue.openBlock(),vue.createBlock(Vo,{key:_.value,modelValue:F.value.list,"onUpdate:modelValue":O[6]||(O[6]=T=>F.value.list=T),disabled:m.value||!se.value,"personal-categories":ae.value,onCopy:Vi,onError:de},null,8,["modelValue","disabled","personal-categories"]))],64)):(vue.openBlock(),vue.createElementBlock("p",kd,"暂无分类，点击右上角 ＋ 添加分类。")),jd],64)):l.value==="edit"&&se.value?(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:1},[vue.createElementVNode("div",Sd,[Ed,vue.createElementVNode("button",{type:"button",class:"sm-plain-danger",disabled:m.value,onClick:Oi},"清除网址管理配置",8,Cd)]),vue.createVNode(rd,{modelValue:v.value,"onUpdate:modelValue":O[7]||(O[7]=T=>v.value=T),onError:de},null,8,["modelValue"])],64)):l.value==="toolbar"?(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:2},[vue.createVNode(Vo,{modelValue:b.value,"onUpdate:modelValue":O[8]||(O[8]=T=>b.value=T),disabled:m.value||!se.value,onError:de},null,8,["modelValue","disabled"]),zd],64)):vue.createCommentVNode("",!0)],8,fd)],10,ud),vue.createElementVNode("footer",Td,[vue.createElementVNode("div",{class:vue.normalizeClass(["sm-feedback",{"sm-error":R.value}]),role:"status","aria-live":"polite"},[$.value?(vue.openBlock(),vue.createElementBlock("span",Md,vue.toDisplayString($.value),1)):vue.createCommentVNode("",!0),vue.createElementVNode("span",Dd,vue.toDisplayString(be.value?"有未保存的修改":"配置已加载")+vue.toDisplayString(l.value==="toolbar"?" · 划词工具栏":" · 搜索菜单")+vue.toDisplayString(!be.value&&he.value?" · 其他 Tab 尚未保存":""),1)],2),vue.createElementVNode("div",Ad,[vue.createElementVNode("button",{type:"button",disabled:m.value,onClick:Ai},"取消",8,Od),vue.createElementVNode("button",{type:"button",class:"sm-success",disabled:m.value||!se.value||!be.value,onClick:Di},vue.toDisplayString(m.value?"处理中…":"保存"),9,Ld)])])],544)])]))}},Vd="fast-search:open-search",$t="fast-search:open-search";const Nd={name:"fast-search",components:{logo:sa,asMenu:_s,sideBar:ol,hoverBtn:al,iconfont:pl,selectionBar:yl,searchDialog:Vl,siteManager:Id},setup(){const{isFullScreen:e}=Yr(),{value:n}=Gt(),{show:o}=Wt(),{visible:t}=lt("tm");fi();const{managerVisible:i}=ct(),r=vue.computed(()=>[`as-${vue.toValue(n)}`,vue.toValue(o)===1?"as-show":"as-hide"]),a=vue.computed(()=>!Re.invisible&&!vue.unref(e));vue.watchEffect(()=>{const f=Re.invisible||Re.disabled||vue.toValue(o)===2;Er(vue.toValue(n),f);});let s=!1;function c(f){s||f.disabled||(Sr(),_r(),jr(vue.toValue(n),f),s=!0);}vue.watch(Re,f=>{c(f);},{immediate:!0});const l=vue.ref(!1),d=vue.ref("");function u(f){d.value=f,l.value=!0;}function p(){var _;const f=(_=window.getSelection())==null?void 0:_.toString().trim(),g=f?"":li();let v=f||"";if(!v&&g)try{v=decodeURIComponent(g);}catch{v=g;}u(v);}vue.onMounted(()=>document.addEventListener($t,p)),vue.onBeforeUnmount(()=>document.removeEventListener($t,p));const{disabled:b}=vue.toRefs(Re);return {disabled:b,mode:n,classList:r,visible:a,dialogVisible:l,openDialog:u,keyword:d,toolbarVisible:t,managerVisible:i}}};function Rd(e,n,o,t,i,r){const a=vue.resolveComponent("logo"),s=vue.resolveComponent("as-menu"),c=vue.resolveComponent("side-bar"),l=vue.resolveComponent("hoverBtn"),d=vue.resolveComponent("selection-bar"),u=vue.resolveComponent("search-dialog"),p=vue.resolveComponent("iconfont"),b=vue.resolveComponent("site-manager");return vue.openBlock(),vue.createElementBlock(vue.Fragment,null,[t.disabled?vue.createCommentVNode("",!0):(vue.openBlock(),vue.createElementBlock(vue.Fragment,{key:0},[vue.withDirectives(vue.createElementVNode("div",{style:{opacity:"0"},class:vue.normalizeClass(["as-container",t.classList])},[vue.createVNode(a,{mode:t.mode},null,8,["mode"]),vue.createVNode(s,{mode:t.mode},null,8,["mode"]),vue.createVNode(c)],2),[[vue.vShow,t.visible]]),vue.withDirectives(vue.createVNode(l,null,null,512),[[vue.vShow,t.visible]])],64)),t.toolbarVisible===1?(vue.openBlock(),vue.createBlock(d,{key:1,onOpenDialog:t.openDialog},null,8,["onOpenDialog"])):vue.createCommentVNode("",!0),vue.createVNode(u,{keyword:t.keyword,visible:t.dialogVisible,"onUpdate:visible":n[0]||(n[0]=f=>t.dialogVisible=f)},null,8,["keyword","visible"]),vue.createVNode(p),t.managerVisible?(vue.openBlock(),vue.createBlock(b,{key:2})):vue.createCommentVNode("",!0)],64)}const Pd=W(Nd,[["render",Rd]]);qr();var No,Ro;(Ro=(No=globalThis.chrome)==null?void 0:No.runtime)!=null&&Ro.onMessage&&globalThis.chrome.runtime.onMessage.addListener(e=>{(e==null?void 0:e.type)===Vd&&document.dispatchEvent(new CustomEvent($t));});const $d=on();if(!$d){const e=vue.createApp(Pd),n=br(),o=document.documentElement.insertBefore(n,document.body);if(e.mount(o),lo){const{openManager:t}=ct();lo("Fast Search：网址管理",()=>t("sites"));}}

})(Vue, Popper, JSONEditor);