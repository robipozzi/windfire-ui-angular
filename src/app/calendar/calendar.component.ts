import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ErrorService } from '../error/services/error.service';

@Component({
  selector: 'calendar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './calendar.component.html'
})

export class CalendarComponent implements OnInit {
  title = "Windfire Calendar Events";

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.clear();
  }

}