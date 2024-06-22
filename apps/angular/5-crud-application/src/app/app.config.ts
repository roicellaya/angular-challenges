import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    {
      provide: ErrorHandler,
      useExisting: CustomErrorHandlerService,
    },
  ],
};
