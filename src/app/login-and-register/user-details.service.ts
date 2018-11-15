import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
	
	 private apiUrl ='http://localhost:3000/api/register';


  constructor(private http: Http) { }

  // post("/api/register")
    createUser(newUser: User): Promise<void | User> {
    	console.log(newUser.email);
      return this.http.post(this.apiUrl, newUser)
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
    }

      private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
