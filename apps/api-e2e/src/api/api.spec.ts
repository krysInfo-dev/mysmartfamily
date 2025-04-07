import axios from 'axios';

describe('GET /api/datas/test/all', () => {
  it('should return a status ok', async () => {
    const res = await axios.get(`/api/datas/test/all`);
    expect(res.status).toBe(200);
  });
});
