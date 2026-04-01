import { type Locator, type Page } from "playwright";

export class NavigationPage {
    readonly page: Page
    readonly pageTitle: Locator
    readonly navToProjects: Locator
    readonly navToUsers: Locator
    readonly navToSynchronise: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByTestId('page-title')
        this.navToProjects = page.getByRole('link', { name: 'Projects' })
        this.navToUsers = page.getByRole('link', { name: 'Users' })
        this.navToSynchronise = page.getByRole('link', { name: 'Synchronise' })
        }

    async goto(){
        await this.page.goto(process.env.BASE_URL!)
    }
}