import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email;
  private password;

  constructor(private userDetailsService: UserDetailsService) { }

  Login() {
    console.log('');
    const data = JSON.stringify({
      email: this.email,
      password : this.password
    });
    this.userDetailsService.login(this.email, this.password);
  }

  ngOnInit() {
  }

}
