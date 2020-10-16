/**
 * 爬取掘金首页文章列表
 */
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const URL = 'https://juejin.im/'

async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // waitUntil参数是来确定满足什么条件才认为页面跳转完成。包括以下事件：
  // load - 页面的load事件触发时
  // domcontentloaded - 页面的DOMContentLoaded事件触发时
  // networkidle0 - 不再有网络连接时触发（至少500毫秒后）
  // networkidle2 - 只有2个网络连接时触发（至少500毫秒后）
  await page.goto(URL, {
    waitUntil: 'networkidle0'
  })

  const $hotBtn = await page.$('.nav-item a[href="/?sort=three_days_hottest"]')
  await $hotBtn.click()
  await page.waitForSelector('.content-box .title')

  const titleList = await page.evaluate(URL => {
    const $titleList = document.querySelectorAll('.content-box .title')
    const $likeList = document.querySelectorAll('.action-list .like')
    return [...$titleList].map(($title, index) => {
      return {
        标题: $title.innerText,
        链接: `${URL}${$title.getAttribute('href')}`,
        点赞: $likeList[index] ? $likeList[index].innerText : null
      }
    })
  }, URL)

  fs.writeFileSync(
    path.resolve(__dirname, 'juejin.json'),
    JSON.stringify({ titleList }, null, '\t')
  )

  browser.close()
}

start()
