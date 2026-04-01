import { type Locator, type Page } from "playwright";

export class ProjectDetailsPage {
    readonly page: Page
    readonly pageTitle: Locator
    readonly backToProjectsButton: Locator
    readonly projectDetailName: Locator
    readonly projectDetailStatus: Locator
    readonly projectDetailDescription: Locator

    // Items Section
    readonly projectDetailItemsCount: Locator
    readonly projectDetailAddItemButton: Locator
    readonly projectDetailItemList: Locator
    readonly projectDetailItemRow: Locator
    readonly projectDetailItemName: Locator
    readonly projectDetailItemStatus: Locator
    readonly projectDetailItemEditButton: Locator
    readonly projectDetailItemDeleteButton: Locator

    // Add Item/Edit Form
    readonly projectDetailItemForm: Locator
    readonly projectDetailItemFormNameInput: Locator
    readonly projectDetailItemFormDescriptionInput: Locator
    readonly projectDetailItemFormStatusSelect: Locator
    readonly projectDetailItemFormCancelButton: Locator
    readonly projectDetailItemFormSubmitButton: Locator

    // Members Section
    readonly projectDetailMemberSection: Locator
    readonly projectDetailMemberRow: Locator
    readonly projectDetailMemberUsername: Locator
    readonly projectDetailMemberRemoveButton: Locator
    readonly projectDetailMemberAddSelect: Locator
    readonly projectDetailMemberAddButton: Locator

    constructor(page: Page) {
        this.page = page
        this.pageTitle = page.getByTestId('page-title')
        this.backToProjectsButton = page.getByTestId('back-to-projects')
        this.projectDetailName = page.getByTestId('project-detail-name')
        this.projectDetailStatus = page.getByTestId('project-detail-status')
        this.projectDetailDescription = page.getByTestId('project-detail-description')

        // Items Section elements
        this.projectDetailItemsCount = page.getByTestId('project-detail-item-count')
        this.projectDetailAddItemButton = page.getByTestId('add-item-button')
        this.projectDetailItemList = page.getByTestId('items-list')
        this.projectDetailItemRow = page.getByTestId('item-row')
        this.projectDetailItemName = page.getByTestId('item-name')
        this.projectDetailItemStatus = page.getByTestId('item-status')
        this.projectDetailItemEditButton = page.getByTestId(' item-edit')
        this.projectDetailItemDeleteButton = page.getByTestId('item-delete')

        // Add Item/Edit Form elements
        this.projectDetailItemForm = page.getByTestId('item-form')
        this.projectDetailItemFormNameInput = page.getByTestId('item-form-name')
        this.projectDetailItemFormDescriptionInput = page.getByRole('textbox', { name: 'Description' })
        this.projectDetailItemFormStatusSelect = page.getByTestId('item-form-status')
        this.projectDetailItemFormCancelButton = page.getByTestId('item-form-cancel')
        this.projectDetailItemFormSubmitButton = page.getByTestId('item-form-submit')

        // Members Section elements
        this.projectDetailMemberSection = page.getByTestId(' members-section')
        this.projectDetailMemberRow = page.getByTestId('member-row')
        this.projectDetailMemberUsername = page.getByTestId('member-username')
        this.projectDetailMemberRemoveButton = page.getByTestId('member-remove')
        this.projectDetailMemberAddSelect = page.getByTestId('member-add-select')
        this.projectDetailMemberAddButton = page.getByTestId('member-add-button')
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL+'/projects')
    }

    async createNewItem(newProjectName:string, newProjectDescription:string, newProjectStatus:string){
        await this.projectDetailItemFormNameInput.fill(newProjectName)
        await this.projectDetailItemFormDescriptionInput.fill(newProjectDescription)
        await this.projectDetailItemFormStatusSelect.selectOption(newProjectStatus)
        await this.projectDetailItemFormSubmitButton.click()
    }
}