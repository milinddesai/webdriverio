import { $ } from '@wdio/globals';

class CookieBannerPage {
    public get cookieBanner () {
        return $('aria/Cookies');
    }
    public get btnAcceptCookies () {
        return $('aria/Allow All Cookies');
    }
    public get btnDeclineCookies () {
        return $('aria/Decline All Optional');
    }

    /**
     * Checks for cookie banner and handles user choice (default: decline)
     */
    public async handleCookieBanner(accept: boolean = false) {
        const banner = await this.cookieBanner;
        if (await banner.isDisplayed()) {
            if (accept) {
                const acceptBtn = await this.btnAcceptCookies;
                if (await acceptBtn.isDisplayed()) {
                    await acceptBtn.click();
                }
            } else {
                const declineBtn = await this.btnDeclineCookies;
                if (await declineBtn.isDisplayed()) {
                    await declineBtn.click();
                }
            }
        }
    }
}

export default new CookieBannerPage();
