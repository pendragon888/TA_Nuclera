import { test as setup} from '@fixtures/pages.fixture'

setup.describe('Setting up UI storage state files', async () => {
  setup("Login as Admin", async ({ page, loginPage }) => {
    const authFile = ('playwright/.auth/adminAuth.json');
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!)
    await page.waitForURL(process.env.BASE_URL!+'/projects');
    await page.context().storageState({ path: authFile });
  });

  setup("Login as NonAdmin", async ({ page, loginPage }) => {
    const userFile = "playwright/.auth/userAuth.json";
    await loginPage.login(process.env.NONADMIN_USERNAME!, process.env.NONADMIN_PASSWORD!)
    await page.waitForURL(process.env.BASE_URL!+'/projects');
    await page.context().storageState({ path: userFile });
  });
})