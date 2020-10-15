/**
 * 谷歌无头浏览器 puppeteer 初体验
 * 前往我的博客 tflin.com 截图
 */

const puppeteer = require('puppeteer')
const path = require('path')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto('https://tflin.com')
  await page.screenshot({ path: path.resolve(__dirname, 'example.png'), fullPage: true })

  await browser.close()

})()
