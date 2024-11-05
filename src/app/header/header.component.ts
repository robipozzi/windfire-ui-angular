import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ErrorService } from '../error/services/error.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private keycloakService: KeycloakService;
  private errorService: ErrorService

  constructor(/*private authService: AuthService,*/ errorService: ErrorService, keycloakService: KeycloakService) {
    this.keycloakService = keycloakService;
    this.errorService = errorService;
  }

  ngOnInit() {
    /*this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });*/
  }

  /*logout() {
    console.log("LOGOUT !!!")
    this.errorService.clear();
    //this.authService.logout();
  }*/

  public logout(): void {
    this.isAuthenticated = this.keycloakService.isLoggedIn();
    console.log("Is logged in? " + this.isAuthenticated);
    console.log("LOGOUT !!!");
    this.keycloakService.logout();
    this.isAuthenticated = this.keycloakService.isLoggedIn();
    console.log("Is logged in? " + this.isAuthenticated);
  }

  public isLoggedIn(): void {
    //this.statusPanel = 'Is Logged In: ' + this.keycloakService.isLoggedIn();
    console.log("LOGGED IN !!!");
  }

}