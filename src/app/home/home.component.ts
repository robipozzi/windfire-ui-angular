import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../security/services/auth.service';

@Component({
  selector: 'home',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  isLoggedIn = false;
  welcomeMsg = "Welcome";
  title = "Windfire UI Angular";
  mainFunctionsLabel = "Main Functions";
  restaurantsLabel = "Restaurants";
  sensorsLabel = "Sensors";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    /*this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });*/
  }

}