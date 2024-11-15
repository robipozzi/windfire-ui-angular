import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ErrorService } from '../error/services/error.service';

@Component({
  selector: 'sensors',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './sensors.component.html'
})

export class SensorsComponent implements OnInit {
  title = "Windfire Sensors";
  
  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.clear();
  }

}