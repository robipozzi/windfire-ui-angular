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
  private isAuthenticated = false;
  private keycloakService: KeycloakService;
  private errorService: ErrorService

  constructor(errorService: ErrorService, keycloakService: KeycloakService) {
    this.keycloakService = keycloakService;
    this.errorService = errorService;
  }

  ngOnInit() { }

  public logout(): void {
    console.log("LOGOUT !!!");
    this.keycloakService.logout();
    this.keycloakService.clearToken();
  }

  public isLoggedIn(): void {
    //this.statusPanel = 'Is Logged In: ' + this.keycloakService.isLoggedIn();
    console.log("LOGGED IN !!!");
  }

}