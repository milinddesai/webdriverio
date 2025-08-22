import cookie_bannerPage from './cookie_banner.page';
import Page from './page';

class HomePage extends Page {
    /**
     * Selector for main navigation
     */
    public get mainNav() {
        return $("aria/Main navigation");
    }

    public get contactUs() {
        return $("aria/Contact Us");
    }

    public get pageHeader() {
        return $("h1");
    }

    /**
     * Gets the page title using wdio-wait-for
     */
    public async getPageTitle() {
        await browser.getTitle();
    }

    public async getPageHeaderText() {
        await this.pageHeader.waitForDisplayed();
        return await this.pageHeader.getText();
    }

    /**
     * Checks if main navigation is displayed
     */
    public async isHomePageLoaded() {
        await cookie_bannerPage.handleCookieBanner(); 
        await this.mainNav.waitForDisplayed();
        return await this.mainNav.isDisplayed();
    }

    public async isContactUsLinkEnabled() {
        await this.contactUs.waitForDisplayed();
        return await this.contactUs.isClickable();
    }

    /**
     * Opens the home page
     */
    public open() {
        return super.open(''); // '' opens the root URL
    }
}

export default new HomePage();
