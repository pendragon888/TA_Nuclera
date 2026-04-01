import { test, expect,  } from "@fixtures/pages.fixture";
import fs from 'fs'
import path from 'path'

test.describe('API testing', async () => {
    test.describe.configure({ retries:1 })
    test('GET /users', async ({ request }) => {
        const authAPIFile = path.resolve('playwright/.auth/adminAPIAuth.json');
        const usersResponseFile = "playwright/.auth/usersData.json";
        const { token } = JSON.parse(fs.readFileSync(authAPIFile, 'utf-8'));
        const response = await request.get(process.env.API_BASE_URL! +'/users', {
            headers: {
                Authorization: `Bearer ${ token }`
            },
        })

        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body).toBeTruthy()

        // Save response to JSON file
        fs.writeFileSync(usersResponseFile, JSON.stringify({ body }, null, 2));
    })
})