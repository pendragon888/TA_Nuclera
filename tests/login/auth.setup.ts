import { test as setup} from '@fixtures/pages.fixture'
import path from 'path'

setup.describe('Setting up UI storage state files', async () => {
  setup("Login as Admin", async ({ page, loginPage }) => {
    const authFile = path.join(__dirname, '../../playwright/.auth/adminAuth.json');
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!)
    await page.waitForURL(process.env.BASE_URL!+'/projects');
    await page.context().storageState({ path: authFile });
  });

  setup("Login as NonAdmin", async ({ page, loginPage }) => {
    const userFile = path.join(__dirname, '../../playwright/.auth/userAuth.json');
    await loginPage.login(process.env.NONADMIN_USERNAME!, process.env.NONADMIN_PASSWORD!)
    await page.waitForURL(process.env.BASE_URL!+'/projects');
    await page.context().storageState({ path: userFile });
  });
})