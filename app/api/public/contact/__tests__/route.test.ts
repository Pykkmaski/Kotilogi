/**
 * @jest-environment node
 */
import { sendContactMessage } from 'kotilogi-app/app/api/_lib/sendContactMessage';
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../route';

jest.mock('@/app/api/_lib/sendContactMessage');

describe('Testing the send-contact-message api-route.', () => {
  describe('Testing a successful request.', () => {
    let res: NextResponse;
    const testData = {
      email: 'test@email.com',
      message: 'test message',
    };

    beforeAll(async () => {
      const req = new NextRequest('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify(testData),
      });
      res = await POST(req);
    });

    it('Responds with status 200.', () => {
      expect(res.status).toBe(200);
    });

    it('Calls the sendContactMessage-method with the correct data.', () => {
      expect(sendContactMessage).toHaveBeenCalledWith(testData);
    });
  });
});
