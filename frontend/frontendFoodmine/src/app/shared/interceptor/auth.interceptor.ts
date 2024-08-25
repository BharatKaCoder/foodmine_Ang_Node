import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError, throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
//   const _userService = inject(UserService);
//   const user = _userService.currentUser();
//   const authToken = user?.token || '';

//   // List of endpoints to exclude from token
//   const excludedUrls = [
//     'http://localhost:8080/api/foods',
//     'http://localhost:8080/api/foods/tags' // Add more URLs as needed
//   ];

//   // Check if the request URL is in the excluded list
//   const shouldAddToken = !excludedUrls.some(url => request.url.startsWith(url));

//   if (authToken) {
//     request = request.clone({
//       setHeaders: {
//         access_token: authToken
//       }
//     });
//   }

//   return next(request);
// };

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const _userService = inject(UserService);
  const user = _userService.currentUser();
  const authToken = user?.token || '';

  // List of endpoints to exclude from token
  const excludedUrls = [
    'http://localhost:8080/api/foods',
    'http://localhost:8080/api/foods/tags' // Add more URLs as needed
  ];

  // Check if the request URL is in the excluded list
  const shouldAddToken = !excludedUrls.some(url => request.url.startsWith(url));

  // Add the token if it's not in the excluded list
  console.log('Auth Token:', authToken);
  if (shouldAddToken && authToken) {
    request = request.clone({
      setHeaders: {
        access_token: authToken
      }
    });
  }
  console.log('request.url',request.url)
  // Pass the modified request to the next handler
  return next(request);
}