import { type Locator, type Page} from "playwright";

export class LoginPage {
    readonly page: Page
    readonly title: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly signInButton: Locator
    readonly loginError:Locator

    constructor(page:Page) {
        this.page = page
        this.title = page.getByText('ProjectHub')
        this.usernameInput = page.getByTestId('login-username')
        this.passwordInput = page.getByTestId('login-password')
        this.signInButton = page.getByTestId('login-submit')
        this.loginError = page.getByTestId('login-error')
    }

    async goto(){
        await this.page.goto(process.env.BASE_URL+'/login')
    }

    async login(username: string, password: string) {
        this.goto()
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}