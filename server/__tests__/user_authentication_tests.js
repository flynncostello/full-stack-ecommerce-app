const request = require('supertest');
const app = require('../app');  // Import your Express app

describe('User Authentication', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.headers).toHaveProperty('set-cookie');  // Check if a session cookie was set
  });

  it('should log out an existing user', async () => {
    const agent = request.agent(app);  // Create a new agent to maintain the session

    // First log in
    await agent
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    // Then log out
    const res = await agent.get('/api/logout');
    expect(res.statusCode).toEqual(200);
    expect(res.headers).not.toHaveProperty('set-cookie');  // Check if the session cookie was cleared
  });
});