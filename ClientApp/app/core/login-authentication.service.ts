import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class LoginAuthenticationService {

    constructor(private http: Http) { }

    agentLogin(username: string, password: string) {
        return this.http.post('/dotnet/api/...', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                let user = response.json();

            })
    }

    adminLogin(username: string, password: string) { }
}