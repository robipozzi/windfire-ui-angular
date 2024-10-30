import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { AuthService } from './services/auth.service';
import { ErrorService } from '../error/services/error.service';

@Component({
  selector: 'login',
  imports: [FormsModule, HomeComponent],
  standalone: true,
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  title = 'Please Sign in';
  loginLabel = "LOGIN";
  logoutLabel = "LOGOUT";
  usernameLabel = "Username";
  passwordLabel = "Password";
  rememberLabel = "Remember me";
  isLoggedIn = false;
  @Input() username = "";
  @Input() password = "";

  constructor(private authService: AuthService, private errorService: ErrorService) {}

  login() {
    console.log("LOGIN !!!");
    this.errorService.clear();
    if(this.isValid()){
      this.authService.login();
    }
    this.clean();
  }

  logout() {
    console.log("LOGOUT !!!")
    this.errorService.clear();
    this.clean();
    this.authService.logout();
  }

  private isValid() {
    console.log("Username = " + this.username);
    console.log("Password = " + this.password);
    if(this.username == "" && this.password == ""){
      console.log("Username and/or Password are not valid");
      this.errorService.add("Error during login");
      this.errorService.add("Username and/or Password are not valid");
      return false;
    } 
    if(this.username != "" && this.password == ""){
      console.log("Password is not valid");
      this.errorService.add("Error during login");
      this.errorService.add("Password is not valid");
      return false;
    }
    return true;
  }

  private clean() {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

}