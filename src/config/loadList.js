// const height = 30
const width = 100

export const list = [
  {
    url: /\/\/www\.google\.com(.hk)?\/search/
  },
  {
    url: /\/\/www\.baidu\.com\/(s|baidu)\?/,
    style: {
      1: '.selected-search-box { transform: translateY(-30px);}'
    }
  },
  {
    url: /\/\/[^.]*\.bing\.com\/search/
  },
  {
    url: /\/\/duckduckgo\.com\/*/
  },
  {
    url: /\/\/www\.sogou\.com\/(?:web|s)/,
    selectors: '#upquery'
  },
  {
    url: /\/\/baike\.baidu\.com\/search/
  },
  {
    url: /\/\/\D{2,5}\.wikipedia\.org\/wiki/
  },
  {
    url: /\/\/www\.zhihu\.com\/search\?/
  },
  {
    url: /\/\/weixin\.sogou\.com\/weixin\?/,
    style: {
      2: `.headsearch#scroll-header { left:unset; }`
    }
  },
  {
    url: /\/\/search\.bilibili\.com\/all/,
    selectors: '.search-input-el'
  },
  {
    url: /\/\/www\.youtube\.com\/results/,
    style: {
      2: `ytd-app {margin-left:${width}px !important;}ytd-mini-guide-renderer.ytd-app, app-drawer{left:${width}px !important;}#masthead-container.ytd-app {width: calc(100% - 100px);}`
    }
  },
  {
    url: /\/\/so\.iqiyi\.com\/so\/q/
  },
  {
    url: /\/\/v\.qq\.com\/x\/search/
  },
  {
    url: /\/\/music\.163\.com\/.*?#\/search/
  },
  {
    url: /\/\/image\.baidu\.com\/search/
  },
  {
    url: /\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/
  },
  {
    url: /\/\/.*\.bing\.com\/images\/search/
  },
  {
    url: /\/\/www\.flickr\.com\/search\//
  },
  {
    url: /^http:\/\/www\.pixiv\.net\/search\.php/
  },
  {
    url: /\/\/thepiratebay\.org\/search/
  },
  {
    url: /\/\/translate\.google(?:\.\D{1,4}){1,2}/
  },
  {
    url: /\/\/fanyi\.baidu\.com/
  },
  {
    url: /\/\/.*\.bing\.com\/dict\/search\?q=/
  },
  {
    url: /\/\/dict\.youdao\.com\/search/
  },
  {
    url: /\/\/s\.taobao\.com\/search/
  },
  {
    url: /\/\/search\.jd\.com\/search/
  },
  {
    url: /\/\/s\.weibo\.com\/weibo\?q=/
  },
  {
    url: /\/\/www\.douban\.com\/search/
  },
  {
    url: /\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
    style: {
      2: `#left_menu_content { left: ${width}px !important;}`
    }
  },
  {
    url: /\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/
  },
  {
    url: /\/\/github\.com\/search/
  }
]
