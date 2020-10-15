/**
 * 爬取掘金首页文章列表
 */
const puppeteer = require('puppeteer')
const fs = require('fs')

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

  const titleList = await page.evaluate(() => {
    const $titleList = document.querySelectorAll('.content-box .title')
    return [...$titleList].map($title => $title.innerText)
  })

  console.log(titleList)

  browser.close()
}

start()
