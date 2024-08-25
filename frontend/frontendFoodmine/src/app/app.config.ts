import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { loadingInterceptor } from './shared/interceptor/loading.interceptor';
import { authInterceptor } from './shared/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()), 
    provideToastr(),
    provideAnimations(),
    BrowserAnimationsModule, 
    ToastrModule, 
    provideHttpClient(withInterceptors([loadingInterceptor])),
    // provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
