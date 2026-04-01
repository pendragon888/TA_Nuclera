import { type Locator, type Page } from "playwright";

export class SynchronisePage {
    readonly page: Page
    readonly pageHeading: Locator
    readonly pageDescription: Locator
    readonly lastSyncStatus: Locator
    readonly startSyncButton: Locator
    readonly syncSuccess: Locator
    readonly syncError: Locator

    constructor(page: Page) {
        this.page = page
        this.pageHeading = page.getByTestId('sync-heading')
        this.pageDescription = page.locator('#root')
        this.lastSyncStatus = page.getByTestId('sync-last-synced')
        this.startSyncButton = page.getByTestId('sync-button')
        this.syncSuccess = page.getByTestId('sync-success')
        this.syncError = page.getByTestId('sync-error')
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL+'/sync')
    }
}