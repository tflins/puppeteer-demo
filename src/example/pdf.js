const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://tflin.com')
  await page.pdf({
    path: 'tflin.com.pdf',
    format: 'A4'
  })

  await browser.close()
})()
