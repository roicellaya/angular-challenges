import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { CustomErrorHandlerService } from './services/custom-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: ErrorHandler,
      useExisting: CustomErrorHandlerService,
    },
  ],
};
