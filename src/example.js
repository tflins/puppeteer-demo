const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setViewport({
    width: 1920,
    height: 1080
  })
  await page.goto('https://tflin.com')
  await page.screenshot({ path: 'example.png' })

  await browser.close()

})()
