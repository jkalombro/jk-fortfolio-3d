import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';
import { ContactExperienceComponent } from './contact-experience/contact-experience.component';
import { submitForm, resetContactForm } from '../../store/actions/contact.actions';
import {
  selectContactLoading,
  selectContactSuccess,
  selectContactError,
} from '../../store/reducers/contact.reducer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TitleHeaderComponent, ContactExperienceComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    message: ['', Validators.required],
  });

  readonly emailTouched = signal(false);

  private readonly emailValue = toSignal(this.contactForm.get('email')!.valueChanges, {
    initialValue: '',
  });

  readonly emailError = computed(() => {
    if (!this.emailTouched()) return null;
    this.emailValue(); // track value changes to recompute on input
    const ctrl = this.contactForm.get('email')!;
    if (ctrl.hasError('required')) return 'Email is required.';
    if (ctrl.hasError('pattern')) return 'Please enter a valid email address.';
    return null;
  });

  readonly loading = toSignal(this.store.select(selectContactLoading), { initialValue: false });
  readonly success = toSignal(this.store.select(selectContactSuccess), { initialValue: false });
  readonly error = toSignal(this.store.select(selectContactError), { initialValue: null });

  onSubmit(): void {
    this.emailTouched.set(true);
    if (this.contactForm.invalid) return;
    this.store.dispatch(submitForm({ params: this.contactForm.value }));
  }

  reset(): void {
    this.contactForm.reset();
    this.emailTouched.set(false);
    this.store.dispatch(resetContactForm());
  }
}
