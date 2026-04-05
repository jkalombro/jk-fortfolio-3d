import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { contactReducer } from './store/reducers/contact.reducer';
import { ContactEffects } from './store/effects/contact.effects';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
    providers: [
      provideState('contact', contactReducer),
      provideEffects([ContactEffects]),
    ],
  },
];
