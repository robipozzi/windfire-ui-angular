import { Component, OnInit } from '@angular/core';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  templateUrl: './error.component.html',
})

export class ErrorComponent implements OnInit {

  constructor(public errorService: ErrorService) { }

  ngOnInit() { }

}