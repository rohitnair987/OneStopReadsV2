import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private apiUrl = 'http://localhost:3000/api/register';


  constructor(private http: Http) { }

  createUser(newUser: User): Promise<void | User> {
    console.log(newUser.email);
    return this.http.post(this.apiUrl, newUser)
                .toPromise()
                .then(response => response.json() as User)
                .catch(this.handleError);
  }

  login(email, password): Promise<void | User> {
    return this.http.post('http://localhost:3000/api/login', {
      email: email,
      password: password
  })
                .toPromise()
                .then(function(response) {
                  console.log('count ' + response);
                })
                .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
