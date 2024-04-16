import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const authToken = authService.userToken.value;

  // Si no existe un auth token guardado, devuelvo la request normal
  if (!authToken) return next(req);

  let decodedToken = jwtDecode(authToken);
  // Compruebo si el tiempo de expiracion del token es menor al actual
  const isTokenExpired =
    decodedToken && decodedToken.exp
      ? decodedToken.exp < Date.now() / 1000
      : false

  //ha expirado el token hago un logout para borrar el token guardado y redirigir al login
  if (isTokenExpired) {
    authService.logout()
    return next(req);
  };

  // Devuelvo la respuesta clonada con el token
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};
