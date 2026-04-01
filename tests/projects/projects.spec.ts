import { test, expect } from '@fixtures/pages.fixture'
import { generateNewProject, generateNewItem } from '@helpers/randomUtils'
import path from 'path'
import fs from 'fs'

test.describe("As an admin on Projects", () => {
    test.use({ storageState: 'playwright/.auth/adminAuth.json'})
    test.beforeEach(async ({ page, projectsPage }) => {
        await projectsPage.goto()
        await expect(page).toHaveURL('/projects');
        await expect(projectsPage.pageHeading).toBeVisible()
    })

    test('Validate admin access', async ({ projectsPage }) => {
        await expect(projectsPage.newProjectButton).toBeVisible()
    })

    test('Create new project, filter for it and add items', async ({ projectsPage, projectDetailsPage }) => {
        let newProjectDetails = [generateNewProject(), 'Test Description', 'archived']
        let newItemDetails = [generateNewItem(), 'Item Description', 'in-progress']

        await expect(projectsPage.newProjectButton).toBeVisible()
        await projectsPage.newProjectButton.click()

        await expect(projectsPage.newProjectModalHeading).toBeVisible()
        await expect(projectsPage.newProjectModalHeading).toContainText('New Project')
        await expect(projectsPage.newProjectModalDescriptionInput).toBeVisible()

        // Create new project
        projectsPage.createNewProject(newProjectDetails[0], newProjectDetails[1], newProjectDetails[2])

        // Search for new project
        await expect(projectsPage.searchProjectInput).toBeVisible()
        await projectsPage.searchProjectInput.fill(newProjectDetails[0])
        await expect(projectsPage.projectName).toHaveCount(1)
        await projectsPage.projectName.getByText(newProjectDetails[0]).click()

        // Add Items to project
        await projectDetailsPage.projectDetailAddItemButton.click()
        await expect(projectDetailsPage.projectDetailItemFormNameInput).toBeVisible()
        //projectDetailsPage.createNewItem(newItemDetails[0], newItemDetails[1], newItemDetails[2])
        await projectDetailsPage.projectDetailItemFormNameInput.fill(newItemDetails[0])
        await projectDetailsPage.projectDetailItemFormDescriptionInput.fill(newItemDetails[1])
        await projectDetailsPage.projectDetailItemFormStatusSelect.selectOption(newItemDetails[2])
        await projectDetailsPage.projectDetailItemFormSubmitButton.click()

        // Add and remove Project Members
        await projectDetailsPage.projectDetailMemberAddSelect.selectOption('user-001');
        await projectDetailsPage.projectDetailMemberAddButton.click();
        await expect(projectDetailsPage.projectDetailMemberUsername).toBeVisible();
        await expect(projectDetailsPage.projectDetailMemberRemoveButton).toBeVisible();
        await projectDetailsPage.projectDetailMemberRemoveButton.click();
    })

    test("Filter for project", async ({ projectsPage, request }) => {
        const authAPIFile = path.resolve('playwright/.auth/adminAPIAuth.json');
        const projectsResponseFile = "playwright/.auth/projectsData.json";
        const { token } = JSON.parse(fs.readFileSync(authAPIFile, 'utf-8'));
        const response = await request.get(process.env.API_BASE_URL! +'/projects', {
            headers: {
                Authorization: `Bearer ${ token }`
            },
        })

        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toBeTruthy()

        // Save response to JSON file
        fs.writeFileSync(projectsResponseFile, JSON.stringify({body}, null, 2))

        const firstProject = body[0].name
        await expect(projectsPage.searchProjectInput).toBeVisible()
        await projectsPage.searchProjectInput.fill(firstProject)
        await expect(projectsPage.projectName).toHaveCount(1)
        await expect(projectsPage.projectName).toContainText(firstProject)
    });
})

test.describe('As a non-admin on Projects', () => {
    test.use({ storageState: 'playwright/.auth/userAuth.json'})
    test.beforeEach(async ({ page, projectsPage }) => {
        await projectsPage.goto()
        await expect(page).toHaveURL('/projects');
        await expect(projectsPage.pageHeading).toBeVisible()
        await expect(projectsPage.newProjectButton).not.toBeVisible()
    })

    test('Filter for project', async ({ projectsPage }) => {
        const projectName = 'Beta'

        await expect(projectsPage.searchProjectInput).toBeVisible()
        await projectsPage.searchProjectInput.fill(projectName)
        await expect(projectsPage.projectName).toHaveCount(1)
    })

    test('Filter for status', async ({ projectsPage}) => {
        await expect(projectsPage.statusFilter).toBeVisible()
        await projectsPage.statusFilter.selectOption('archived')
        await expect(projectsPage.projectEmptyFiltered).toBeVisible()
        await expect(projectsPage.projectEmptyFiltered).toContainText('No projects match the selected filter.')
    })  
})