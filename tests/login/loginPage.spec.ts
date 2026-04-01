import { test, expect } from '@fixtures/pages.fixture'

test.describe("Login via UI with admin account", ()=>{
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
        await expect(loginPage.usernameInput).toBeVisible()
    })

    test('Validate Login page present, ', async ({ loginPage }) => {
        await expect(loginPage.title).toBeVisible()
        await expect(loginPage.title).toHaveText('ProjectHub')
    })

    test("Login with Admin account and validate access", async ({ page, loginPage, navigationPage, projectsPage, usersPage, sychronisePage }) => {

        loginPage.login(process.env.ADMIN_USERNAME!,process.env.ADMIN_PASSWORD!)
        await expect(projectsPage.pageHeading).toBeVisible()

        await expect(page.getByText(process.env.ADMIN_USERNAME!)).toBeVisible();
        await expect(page.locator('span')).toContainText(process.env.ADMIN_USERNAME!);
        await expect(page.url()).toContain('/projects')

        await expect(navigationPage.navToUsers).toBeVisible()
        await navigationPage.navToUsers.click()
        await expect(usersPage.userlist).toBeVisible()

        await expect(navigationPage.navToSynchronise).toBeVisible()
        await navigationPage.navToSynchronise.click()
        await expect(sychronisePage.pageDescription).toBeVisible()
    });
})

test.describe('Login via UI with non-admin account', ()=> {
    test.beforeEach(async ({ loginPage }) => {
         await loginPage.goto()
         await expect(loginPage.usernameInput).toBeVisible()
    })

    test('Login with Non-Admin account, validate access and logout', async ({ page, loginPage, navigationPage, projectsPage }) => {
        loginPage.login(process.env.NONADMIN_USERNAME!,process.env.NONADMIN_PASSWORD!)
        await expect(page.getByText(process.env.NONADMIN_USERNAME!)).toBeVisible();
        await expect(page.locator('span')).toContainText(process.env.NONADMIN_USERNAME!);
        await expect(page.url()).toContain('/projects')
        await expect(navigationPage.navToUsers).not.toBeVisible()
        await projectsPage.logoutButton.click()
        await expect(loginPage.title).toHaveText('ProjectHub')
    });
})