import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sensors',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
  title = "Windfire Sensors";
  
  constructor() {}

  ngOnInit() {}

}