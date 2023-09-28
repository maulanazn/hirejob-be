const server = require('./../src/index')
const supertest = require('supertest')
const requestWithSupertest = supertest(server);

describe('Social media route', () => {
    it('Get all social media', async () => {
        const res = await requestWithSupertest.get('/')
        expect(res.status).toEqual(200)
    })
})