import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock') && args[0].includes('deprecated')) return;
  originalWarn.apply(console, args);
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
