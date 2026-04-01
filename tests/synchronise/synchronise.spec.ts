import { test, expect } from '@fixtures/pages.fixture'

test.describe("Sync using admin", ()=>{
    test.describe.configure({ retries: 2 });
    test.use({ storageState: 'playwright/.auth/adminAuth.json'})
    test.beforeEach(async ({ page, sychronisePage }) => {
        await sychronisePage.goto()
        await expect(page).toHaveURL('/sync');
        await expect(sychronisePage.pageHeading).toBeVisible()
    })

    test('Confirm Sync page', async ({ sychronisePage }) => {
        const description = 'Sync your ProjectHub data with the backup service to ensure your projects are safe and up to date.'

        await expect(sychronisePage.pageDescription).toContainText(description)
        await expect(sychronisePage.lastSyncStatus).toBeVisible()
    })

    test("Start sync as Admin", async ({ page, sychronisePage }) => {
        await expect(sychronisePage.startSyncButton).toBeEnabled()
        await sychronisePage.startSyncButton.click()
        await expect(sychronisePage.startSyncButton).toContainText('Syncing...')

        // Need to wait for sync to complete
        await expect(sychronisePage.syncSuccess.or(sychronisePage.syncError).nth(0)).toBeVisible({timeout:30000})
    });
})

test.describe('Sync as non-admin', ()=> {
    test.describe.configure({ retries: 2 });
    test.use({ storageState: 'playwright/.auth/userAuth.json'})
    test.beforeEach(async ({ page, sychronisePage }) => {
        await sychronisePage.goto()
        await expect(page).toHaveURL('/sync');
        await expect(sychronisePage.pageHeading).toBeVisible()
    })

    test('Start sync as Non-admin', async ({page, sychronisePage })=> {
        await expect(sychronisePage.startSyncButton).toBeVisible()
        await sychronisePage.startSyncButton.click()
        await expect(sychronisePage.startSyncButton).toContainText('Syncing...')

        // Need to wait for sync to complete
        await expect(sychronisePage.syncSuccess.or(sychronisePage.syncError).nth(0)).toBeVisible({timeout:30000})
    })
})