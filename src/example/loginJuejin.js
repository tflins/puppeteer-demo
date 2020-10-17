/**
 * 登录掘金
 */
const puppeteer = require('puppeteer')
const path = require('path')

const userInfo = {
  user: 'xxxxxx',
  password: 'xxxxxxx'
}

;(async () => {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto('https://juejin.im/', {
    waitUntil: 'networkidle0'
  })

  const $loginBtn = await page.$('.login-button')
  await $loginBtn.click()

  const $promptBox = await page.$('.prompt-box .clickable')
  await $promptBox.click()

  const $user = await page.$('.auth-modal-box input[name="loginPhoneOrEmail"]')
  const $password = await page.$('.auth-modal-box input[name="loginPassword"]')
  const $login = await page.$('.auth-modal-box .btn')

  await $user.type(userInfo.user)
  await $password.type(userInfo.password)

  await $login.click()

  // await page.waitForNavigation()

  await page.screenshot({ path: path.resolve(__dirname, 'example.png') })

  browser.close()
})()
