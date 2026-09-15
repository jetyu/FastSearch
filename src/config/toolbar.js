export default [
  {
    nameZh: 'Google',
    url: 'https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8'
  },
  {
    nameZh: '百度',
    url: 'https://www.baidu.com/s?wd=%s&ie=utf-8'
  },
  {
    nameZh: 'Google翻译',
    url: 'https://translate.google.com/?q=%s'
  },
  {
    nameZh: 'ChatGPT',
    url: 'https://chatgpt.com/?q=%s'
  }
].map(item => ({
  ...item,
  data: {
    visible: true
  }
}))
