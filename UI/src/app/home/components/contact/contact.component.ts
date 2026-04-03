import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';
import { ContactExperienceComponent } from './contact-experience/contact-experience.component';
import { submitForm, resetContactForm } from './store/actions/contact.actions';
import {
  selectContactLoading,
  selectContactSuccess,
  selectContactError,
} from './store/reducers/contact.reducer';
import type { ContactForm } from '../../../shared/models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TitleHeaderComponent, ContactExperienceComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly form = signal<ContactForm>({ name: '', email: '', message: '' });

  readonly loading = toSignal(this.store.select(selectContactLoading), { initialValue: false });
  readonly success = toSignal(this.store.select(selectContactSuccess), { initialValue: false });
  readonly error = toSignal(this.store.select(selectContactError), { initialValue: null });

  constructor(private readonly store: Store) {}

  updateField(field: keyof ContactForm, value: string): void {
    this.form.update((f) => ({ ...f, [field]: value }));
  }

  onSubmit(): void {
    this.store.dispatch(submitForm({ params: this.form() }));
  }

  reset(): void {
    this.form.set({ name: '', email: '', message: '' });
    this.store.dispatch(resetContactForm());
  }
}
