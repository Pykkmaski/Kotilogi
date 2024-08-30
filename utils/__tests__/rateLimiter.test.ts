/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { rateLimiter } from '../rateLimiter';

describe('Testing the rate limiter.', () => {
  const testIp = 'test_ip';

  const req = new NextRequest('http://localhost:3000', {
    headers: {
      'X-Forwarded-For': testIp,
    },
  });

  (rateLimiter as any).m_ipMap.set(testIp, {
    count: 0,
    lastReset: Date.now(),
  });

  it('Returns a 429-response when exceeding the limit of requests within the cooldown time.', async () => {
    (rateLimiter as any).m_ipMap.get(testIp).count = 10;
    const res = await rateLimiter.limit(req);
    expect(res.status).toBe(429);
  });

  it('Returns a 200-response when a request is allowed.', async () => {
    (rateLimiter as any).m_ipMap.get(testIp).count = 0;
    const res = await rateLimiter.limit(req);
    expect(res.status).toBe(200);
  });

  it('Resets the count when making a request after the cooldown period has elapsed.', async () => {
    const ipData = (rateLimiter as any).m_ipMap.get(testIp);
    ipData.count = 10;
    ipData.lastReset = Date.now();
    let res = await rateLimiter.limit(req);
    expect(res.status).toBe(429);

    ipData.lastReset = 100;
    res = await rateLimiter.limit(req);
    expect(res.status).toBe(200);
  });
});
