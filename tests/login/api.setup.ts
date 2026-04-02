import { test as setup, expect} from '@fixtures/pages.fixture'
import fs from 'fs'
import path from 'path'

setup.describe('Setting up API files', async () => {
    setup("Initialise storage", async () => {
    const authAPIFile = path.join(__dirname, '../../playwright/.auth/adminAPIAuth.json');
    // create file
    fs.writeFileSync(authAPIFile, JSON.stringify('initiating file storage'), null);
    })
    
    setup("Login via API", async ({ request }) => {
    const authAPIFile = path.join(__dirname, '../../playwright/.auth/adminAPIAuth.json');
    const response = await request.post(process.env.API_BASE_URL! +'/auth/login', {
        data: {
        username: process.env.ADMIN_USERNAME!,
        password: process.env.ADMIN_PASSWORD!,
        },
    })

    expect(response.status()).toBe(200)

    const body = await response.json()
    const token = body.token
    expect(body.token).toBeTruthy()

    // Save token to JSON file
    fs.writeFileSync(authAPIFile, JSON.stringify({ token }, null, 2));
    })
})