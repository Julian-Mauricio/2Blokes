import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  
  const authRequiredUrls = [
    'https://prueba.citofoniadosblokes.org/auth/profile',
    'https://prueba.citofoniadosblokes.org/users',
  ];

  const isAuthRequired = authRequiredUrls.some(url => req.url.startsWith(url));

  if (isAuthRequired) {
    if (token) {
  
      const cloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(cloneRequest);
    } 
  }


  return next(req);
};
