import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { ErrorComponent } from '../error/error.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'login',
  imports: [RouterOutlet, FormsModule, HeaderComponent, ErrorComponent, HomeComponent, FooterComponent],
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

  constructor(private authService: AuthService) {}

  login() {
    console.log("LOGIN !!!");
    this.clean();
    this.authService.login()
  }

  logout() {
    console.log("LOGOUT !!!")
    this.clean();
    this.authService.logout()
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