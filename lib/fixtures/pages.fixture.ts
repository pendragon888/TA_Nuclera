import { LoginPage} from "@pages/login/login.page"
import { NavigationPage } from "@pages/navigation/navigation.page";
import { ProjectsPage } from "@pages/projects/projects.page";
import { ProjectDetailsPage } from "@pages/projects/projectDetails.page";
import { UsersPage } from "@pages/users/users.page";
import { SynchronisePage } from "@pages/synchronise/synchronise.page";
import { test as baseTest } from "@playwright/test";

type MyPages = {
  loginPage: LoginPage;
  navigationPage: NavigationPage;
  projectsPage: ProjectsPage;
  projectDetailsPage: ProjectDetailsPage;
  usersPage: UsersPage;
  sychronisePage: SynchronisePage;
};

export const test = baseTest.extend<MyPages>({
    loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
    navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
    projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
    projectDetailsPage: async ({ page }, use) => {
    await use(new ProjectDetailsPage(page));
  },
    usersPage: async ({ page }, use) => {
    await use(new UsersPage(page));
  },
    sychronisePage: async ({ page }, use) => {
    await use(new SynchronisePage(page));
  }
});

export { expect } from "@playwright/test";