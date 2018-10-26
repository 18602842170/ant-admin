import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL, TOKEN_NAME, LOGIN_URL } from './const';
import { UsersService, IUsers } from './users/users.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { auth } from './auth-decorator';
import { HttpHeaders } from '@angular/common/http';
import { ResourceParams, Resource, ResourceAction, ResourceMethod } from './ngx-resource';
import { GetUserBySessionIdService } from './users/getUserBySession.service';

@Injectable()
export class LoginService {
  user: IUsers;
  constructor(private http: Http,
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private getUserBySessionIdService: GetUserBySessionIdService
  ) { }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  login(username, password): Observable<string> {
    return this.http.post(`${BASE_URL}${LOGIN_URL}/ajaxLogin/`, {
      'name': username,
      'password': password
    })
      .map((response) => {
        switch (response.json()['msg']) {
          case 'success':
            const token = response.json()['token'];
            localStorage.setItem(TOKEN_NAME, token);
            this.user = response.json()['user'];
            this.authService.isLoggedIn = true;
            this.router.navigate([this.authService.redirectUrl]);
            return 'success';
          case 'nameError':
            return 'nameError';
          case 'passwordError':
            return 'passwordError';
          case 'userDelete':
            return 'userDelete';
          default:
            return 'networkError';
        }
      })
      .catch(error => {
        this.handleError(error);
        return Observable.of('networkError');
      });
  }

  register(username, password): Observable<IUsers> {
    return this.http.post(`${BASE_URL}${LOGIN_URL}/register/`, {
      name: username, password: password
    })
      .map((response) => response.json());
  }

  getRepeatName(username): Observable<number> {
    return this.http.post(`${BASE_URL}${LOGIN_URL}/getRepeatUserName/`, {
      name: username
    })
      .map((response) => response.json());
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  logout(): Observable<string> {
    localStorage.clear();
    this.user = null;
    return Observable.of('success');
  }

  getUser(): Observable<IUsers> {
    if (this.user) {
      return Observable.of(this.user);
    }
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      return this.verify(token)
        .map(msg => {
          if (msg === 'success') {
            this.authService.isLoggedIn = true;
            return this.user;
          } else {
            throw new Error(msg);
          }
        });
    }
  }

  verify(token): Observable<string> {
    return this.getUserBySessionIdService.getUserBySessionId({
      id: token
    }).$observable
      .map((user) => {
        if (user.id) {
          this.user = user;
          return 'success';
        } else {
          return 'Login expired';
        }
      })
      .catch(error => {
        if (error) {
          return Observable.of('Login expired');
        }
      });
  }
}


