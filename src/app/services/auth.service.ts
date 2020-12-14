import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

import { LoggedUser } from '../models/loggedUser.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<LoggedUser>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    // code available only for test reasons (retrieve user from internal data)
    return this.http.get('api/logged-in-user').pipe(map(
      (data: any) => {
        if (email == data.email && password == data.password) {
          this.handleAuthentication(
            data.email,
            data.username,
            data.token,
            3000
          );
          return true;
        } else {
          return false;
        }
      }
    ));

    // Below is an appropriate call for authentication as if we had an API(ex. firebase)

    // return this.http
    //   .post<AuthResponseData>(
    //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDb0xTaRAoxyCgvaDF3kk5VYOsTwB_3o7Y',
    //     {
    //       email: email,
    //       password: password,
    //       returnSecureToken: true
    //     }
    //   )
    //   .pipe(
    //     catchError(this.handleError),
    //     tap(resData => {
    //       this.handleAuthentication(
    //         resData.email,
    //         resData.localId,
    //         resData.idToken,
    //         +resData.expiresIn
    //       );
    //     })
    //   );

  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new LoggedUser(email, userId, token, expirationDate);
    this.user.next(user);
  }

}
