import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    console.error('Custom Error Handler: ', error);
  }
}
