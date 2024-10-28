import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
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

  add(): void {
    console.log("######## ADD");
  }

}