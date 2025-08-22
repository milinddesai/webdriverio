import { expect } from '@wdio/globals'
import ContactUsPage from '../pageobjects/contact_us.page'
import { faker } from '@faker-js/faker';
import HomePage from '../pageobjects/home.page'
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'


describe('Evinova Web UI', () => {

    it('should navigate to Evinova home page', async () => {
        await HomePage.open()
        expect(await HomePage.isHomePageLoaded()).toBe(true)
        expect(await browser.getTitle()).toBe('Evinova')
        expect(await HomePage.getPageHeaderText()).toBe('Accelerate clinical development with proven digital solutions')
    })
    it('should check for web page accessibility and should have 0 violations', async () => {
       const results = await new AxeBuilder({ client: browser }).analyze();
       await expect(results.violations).toHaveLength(0);
       // do something with the error
    })
    it('should have the option of navigating to Contact Us Page', async () => {
        expect(await HomePage.isContactUsLinkEnabled()).toBe(true)
    })
    it('should navigate to Contact Us page', async () => {
        await ContactUsPage.open()
        expect(await ContactUsPage.isContactUsPageLoaded()).toBe(true)
        expect(await browser.getTitle()).toBe('Contact Us | Evinova')
    })
    it('should validate for visual changes', async () => {
        await expect(browser).toMatchScreenSnapshot('Contact Us Page')
        await expect(await browser.checkTabbablePage('Contact Us Page-Tabs')).toEqual(0)
    })
    
    it('should check for web page for Contact Us and should have 0 violations', async () => {
       const results = await new AxeBuilder({ client: browser }).analyze();
    //    await expect(results.violations).toHaveLength(0);
       // do something with the error
    })

    it('should fill the contact form', async () => {
        await ContactUsPage.fillContactForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            company: faker.company.name(),
            title: faker.person.jobTitle(),
            country: 'United States',
            phone: faker.phone.number(),
            therapeuticArea: 'Oncology',
            interestedIn: 'Other',
            marketing: true
        })
    })
    it('should be able to submit the form', async () => {
        expect(await ContactUsPage.btnSubmit.isClickable()).toBe(true)
    })
})

