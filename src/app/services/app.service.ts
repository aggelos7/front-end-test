import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { OAuthService } from 'angular-oauth2-oidc';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { EntityResponse } from '../models/entityResponse';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private baseUri = environment.urlBase;
    //   private headers: Headers;

    constructor(private http: HttpClient) {
        // if we had authorization token

        // this.headers = new Headers({
        //   'Authorization': 'Bearer ' + this.oAuthService.getAccessToken(),
        // });
    }

    // retrieve data from online API
    public getHomeData(): Observable<EntityResponse<User>> {
        return this.http.get(
            this.baseUri + 'users'
        ).pipe(map(
            (res: EntityResponse<User>) => {
                return res;
            }
        ));
    }

    // create 'virtual' user on online API
    public createUser(user: User): Observable<User> {
        return this.http.post(
            this.baseUri + 'users',
            user
        ).pipe(map(
            (res: User) => {
                return res;
            }
        ));
    }

    // edit 'virtually' one user on online API
    public editUser(user: User): Observable<User> {
        return this.http.put(
            this.baseUri + 'users/' + user.id,
            user
        ).pipe(map(
            (res: User) => {
                return res;
            }
        ));
    }

    // delete 'virtually' one user on online API
    public deleteUser(user: User): Observable<any> {
        return this.http.delete(
            this.baseUri + 'users/' + user.id
        ).pipe(map(
            (res: any) => {
                return res;
            }
        ));
    }
}
