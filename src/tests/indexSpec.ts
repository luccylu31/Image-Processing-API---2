import request from 'supertest';
import app from '../index';

describe('GET /api', () => {
  it('1.responds with resized image when valid parameters are provided', async () => {
    const response = await request(app)
      .get('/api')
      .query({ filename: 'fjord.jpg', width: '400', height: '500' });

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('image/jpeg');
  });

  it('2.responds with 400 error when filename parameter is missing', async () => {
    const response = await request(app)
      .get('/api')
      .query({ width: '300', height: '300' });

    expect(response.status).toBe(400);
  });

  it('3.responds with 404 error when file name not exist', async () => {
    const response = await request(app)
      .get('/api')
      .query({ filename: 'not.jpg', width: '300', height: '300' });

    expect(response.status).toBe(404);
  });

  it('4.responds with 400 error when width or height parameter is missing', async () => {
    const response = await request(app)
      .get('/api')
      .query({ filename: 'encenadaport.jpg' });

    expect(response.status).toBe(400);
  });
  
  it('5.responds with resized image when valid parameters are provided', async () => {
    const response = await request(app)
      .get('/api')
      .query({ filename: 'fjord.jpg', width: '-400', height: '400' });

    expect(response.status).toBe(400);
  });
});
