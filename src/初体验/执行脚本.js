const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://tflin.com')
  const firstPostCount = await page.evaluate(() => {
    const $cards = document.querySelectorAll('.container .columns .column .card .article')

    return $cards.length
  })

  console.log('第一页的文章数：', firstPostCount)

  await browser.close()
})()
