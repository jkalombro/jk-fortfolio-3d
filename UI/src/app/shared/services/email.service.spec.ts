import { TestBed } from '@angular/core/testing';
import { EmailService } from './email.service';
import emailjs from '@emailjs/browser';
import type { ContactForm } from '../models';

jest.mock('@emailjs/browser', () => ({
  default: {
    send: jest.fn(),
  },
}));

const mockEmailjs = emailjs as jest.Mocked<typeof emailjs>;

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailService);
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call emailjs.send with correct params and return Observable', (done) => {
    const mockResponse = { status: 200, text: 'OK' };
    (mockEmailjs.send as jest.Mock).mockResolvedValueOnce(mockResponse);

    const params: ContactForm = { name: 'Jk', email: 'jk@example.com', message: 'Hello' };

    service.send(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(mockEmailjs.send).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should pass name, email and message to emailjs.send', (done) => {
    (mockEmailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200, text: 'OK' });

    const params: ContactForm = { name: 'Test', email: 'test@test.com', message: 'Hi' };

    service.send(params).subscribe(() => {
      const callArgs = (mockEmailjs.send as jest.Mock).mock.calls[0];
      expect(callArgs[2]).toMatchObject({ name: 'Test', email: 'test@test.com', message: 'Hi' });
      done();
    });
  });

  it('should propagate rejection as Observable error', (done) => {
    (mockEmailjs.send as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    service.send({ name: 'A', email: 'a@a.com', message: 'msg' }).subscribe({
      error: (err: Error) => {
        expect(err.message).toBe('Network error');
        done();
      },
    });
  });
});
