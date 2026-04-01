import { type Locator, type Page } from "playwright";

export class UsersPage {
    readonly page: Page
    readonly pageTitle: Locator
    readonly newUserButton: Locator
    readonly userlist: Locator
    readonly userRow: Locator
    readonly userName: Locator
    readonly userRole: Locator
    readonly userDeleteButton: Locator
    readonly newUserModal: Locator
    readonly newUserModalUsernameInput: Locator
    readonly newUserModalPasswordInput: Locator
    readonly newUserModalRoleFilter: Locator
    readonly newUserModalCancelButton: Locator
    readonly newUserModalCreateButton: Locator
    readonly newUserModalError: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByTestId('page-title')
        this.newUserButton = page.getByTestId('new-user-button')

        // User table elements
        this.userlist = page.getByTestId('users-list')
        this.userRow = page.getByTestId('user-row')
        this.userName = page.getByTestId('user-username')
        this.userRole = page.getByTestId('user-role')
        this.userDeleteButton = page.getByTestId('user-delete')

        // New User Modal elements
        this.newUserModal = page.getByTestId('user-modal')
        this.newUserModalUsernameInput = page.getByTestId('user-modal-username')
        this.newUserModalPasswordInput = page.getByTestId('user-modal-password')
        this.newUserModalRoleFilter = page.getByTestId('user-modal-role')
        this.newUserModalCancelButton = page.getByTestId('user-modal-cancel')
        this.newUserModalCreateButton = page.getByTestId('user-modal-submit')
        this.newUserModalError = page.getByTestId('user-modal-error')
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL+'/users')
    }

    async createNewAdminUser(newAdminUser:string){
        await this.newUserModalUsernameInput.fill(newAdminUser)
        await this.newUserModalPasswordInput.fill('abc123')
        await this.newUserModalRoleFilter.selectOption('admin')
        await this.newUserModalCreateButton.click()
    }

    async createNewUser(newUser:string){
        await this.newUserModalUsernameInput.fill(newUser)
        await this.newUserModalPasswordInput.fill('abc123')
        await this.newUserModalRoleFilter.selectOption('Regular')
        await this.newUserModalCreateButton.click()
    }
}