import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ProfileResponse {
  userName: string;
  role: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7225/api/Auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  getProfile(): Observable<ProfileResponse> {

    //commenting because now using intercetor to add token in header
    // const token = localStorage.getItem('token');

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`
    // });

    return this.http.get<ProfileResponse>(
      `${this.apiUrl}/profile`//,
      // {
      //   headers
      // }
    );
  }
}