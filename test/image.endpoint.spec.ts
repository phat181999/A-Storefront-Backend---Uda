const app = require('../src/server.ts')
const request = require('supertest')(app)

describe('GET /api/images/:width/:height/', () => {
  it('should return 200 OK', done => {
    request
      .get(
        '/api/images/500/500/?url=https://upload.wikimedia.org/wikipedia/vi/a/a7/Nodejs_logo_light.png',
      ) // Provide actual values for width and height
      .expect(200)
      .end((err: any, res: any) => {
        if (err) throw err
        expect(res.status).toBe(200)
        done()
      })
  })
})
