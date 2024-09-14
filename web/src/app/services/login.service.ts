import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/auth/login'

  constructor(private httpClient: HttpClient) {}

    login(email: string, password: string){
       const response = this.httpClient.post<LoginResponse>(this.apiUrl, {email, password}).pipe(
        tap(value => {
          sessionStorage.setItem("auth-token", value.token)
        }),
      )

      return response
    }
}
