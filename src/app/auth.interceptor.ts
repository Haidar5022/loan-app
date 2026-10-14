import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('accessToken');
  const tokenType = sessionStorage.getItem('tokenType') || 'Bearer';

  
  if (req.url.includes('/auth/signin')) {
    return next(req);
  }

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `${tokenType} ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};