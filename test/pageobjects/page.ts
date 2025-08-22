import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        process.env.CI ?  browser.setWindowRect(0, 0, 1440, 1080) : browser.maximizeWindow()
        return browser.url(`https://evinova.com/${path}`)
    }
}
