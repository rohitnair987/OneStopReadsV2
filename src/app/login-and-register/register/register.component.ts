import { Component, OnInit, Input } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserDetailsService } from '../user-details.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
private email;
private psw;
private user;

  constructor(private userDetailsService: UserDetailsService) {
    this.user = new User();
  }

  createUser(user: User) {
    user = new User();
    console.log('here');
    console.log('this' + this.email);
    user.email  = this.email;
    user.psw  = this.psw;
    console.log('this user' + user.email);
    this.userDetailsService.createUser(user);
  }

  ngOnInit() {
  }

}
