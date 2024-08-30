import { NextRequest, NextResponse } from 'next/server';

type IpData = {
  count: number;
  lastReset: number;
};

class RateLimiter {
  /**The number of requests a single ip address is allowed to make within the cooldown time. */
  private m_limit: number;

  /**The time until an ip-addresses request count is reset. */
  private m_cooldownTime: number;

  private m_ipMap: Map<string, IpData> = new Map();

  constructor(limit: number, cooldownTime: number) {
    this.m_limit = limit;
    this.m_cooldownTime = cooldownTime;
  }

  async limit(req: NextRequest) {
    const ip = req.headers.get('X-Forwarded-For');
    const ipData = this.m_ipMap.get(ip);

    if (ipData) {
      if (Date.now() - ipData.lastReset > this.m_cooldownTime) {
        ipData.count = 0;
        ipData.lastReset = Date.now();
      }

      if (ipData.count >= this.m_limit) {
        return new NextResponse('Too many requests.', {
          status: 429,
          headers: {
            'Retry-After': (this.m_cooldownTime / 1000).toString(),
          },
        });
      }

      ipData.count++;
    } else {
      this.m_ipMap.set(ip, {
        count: 1,
        lastReset: Date.now(),
      });
    }

    return new NextResponse(null, {
      status: 200,
    });
  }
}

export const rateLimiter = new RateLimiter(10, 1000 * 60 * 5);
