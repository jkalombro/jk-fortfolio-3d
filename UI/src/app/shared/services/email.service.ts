import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import type { ContactForm } from '../models';

@Injectable({ providedIn: 'root' })
export class EmailService {
  send(params: ContactForm): Observable<EmailJSResponseStatus> {
    return from(
      emailjs.send(
        environment.emailjsServiceId,
        environment.emailjsTemplateId,
        { ...params },
        environment.emailjsPublicKey,
      ),
    );
  }
}
