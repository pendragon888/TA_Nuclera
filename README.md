# Playwright Testing for Nuclera's Technical Assessment website

This Playwright automation test framework uses TypeScript to automate [Projecthub](https://projecthub-frontend-njvpdo63aq-nw.a.run.app/login)

## Setup Instructions

Clear steps on how to install dependencies and execute the tests.

1. Ensure the following are installed:
   - [Node.js](https://nodejs.org/) (v18 or higher)
   - [npm](https://www.npmjs.com/)
   - [Git](https://git-scm.com/)

2. Clone this [repository](https://github.com/pendragon888/TA_Nuclera) into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.

3. Install the node dependencies:

    ```bash
    npm install
    npm install dotenv
    ```
4. To install the playwright browsers:

    ```bash
    npx playwright install
    ```

5. To run all the tests in the directory:

    ```bash
    npx playwright test
    ```


    or to see tests in UI mode
    ```bash
    npx playwright test --ui
    ```

6. To run tests from a specific spec file:

    ```bash
    npx playwright test projects.spec.ts
    ```

## Prioritisation Logic

An explanation of why you chose specific features for automation over others.

| Application 	| Feature                                                                                                                                                                                                                                                                                                                                                                                                                     	|
|-------------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Login       	| Prioritising the login for this application was the highest.<br>This is due to enabling authorisation to the rest of the application as well as the elevated permissions that the Admin user has over the 'regular' user e.g. User creation, project creation<br>Additionally these tests help establish the necessary user tokens to speed up test executions (no need to re-authenticate), access the remaining REST APIs 	|
| Projects    	| The coverage here, ensures admin has the permissions to create a new project, add items to it and assign members.<br><br>As a regular user, I can access the project and add items and check they can't view the members section                                                                                                                                                                                            	|
| Users       	| Admin user only have access to this and can add and remove users.<br><br>As a regular user, this page is not visible. As part of a loginPage.spec.ts test checks for this.                                                                                                                                                                                                                                                  	|
| Synchronise 	| Admin and regular users were able to 'sync'. This resulted in a lower priority for automation testing.                                                                                                                                                                                                                                                                                                                      	|


Core areas for priority on testing would be login

## Object Oriented Design Choices
Detail your architectural decisions and how you applied object oriented principles to the framework.

I am using the Page Object Model (POM) design pattern to reduce code duplication when accessing elements of each web page. The Page Class defines the locators, constructors and functions associated to a single page. I have setup tests that run at the beginning which saves information such as access tokens, so that they can be reused.

The **auth.setup.ts** file is a dependency and runs before all tests, this contains logic to log the admin and non-admin user accounts through the UI, saving the authenticated browser state in a file (adminAuth.json & userAuth.json). Other tests can then re-use these states without needing to re-authentication leading to faster test execution. 


## Manual vs. Auto

Identify specific features you chose not to automate and explain why (e.g., low ROI, high fragility, or better suited for manual exploratory testing).

**Login screen**
Exploratory testing was quicker to perform negative testing such as entering an incorrect password, leaving a blank username field upon login submission, and going 'offline' when validating for error messages.

I did create a test to perform incorrect credentials, however the automation test was unable to detect the error text appearing.

![LoginTest]()

Creating a new user and using their details to login was also more effiecient to test, this could be automated but I deemed was lower priority and manual testing would suffice.


**Projects screen**
Due to time constraints, I would have liked to automated the deletion of single and bulk projects, but tested this feature manually.

Manual testing was easier to perform when accessing functions on a project in one browser instance, whilst in another browser that same project has been deleted.

**Users screen**
This was automated in terms of user creation. Manual testing was performed to validate that the new user can log into the application.

Non-functional testing was carried out (regular user trying to access this /user url), load testing of 100 users.

**Synchronise screen**
Manual testing was performed to validate the result of the sync.

Automation was a bit tricky to perform as the success/fail of the sync sometimes took over 30 seconds to complete which meant I had to extend the default timeout. I also tried looking at conditional testing to confirm either of sync outcomes but deemed this too fragile and low ROI to implement further.

**Non-functional testing**
Performing manual testing and using additional tools would be used to improve the quality of the application.

Performance & Load testing would be carried out on the APIs (bulk creation of projects/project items/users creation) to check behaviour under high volumes.

Playwright contains cross-browsers testing and mobile-view/responsive too. I would extend the compatibility testing of this with use of native devices or software (Appium/BrowserStack) as a low-priority requirement.


## Testing Framework Developed By

**Kevin D**

QA Automation Engineer

[LinkedIn](https://www.linkedin.com/in/kevin-dang-0b623ab5/)


[LoginTest]:(/images/)