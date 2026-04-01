import { type Locator, type Page } from "playwright";

export class ProjectsPage {
    readonly page: Page
    readonly pageHeading: Locator
    readonly pageTitle: Locator
    readonly newProjectButton: Locator
    readonly searchProjectInput: Locator
    readonly statusFilter: Locator
    readonly logoutButton: Locator

    // Projects section
    readonly sortName: Locator
    readonly sortItemCount: Locator
    readonly sortCreated: Locator
    readonly projectsList: Locator
    readonly projectRow: Locator
    readonly projectName: Locator
    readonly projectStatus: Locator
    readonly projectItemCount: Locator
    readonly projectEmptyFiltered: Locator

    // New Project modal
    readonly newProjectModalHeading: Locator
    readonly newProjectModalNameInput: Locator
    readonly newProjectModalDescriptionInput: Locator
    readonly newProjectModalStatusSelect: Locator
    readonly newProjectModalCreateButton: Locator
    readonly newProjectModalCancelButton: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByTestId('page-title')
        this.pageHeading = page.getByRole('heading')
        this.newProjectButton = page.getByTestId('new-project-button')
        this.searchProjectInput = page.getByTestId('search-input')
        this.statusFilter = page.getByTestId('status-filter')
        this.logoutButton = page.getByTestId('logout-button')

        // Projects Section elements
        this.sortName = page.getByTestId('sort-name')
        this.sortItemCount = page.getByTestId('sort--item-count')
        this.sortCreated = page.getByTestId('sort-created')
        this.projectsList = page.getByTestId('projects-list')
        this.projectRow = page.getByTestId('project-row')
        this.projectName = page.getByTestId('project-name')
        this.projectStatus = page.getByTestId('project-status')
        this.projectItemCount = page.getByTestId('project-item-count')
        this.projectEmptyFiltered = page.getByTestId('projects-empty-filtered')

        // New Project modal elements
        this.newProjectModalHeading = page.getByTestId('project-modal')
        this.newProjectModalNameInput = page.getByTestId('project-modal-name')
        this.newProjectModalDescriptionInput = page.getByTestId('project-modal-description')
        this.newProjectModalStatusSelect = page.getByTestId('project-modal-status')
        this.newProjectModalCreateButton = page.getByTestId('project-modal-submit')
        this.newProjectModalCancelButton = page.getByTestId('project-modal-cancel')
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL+'/projects')
    }

    async createNewProject(newProjectName:string, newProjectDescription:string, newProjectStatus:string){
        await this.newProjectModalNameInput.fill(newProjectName)
        await this.newProjectModalDescriptionInput.click()
        await this.newProjectModalDescriptionInput.fill(newProjectDescription)
        await this.newProjectModalStatusSelect.selectOption(newProjectStatus)
        await this.newProjectModalCreateButton.click()
    }
}