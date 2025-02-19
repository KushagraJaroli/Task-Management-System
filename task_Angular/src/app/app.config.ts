import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http'; //  Add HttpClient
import { appRoutes } from './app.routes';
import { demoMaterialProviders } from './DemoAngularMaterialModule'; //  Import Material providers

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),  // Ensure HTTP client is provided
    demoMaterialProviders  //  Use Material providers
  ]
};
