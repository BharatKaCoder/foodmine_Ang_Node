import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommanService } from '../../services/comman.service'; // Adjust the import path as necessary
import { tap } from 'rxjs/operators';

let pendingReq = 0; // Track the number of pending requests

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loadingService = inject(CommanService); // Inject your loading service
  loadingService.showLoader(); // Show the loader
  pendingReq++; // Increment the pending request count

  return next(req).pipe(
    tap({
      next: (event) => {
        // Check if the event is a response
        if (event.type === HttpEventType.Response) {
          handleHideLoading(loadingService); // Hide the loader when the response is received
        }
      },
      error: () => {
        // Handle error case
        handleHideLoading(loadingService); // Hide the loader on error as well
      }
    })
  );
};

// Function to handle hiding the loading indicator
function handleHideLoading(loadingService: CommanService) {
  pendingReq--; // Decrement the pending request count
  if (pendingReq === 0) {
    // const loadingService = inject(CommanService); // Inject again to hide the loader
    loadingService.hideLoader(); // Hide the loader only if no pending requests
  }
}