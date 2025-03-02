import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";


export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withHashLocation(),
     withViewTransitions(),
     withInMemoryScrolling({scrollPositionRestoration:'top'})),
     provideClientHydration(withEventReplay()),
     provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor])),
     provideToastr(),
     importProvidersFrom(NgxSpinnerModule)
    ]
};
