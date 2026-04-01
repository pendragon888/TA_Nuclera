import { test, expect } from '@fixtures/pages.fixture'
import fs from 'fs'
import path from 'path'
import {generateNewUser, generatePassword } from '@helpers/randomUtils'

test.describe('Using an Admin', ()=> {
    test.use({ storageState: 'playwright/.auth/adminAuth.json'})
    test.beforeEach(async ({ usersPage }) => {
        await usersPage.goto()
    })

    test('Create a new admin user via UI', async ({ usersPage }) => {
        const newUser = "Admin " + generateNewUser()

        await expect(usersPage.newUserButton).toBeVisible()
        await usersPage.newUserButton.click()

        // Create new user via UI
        await expect(usersPage.newUserModal).toBeVisible()
        await usersPage.createNewAdminUser(newUser)
    })

    test('Verify new user with existing name cannot be added', async ({ usersPage, request }) => {
        const newUser = "Regular "+ generateNewUser()
        const newPass = generatePassword()

        await expect(usersPage.newUserButton).toBeVisible()
        await usersPage.newUserButton.click()

        // Add an user via API
        const authAPIFile = path.resolve('playwright/.auth/adminAPIAuth.json');
        const { token } = JSON.parse(fs.readFileSync(authAPIFile, 'utf-8'));
        const responsePOST = await request.post(process.env.API_BASE_URL! +'/users', {
            headers: {
                 Authorization: `Bearer ${ token }`
            },
            data: {
                "username": `${ newUser }`,
                "password": `${ newPass }`,
                "role": "regular"
            }
        })

        const responsePOSTBody = await responsePOST.json();
        expect(responsePOSTBody).toBeTruthy()

        // Verify validation message is shown when trying to create new user with an existing username via UI
        await expect(usersPage.newUserModal).toBeVisible()
        await usersPage.createNewUser(newUser)
        await expect(usersPage.newUserModalError).toBeVisible()
        await expect(usersPage.newUserModalError).toContainText('Username already exists')
        await usersPage.newUserModalCancelButton.click()
    })
})