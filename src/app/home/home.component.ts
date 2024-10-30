import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'home',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  welcomeMsg = "Welcome";
  title = "Windfire UI Angular";
  mainFunctionsLabel = "Main Functions";
  restaurantsLabel = "Restaurants";
  sensorsLabel = "Sensors";

  ngOnInit() {
  }

}