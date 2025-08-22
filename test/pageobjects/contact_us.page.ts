import { $ } from '@wdio/globals'
import CookieBannerPage from './cookie_banner.page';
import Page from './page';
import {textToBePresentInElement} from 'wdio-wait-for';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ContactUsPage extends Page {
    /**
     * define selectors using getter methods
     */
        public get inputFirstName () {
            return $('#first_name');
        }
        public get inputLastName () {
            return $('#last_name');
        }
        public get inputEmail () {
            return $('#email');
        }
        public get inputCompany () {
            return $('#company');
        }
        public get inputTitle () {
            return $('#title');
        }
        public get selectCountry () {
            return $('aria/Country');
        }
        public get inputPhone () {
            return $('#phone');
        }
        public get selectTherapeuticArea () {
            return $('aria/Therapeutic Area');
        }
        public get selectInterestedIn () {
            return $(`aria/I'm interested in`);
        }
        public get checkboxMarketing () {
            return $('//input[@type="checkbox"][following-sibling::label[contains(text(), "I would like to receive marketing communications from Evinova")]]');

        }
        public get btnSubmit () {
            return $('button[aria-label="Send"]');
        }

        public get pageSectionHeader () {
            return $('h1');
        }

    /**
     */
    public async fillContactForm(details: {
        firstName: string;
        lastName: string;
        email: string;
        company: string;
        title: string;
        country: string;
        phone: string;
        therapeuticArea: string;
        interestedIn: string;
        marketing?: boolean;
    }) {
        if (details.marketing) {
            const checkbox = await this.checkboxMarketing;
            if (!(await checkbox.isSelected())) {
                await checkbox.click();
            }
        }
        await this.inputFirstName.setValue(details.firstName);
        await this.inputLastName.setValue(details.lastName);
        await this.inputEmail.setValue(details.email);
        await this.inputCompany.setValue(details.company);
        await this.inputTitle.setValue(details.title);
        await this.selectCountry.selectByVisibleText(details.country);
        await this.inputPhone.setValue(details.phone);
        await this.selectTherapeuticArea.selectByVisibleText(details.therapeuticArea);
        await this.selectInterestedIn.selectByVisibleText(details.interestedIn);
        // await this.btnSubmit.click();
    }

    public async isContactUsPageLoaded() {
            await CookieBannerPage.handleCookieBanner(); 
            await this.pageSectionHeader.waitForDisplayed();
            return await browser.waitUntil(textToBePresentInElement('h1', 'Get in contact'), {
                timeout: 5000,
                timeoutMsg: 'Expected text to be present in element'
            });
        }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('contact-us');
    }
}

export default new ContactUsPage();
